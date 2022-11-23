import { types } from 'shared/utils';

import { Song } from './resource';
import { Songs } from './mix';
import { Hybrid, MintResources, Resources } from './user';

export function isSong(data: unknown): data is Song {
  const { id, type, label } = data as Song;
  return id !== undefined && label !== undefined && type === types.song;
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
