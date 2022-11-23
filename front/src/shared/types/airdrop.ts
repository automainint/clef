export type AirdropInfo = Partial<{
  airdrop_exists: boolean;
  user_in_whitelist: boolean;
  allowed_claims: number;
  songs_total: number;
}>;

export type ClaimingStatus = 'NO_AIRDROP' | 'NOT_IN_WHITELIST' | 'NO_SONGS' | 'CAN_CLAIM' | 'CANT_CLAIM';
