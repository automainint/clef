import { Song } from './resource';

export type Turntable = {
  song: Song;
  status: 'RENDERING' | 'PLAYING';
}[];
