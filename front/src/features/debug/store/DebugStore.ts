import { action, makeObservable } from 'mobx';

import { Api } from 'api';
import { isMintResources, isResourcesForMint, User } from 'shared/types';
import { newResources } from 'shared/utils';

class DebugStore {
  private api = new Api();

  constructor() {
    makeObservable(this, {
      generateSong: action.bound,
      addBalance: action.bound,
    });
  }

  generateSong = async (user: User) => {
    try {
      const mintResources = newResources();
      if (!isMintResources(mintResources)) return;
      await this.api.userApi.mintResources(user, mintResources);
      await this.api.userApi.addBalance(user, 40);
      await this.api.userApi.buy(user, 'chord');
      await this.api.userApi.buy(user, 'chord');
      await this.api.userApi.buy(user, 'beat');
      await this.api.userApi.buy(user, 'rhythm');
      const chords = await this.api.userApi.fetchResources(user, { filter: 'chord', size: 2 });
      const beat = await this.api.userApi.fetchResources(user, { filter: 'beat', size: 1 });
      const rhythm = await this.api.userApi.fetchResources(user, { filter: 'rhythm', size: 1 });
      const resources = [...chords, ...beat, ...rhythm];
      if (!isResourcesForMint(resources)) return;
      await this.api.userApi.mintSong(user, resources);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  addBalance = async (user: User) => {
    try {
      await this.api.userApi.addBalance(user, 90);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };
}

export { DebugStore };
