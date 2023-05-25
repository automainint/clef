import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import * as Tone from 'tone';

import { Api } from 'api';
import {
  isSong,
  Status,
  Turntable,
  TurntableItem,
  TurntableItemType,
  TurntableSlot,
  ValueWithStatus,
} from 'shared/types';
import { play, playSong, radioPlay, radioSetCrossfade, radioSkip, radioStop, setVolume, stop } from 'shared/utils';

import { getID } from '../utils';

class TurntableStore {
  private api = new Api();

  turntable: Turntable = [];

  currentPlayingID: string = '';

  radioSkipStatus: Status = 'IDLE';

  radioCrossFade: ValueWithStatus<boolean> = { value: true, status: 'IDLE' };

  volume: ValueWithStatus<number> = { value: 1.0, status: 'IDLE' };

  constructor() {
    makeObservable(this, {
      turntable: observable.deep,
      currentPlayingID: observable,
      radioSkipStatus: observable,
      radioCrossFade: observable,
      volume: observable,
      setVolume: action.bound,
      updateTurntableSlot: action.bound,
      removeTurntableSlot: action.bound,
      play: action.bound,
      stop: action.bound,
      next: action.bound,
      toggleRadioCrossFade: action.bound,
    });
  }

  setVolume = async (value: number) => {
    runInAction(() => {
      this.volume = { value, status: 'PENDING' };
    });
    await setVolume(value);
    runInAction(() => {
      this.volume = { ...this.volume, status: 'IDLE' };
    });
  };

  updateTurntableSlot(slot: TurntableSlot) {
    const { item, status } = slot;
    const { type, data } = item;
    let index: number | null;
    switch (type) {
      case 'radio': {
        index = this.turntable.findIndex(({ item: _item }) => _item.type === type);
        if (status === 'PLAYING' && data) this.currentPlayingID = getID(data.song);
        break;
      }
      case 'resource': {
        index = this.turntable.findIndex(
          ({ item: _item }) => _item.type === 'resource' && getID(_item.data) === getID(data)
        );
        if (status === 'PLAYING') this.currentPlayingID = getID(data);
        break;
      }
      default:
        index = null;
    }
    if (index === null) return;
    if (index === -1) this.turntable.push(slot);
    else this.turntable[index] = slot;
    this.turntable = [...this.turntable];
  }

  removeTurntableSlot(item: TurntableItem) {
    const { type, data } = item;
    switch (type) {
      case 'radio': {
        if (data && getID(data.song) === this.currentPlayingID) this.currentPlayingID = '';
        this.turntable = this.turntable.filter(({ item: _item }) => _item.type !== type);
        break;
      }
      case 'resource': {
        if (getID(data) === this.currentPlayingID) this.currentPlayingID = '';
        this.turntable = [
          ...this.turntable.filter(({ item: _item }) => _item.type !== 'resource' || getID(_item.data) !== getID(data)),
        ];
        break;
      }
      default:
    }
  }

  play = async (item: TurntableItem) => {
    const { type, data } = item;
    this.updateTurntableSlot({ item, status: 'RENDERING' });
    await this.preventDiffTypesPlayCollision(type);
    await this.setVolume(this.volume.value);
    switch (type) {
      case 'radio': {
        await radioPlay(Tone, async (name: string, assetID: string) => {
          const song = await this.api.resourcesApi.fetchResourceByAssetID(assetID);
          runInAction(() => {
            if (!isSong(song)) return;
            this.currentPlayingID = getID(song);
            this.updateTurntableSlot({ item: { ...item, data: { song, name } }, status: 'PLAYING' });
          });
        });
        break;
      }
      case 'resource': {
        if (isSong(data)) {
          await playSong(Tone, toJS(item.data), () => this.updateTurntableSlot({ item, status: 'PLAYING' }));
        } else {
          await play(Tone, toJS(item.data), () => this.updateTurntableSlot({ item, status: 'PLAYING' }));
        }
        this.removeTurntableSlot(item);
        break;
      }
      default:
    }
  };

  stop = async (item: TurntableItem) => {
    const { type } = item;
    switch (type) {
      case 'radio': {
        this.updateTurntableSlot({ item, status: 'STOPPING' });
        try {
          await radioStop();
        } finally {
          this.removeTurntableSlot(item);
        }
        break;
      }
      case 'resource': {
        await stop(Tone);
        this.removeTurntableSlot(item);
        break;
      }
      default:
    }
  };

  next = async (item: TurntableItem) => {
    const { type } = item;
    switch (type) {
      case 'radio': {
        runInAction(() => {
          this.radioSkipStatus = 'PENDING';
        });
        try {
          await radioSkip();
        } finally {
          runInAction(() => {
            this.radioSkipStatus = 'IDLE';
          });
        }
        break;
      }
      default:
    }
  };

  toggleRadioCrossFade = async () => {
    runInAction(() => {
      this.radioCrossFade = { ...this.radioCrossFade, status: 'PENDING' };
    });
    await radioSetCrossfade(!this.radioCrossFade.value);
    runInAction(() => {
      this.radioCrossFade = { value: !this.radioCrossFade.value, status: 'IDLE' };
    });
  };

  private preventDiffTypesPlayCollision = async (type: TurntableItemType) => {
    const activeSlots = this.turntable.filter(
      ({ item, status }) => item.type !== type && (status === 'RENDERING' || status === 'PLAYING')
    );
    if (!activeSlots || activeSlots.length === 0) return;
    await Promise.all(
      activeSlots.map(async (slot) => {
        await this.stop(slot.item);
      })
    );
  };
}

export { TurntableStore };
