import { Currency } from './currency';
import { InstrumentLine } from './music';
import { Resource } from './resource';

export type Song = Required<Resource>;

export type SongType = 'mix' | 'genesis' | 'cover';

export type MintableSongWithInfo = {
  song: Song;
  type: SongType;
  price: Currency;
  quantity: number;
};

export type SongWithType = {
  song: Song;
  type: SongType;
};

export type SongWithLikes = {
  song: Song;
  likes: number;
};

export type ChartListItem = {
  asset_id: string;
  likes: number;
};

export type ChartList = ChartListItem[];

export type OrderedChartList = (ChartListItem & { order: number })[];

export type OrderedSongWithLikes = SongWithLikes & { order: number };

export type SongPassport = Omit<Song, 'type'> & {
  tonality: string;
  songBPM: string;
  time: string;
  scale: string;
  generation: string;
  url: string;
  chordNames: string[];
  chords: number[][];
  instruments: InstrumentLine[];
};
