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
  type: string;
  asset_id: string;
  id: string;
  label: string;
}>;

export type ElementResource = Omit<Resource, 'type' | 'rhythm'> & {
  type?: string;
  notes?: number[];
  arpeggio?: number[];
  rhythm?: { [Property in keyof Required<Rhythms>]?: Rhythm };
};
