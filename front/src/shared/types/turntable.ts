import { ElementResource } from './resource';
import { Song } from './song';

export type TurntableItemType = 'radio' | 'resource';

export type SongWithName = { song: Song; name: string };

export type PlayableResource = Song | ElementResource;

export type TurntableRadioItem = {
  type: 'radio';
  data?: SongWithName;
};

export type TurntableResourceItem = {
  type: 'resource';
  data: PlayableResource;
};

export type TurntableItem = TurntableRadioItem | TurntableResourceItem;

export type TurntableSlot = {
  item: TurntableItem;
  status: 'RENDERING' | 'PLAYING' | 'STOPPING';
};

export type Turntable = TurntableSlot[];
