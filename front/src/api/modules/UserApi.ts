import { Hybrid, Resources, MintResources, ResourcesOptions, ResourceType, User, AirdropInfo } from 'shared/types';

class UserApi {
  async fetchBalance(user: User): Promise<number> {
    const response = await user.get_balance?.();

    if (response !== undefined) {
      return response;
    }
    const error = 'get_balance not responding';
    throw new Error(error);
  }

  async fetchFreeMixBalance(user: User): Promise<number> {
    const response = await user.get_free_mix_balance?.();

    if (response !== undefined) {
      return response;
    }
    const error = 'get_free_mix_balance not responding';
    throw new Error(error);
  }

  async fetchWalletAddress(user: User): Promise<string> {
    const response = await user.get_wallet_address?.();

    if (response !== undefined) {
      return response;
    }
    const error = 'get_wallet_address not responding';
    throw new Error(error);
  }

  async fetchExplorerURL(user: User): Promise<string> {
    const response = await user.get_explorer_url?.();

    if (response !== undefined) {
      return response;
    }
    const error = 'get_explorer_url not responding';
    throw new Error(error);
  }

  async fetchResources(user: User, options: ResourcesOptions): Promise<Resources> {
    const response = await user.get_resources?.(options);

    if (response !== undefined) {
      return response;
    }
    const error = 'get_resources not responding';
    throw new Error(error);
  }

  async fetchPrice(user: User, type: ResourceType): Promise<number> {
    const response = await user.get_price?.(type);

    if (response !== undefined) {
      return response;
    }
    const error = 'get_price not responding';
    throw new Error(error);
  }

  async fetchAirdropInfo(user: User, name: string): Promise<AirdropInfo> {
    const response = await user.get_airdrop_info?.(name);

    if (response !== undefined) {
      return response;
    }
    const error = 'get_airdrop_info not responding';
    throw new Error(error);
  }

  async canMintHybrid(user: User): Promise<boolean> {
    const response = await user.can_mint_hybrid?.();

    if (response !== undefined) {
      return response;
    }
    const error = 'can_mint_hybrid not responding';
    throw new Error(error);
  }

  async mintSong(user: User, resources: Resources): Promise<string> {
    const response = await user.mint_song?.(resources);

    if (response !== undefined) {
      return response;
    }
    const error = 'mint_song not responding';
    throw new Error(error);
  }

  async mintHybrid(user: User, hybrid: Hybrid): Promise<string> {
    const response = await user.mint_hybrid?.(hybrid);

    if (response !== undefined) {
      return response;
    }
    const error = 'mint_hybrid not responding';
    throw new Error(error);
  }

  async mintHybridAndBurn(user: User, hybrid: Hybrid): Promise<string> {
    const response = await user.mint_hybrid_and_burn?.(hybrid);

    if (response !== undefined) {
      return response;
    }
    const error = 'mint_hybrid_and_burn not responding';
    throw new Error(error);
  }

  async mintHybridWithFreeMixToken(user: User, hybrid: Hybrid): Promise<string> {
    const response = await user.mint_hybrid_with_free_mix_token?.(hybrid);

    if (response !== undefined) {
      return response;
    }
    const error = 'mint_hybrid_with_free_mix_token not responding';
    throw new Error(error);
  }

  async mintResources(user: User, resources: MintResources) {
    await user.mint_resources?.(resources);
  }

  async addBalance(user: User, balance: number) {
    await user.add_balance?.(balance);
  }

  async buy(user: User, type: ResourceType) {
    await user.buy?.(type);
  }

  async logout(user: User) {
    await user.logout?.();
  }

  async airdropClaim(user: User, name: string) {
    await user.airdrop_claim?.(name);
  }
}

export default UserApi;
