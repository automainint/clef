import { action, makeObservable, observable, runInAction } from 'mobx';

import { Api } from 'api';
import { HybridRaw, isHybrid, isSong, isSongs, Resources, Song, Songs, User } from 'shared/types';
import { getSongID } from 'shared/utils';

class MixStore {
  private api = new Api();

  hybrid: HybridRaw = [null, null];

  newHybrid: Song | null = null;

  songs: Songs = [];

  hybridPrice: number = 0;

  canMintHybrid: boolean = false;

  constructor() {
    makeObservable(this, {
      hybrid: observable,
      newHybrid: observable,
      songs: observable,
      hybridPrice: observable,
      canMintHybrid: observable,
      getSongs: action.bound,
      getNextSongs: action.bound,
      getHybridPrice: action.bound,
      getCanMintHybrid: action.bound,
      mintHybrid: action.bound,
      addToHybrid: action.bound,
      removeFromHybrid: action.bound,
      clearHybrid: action.bound,
    });
  }

  getSongs = async (user: User) => {
    try {
      const data = await this.api.userApi.fetchResources(user, { filter: 'song', size: 10 });
      runInAction(() => {
        if (isSongs(data)) this.songs = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getNextSongs = async (user: User) => {
    try {
      let data: Resources;
      if (this.songs.length === 0) {
        data = await this.api.userApi.fetchResources(user, { filter: 'song', size: 10 });
      } else {
        data = await this.api.userApi.fetchResources(user, {
          filter: 'song',
          size: 10,
          after: getSongID(this.songs[this.songs.length - 1]),
        });
      }
      runInAction(() => {
        if (isSongs(data)) this.songs = [...this.songs, ...data];
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getHybridPrice = async (user: User) => {
    try {
      const data = await this.api.userApi.fetchPrice(user, 'hybrid');
      runInAction(() => {
        this.hybridPrice = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getCanMintHybrid = async (user: User) => {
    try {
      const data = await this.api.userApi.canMintHybrid(user);
      runInAction(() => {
        this.canMintHybrid = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  mintHybrid = async (user: User, isBurn: boolean = false, isMixWithFTM: boolean = false) => {
    try {
      if (!isHybrid(this.hybrid)) return;

      let hybridID = '';
      if (isBurn) {
        hybridID = await this.api.userApi.mintHybridAndBurn(user, this.hybrid);
      } else {
        hybridID = isMixWithFTM
          ? await this.api.userApi.mintHybridWithFreeMixToken(user, this.hybrid)
          : await this.api.userApi.mintHybrid(user, this.hybrid);
      }

      const data = await this.api.resourcesApi.fetchResourceByID(hybridID);
      runInAction(() => {
        if (data !== null && isSong(data)) this.newHybrid = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  addToHybrid(song: Song) {
    if (this.hybrid[0] === null) this.hybrid = [song, this.hybrid[1]];
    else if (this.hybrid[1] === null) this.hybrid = [this.hybrid[0], song];
    else this.hybrid = [this.hybrid[1], song];
  }

  removeFromHybrid(song: Song) {
    const id = getSongID(song);
    this.hybrid = [
      this.hybrid[0] !== null && getSongID(this.hybrid[0]) === id ? null : this.hybrid[0],
      this.hybrid[1] !== null && getSongID(this.hybrid[1]) === id ? null : this.hybrid[1],
    ];
  }

  clearHybrid() {
    this.hybrid = [null, null];
  }
}

export { MixStore };
