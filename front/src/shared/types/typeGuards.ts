import { types } from 'shared/utils';

import { Song, SongType } from './song';
import { Songs } from './mix';
import { Hybrid, MintResources, Resources } from './user';
import { ElementType } from './element';
import { Currency } from './currency';
import { Provider } from './auth';

export function isSong(data: unknown): data is Song {
  const { type, asset_id: assetId, id, label } = data as Song;
  return type === types.song && assetId !== undefined && id !== undefined && label !== undefined;
}

export function isSongs(data: unknown): data is Songs {
  const songs = data as Songs;
  return songs.every((song) => isSong(song));
}

export function isHybrid(data: unknown): data is Hybrid {
  const hybrid = data as Hybrid;
  return hybrid[0] !== null && hybrid[1] !== null;
}

export function isMintResources(data: unknown): data is MintResources {
  const resources = data as MintResources;
  return resources.every(({ quantity }) => quantity !== undefined);
}

export function isResourcesForMint(data: unknown): data is Resources {
  const resources = data as Resources;
  return resources.every(({ id }) => id !== undefined);
}

export function isErrorWithMessage(error: unknown): error is Error {
  return (error as Error).message !== undefined;
}

export function isElementType(type: unknown): type is ElementType {
  return (type as ElementType) === 'chord' || (type as ElementType) === 'beat' || (type as ElementType) === 'vibe';
}

export function isSongType(type: unknown): type is SongType {
  return (type as SongType) === 'cover' || (type as SongType) === 'genesis' || (type as SongType) === 'mix';
}

export function isCurrency(data: unknown): data is Currency {
  const { asset_name: assetName, amount } = data as Currency;
  return assetName !== undefined && typeof assetName === 'string' && amount !== undefined;
}

export function isProvider(data: unknown): data is Provider {
  return (
    typeof data === 'string' &&
    ((data as Provider) === 'keeper' || (data as Provider) === 'cloud' || (data as Provider) === 'web')
  );
}
