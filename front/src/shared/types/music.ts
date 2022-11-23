import { colors } from 'shared/utils';

import { Instruments } from './resource';

enum SongColors {
  Major = colors.major,
  Minor = colors.minor,
  Neutral = colors.neutral,
  Weird = colors.weird,
}
export type SongColor = SongColors;

export type InstrumentLine = {
  label: string;
  durations: number[];
};

export type InstrumentNote = {
  time: number;
  note: number;
  duration: number;
  velocity: number;
};

export type Sheet = {
  duration: number;
  back: InstrumentNote[];
  bass: InstrumentNote[];
  hihat: InstrumentNote[];
  kick: InstrumentNote[];
  lead: InstrumentNote[];
  snare: InstrumentNote[];
  instruments: Instruments;
};
