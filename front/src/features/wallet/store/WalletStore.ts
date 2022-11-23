import { action, makeObservable, observable, runInAction } from 'mobx';

import { Api } from 'api';
import { User } from 'shared/types';
import { env } from 'shared/utils';

class WalletStore {
  private api = new Api();

  user: User | null = null;

  address: string = '';

  explorerURL: string = '';

  balance: number = 0;

  constructor() {
    makeObservable(this, {
      user: observable,
      address: observable,
      explorerURL: observable,
      balance: observable,
      keeperAuth: action.bound,
      cloudAuth: action.bound,
      webAuth: action.bound,
      disconnect: action.bound,
      getAddress: action.bound,
      getExplorerURL: action.bound,
      getBalance: action.bound,
    });
  }

  keeperAuth = async () => {
    try {
      const data = await this.api.authApi.fetchUser({ env: env.keeper });
      runInAction(() => {
        this.user = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  cloudAuth = async () => {
    try {
      const data = await this.api.authApi.fetchUser({ env: env.cloud });
      runInAction(() => {
        this.user = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  webAuth = async () => {
    try {
      const data = await this.api.authApi.fetchUser({ env: env.web });
      runInAction(() => {
        this.user = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  disconnect = async (user: User) => {
    try {
      await this.api.userApi.logout(user);
      runInAction(() => {
        this.user = null;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getAddress = async (user: User) => {
    try {
      const data = await this.api.userApi.fetchWalletAddress(user);
      runInAction(() => {
        this.address = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getExplorerURL = async (user: User) => {
    try {
      const data = await this.api.userApi.fetchExplorerURL(user);
      runInAction(() => {
        this.explorerURL = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getBalance = async (user: User) => {
    try {
      const data = await this.api.userApi.fetchBalance(user);
      runInAction(() => {
        this.balance = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };
}

export { WalletStore };
