import { types } from 'shared/utils';

export type ResourceType = keyof typeof types;

export type MintResource = {
  quantity: number;
  type?: ResourceType;
  label?: string;
  notes?: number[];
  kick?: number[];
  snare?: number[];
  hihat?: number[];
};

export type Instruments = Partial<{
  kick: string;
  snare: string;
  hihat: string;
  bass: string;
  back: string;
  lead: string;
}>;

export type Chord = Partial<{
  label: string;
  notes: number[];
}>;

export type Rhythm = Partial<{
  label: string;
  notes: number[];
}>;

export type Rhythms = Partial<{
  kick: Rhythm[];
  snare: Rhythm[];
  hihat: Rhythm[];
  bass: Rhythm[];
  back: Rhythm[];
  lead: Rhythm[];
}>;

export type Resource = Partial<{
  id: string;
  type: ResourceType;
  label: string;
  parents: unknown[];
  bpm: number;
  bar_size: number;
  beat_size: number;
  tonality: number;
  instruments: Instruments;
  chords: Chord[];
  melody: number[];
  rhythms: Rhythms;
  rhythm: Rhythms;
}>;

export type Song = Required<Resource>;
