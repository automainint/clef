import { AirdropInfo, ClaimingStatus } from 'shared/types';

export const defineClaimingStatus = (info: AirdropInfo): ClaimingStatus => {
  if (!info.airdrop_exists) return 'NO_AIRDROP';
  if (!info.user_in_whitelist) return 'NOT_IN_WHITELIST';
  if (!info.allowed_claims || info.allowed_claims < 0) return 'CANT_CLAIM';
  if (!info.songs_total || info.songs_total < 0) return 'NO_SONGS';
  return 'CAN_CLAIM';
};
