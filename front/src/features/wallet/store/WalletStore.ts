import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

import { Api } from 'api';
import { Currency, isProvider, User } from 'shared/types';
import { env } from 'shared/utils';

import { providerCookie } from '../constants';

class WalletStore {
  private api = new Api();

  user: User | null = null;

  address: string = '';

  explorerURL: string = '';

  balance: Currency | null = null;

  freeMixBalance: Currency | null = null;

  selectedAssetsPocket: 'songs' | 'elements' = 'songs';

  constructor() {
    makeObservable(this, {
      user: observable,
      address: observable,
      explorerURL: observable,
      balance: observable,
      freeMixBalance: observable,
      selectedAssetsPocket: observable,
      provider: computed,
      keeperAuth: action.bound,
      cloudAuth: action.bound,
      webAuth: action.bound,
      disconnect: action.bound,
      getAddress: action.bound,
      getExplorerURL: action.bound,
      getBalance: action.bound,
      getFreeMixBalance: action.bound,
      setAssetsPocket: action.bound,
    });
  }

  get provider() {
    if (typeof window === 'undefined') return null;
    const provider = getCookie(providerCookie.key);
    return isProvider(provider) ? provider : null;
  }

  keeperAuth = async () => {
    try {
      const data = await this.api.authApi.fetchUser({ env: env.keeper });
      setCookie(providerCookie.key, env.keeper.provider, { expires: providerCookie.expiryDays });
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
      setCookie(providerCookie.key, env.cloud.provider, { expires: providerCookie.expiryDays });
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
      setCookie(providerCookie.key, env.web.provider, { expires: providerCookie.expiryDays });
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
      removeCookie(providerCookie.key);
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

  getFreeMixBalance = async (user: User) => {
    try {
      const data = await this.api.userApi.fetchFreeMixBalance(user);
      runInAction(() => {
        this.freeMixBalance = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  setAssetsPocket(assetsPocket: 'songs' | 'elements') {
    this.selectedAssetsPocket = assetsPocket;
  }
}

export { WalletStore };
