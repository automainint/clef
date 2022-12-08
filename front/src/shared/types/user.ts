import { MintResource, Resource, ResourceType, Song } from './resource';
import { AirdropInfo } from './airdrop';

export type ResourcesOptions = {
  filter?: ResourceType;
  size?: number;
  after?: string;
};

export type Resources = Resource[];

export type MintResources = MintResource[];

export type Hybrid = [Song, Song];

export type User = Partial<{
  id: string;
  mint_resources: (resources: MintResources) => Promise<void>;
  add_balance: (balance: number) => Promise<void>;
  get_balance: () => Promise<number>;
  get_free_mix_balance: () => Promise<number>;
  buy: (type: ResourceType) => Promise<void>;
  get_resources: (options?: ResourcesOptions) => Promise<Resources>;
  mint_song: (resources: Resources) => Promise<string>;
  mint_hybrid: (songs: Hybrid) => Promise<string>;
  mint_hybrid_and_burn: (songs: Hybrid) => Promise<string>;
  mint_hybrid_with_free_mix_token: (songs: Hybrid) => Promise<string>;
  get_wallet_address: () => Promise<string>;
  get_explorer_url: () => Promise<string>;
  can_mint_hybrid: () => Promise<boolean>;
  get_price: (type: ResourceType) => Promise<number>;
  logout: () => Promise<void>;
  get_airdrop_info: (name: string) => Promise<AirdropInfo>;
  airdrop_claim: (name: string) => Promise<string[]>;
}>;
