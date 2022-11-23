import { action, makeObservable, observable, runInAction } from 'mobx';

import { Api } from 'api';
import { AirdropInfo, ClaimingStatus, User } from 'shared/types';

import { defineClaimingStatus } from '../utils';

class ClaimAirdropStore {
  private api = new Api();

  airdropInfo: AirdropInfo | null = null;

  claimingStatus: ClaimingStatus = 'NO_AIRDROP';

  constructor() {
    makeObservable(this, {
      airdropInfo: observable,
      claimingStatus: observable,
      fetchAirdropInfo: action.bound,
      airdropClaim: action.bound,
    });
  }

  fetchAirdropInfo = async (user: User, name: string) => {
    try {
      const data = await this.api.userApi.fetchAirdropInfo(user, name);
      runInAction(() => {
        this.airdropInfo = data;
        this.claimingStatus = defineClaimingStatus(data);
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  airdropClaim = async (user: User, name: string) => {
    try {
      await this.api.userApi.airdropClaim(user, name);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };
}

export { ClaimAirdropStore };
