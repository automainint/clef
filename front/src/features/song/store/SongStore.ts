import { action, makeObservable, observable, runInAction } from 'mobx';
import * as Tone from 'tone';

import { Api } from 'api';
import { isSong, Song, Turntable } from 'shared/types';
import { getSongID, playSong, renderSong, setVolume, stop, writeWAV } from 'shared/utils';

class SongStore {
  private api = new Api();

  currentSong: Song | null = null;

  rarity: number = 0;

  turntable: Turntable = [];

  volume: number = 1.0;

  discImage: string = '';

  songWAV: string = '';

  constructor() {
    makeObservable(this, {
      currentSong: observable,
      rarity: observable,
      turntable: observable,
      volume: observable,
      discImage: observable,
      songWAV: observable,
      fetchSong: action.bound,
      fetchSongRarity: action.bound,
      renderWAV: action.bound,
      saveSong: action.bound,
      playSong: action.bound,
      stopSong: action.bound,
      setVolume: action.bound,
      saveDiscImage: action.bound,
    });
  }

  fetchSong = async (assetID: string) => {
    try {
      const data = await this.api.resourcesApi.fetchResourceByAssetID(assetID);
      runInAction(() => {
        if (data === null || isSong(data)) this.currentSong = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  fetchSongRarity = async (assetID: string) => {
    try {
      const data = await this.api.resourcesApi.fetchSongRarityByAssetID(assetID);
      runInAction(() => {
        this.rarity = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  renderWAV = async (song: Song) => {
    const outBytes: number[] = [];
    const buffer = await renderSong(Tone, song);
    writeWAV(buffer, (data: number[]) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const byte of data) outBytes.push(byte);
    });
    const array = new Uint8Array(outBytes);
    const blob = new Blob([array], { type: 'audio/wav' });
    this.songWAV = URL.createObjectURL(blob);
  };

  saveSong(song: Song) {
    this.currentSong = song;
  }

  playSong(song: Song) {
    setVolume(this.volume);
    this.turntable = [...this.turntable, { song, status: 'RENDERING' }];
    playSong(Tone, JSON.parse(JSON.stringify(song)), () => {
      runInAction(() => {
        this.turntable = [
          ...this.turntable.filter((item) => getSongID(item.song) !== getSongID(song)),
          { song, status: 'PLAYING' },
        ];
      });
    }).then(() => {
      runInAction(() => {
        this.turntable = this.turntable.filter((item) => getSongID(item.song) !== getSongID(song));
      });
    });
  }

  stopSong(song: Song) {
    stop(Tone);
    this.turntable = this.turntable.filter((item) => getSongID(item.song) !== getSongID(song));
  }

  setVolume(value: number) {
    setVolume(value);
    this.volume = value;
  }

  saveDiscImage(discImage: string) {
    this.discImage = discImage;
  }
}

export { SongStore };
