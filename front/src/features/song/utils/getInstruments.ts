import { InstrumentNote, Sheet } from 'shared/types';

const getDurations = (notes: InstrumentNote[], totalDuration: number) => {
  const noteDurations = notes.map(({ duration }) => duration / totalDuration);
  const pauseDurations = notes.map(({ time }, index) =>
    index + 1 < notes.length ? (notes[index + 1].time - time) / totalDuration : (totalDuration - time) / totalDuration
  );
  return noteDurations.reduce<number[]>(
    (acc, noteDuration, index) => [...acc, noteDuration, index < pauseDurations.length ? pauseDurations[index] : 0],
    []
  );
};

export const getInstruments = ({ kick, bass, hihat, lead, snare, back, duration, instruments }: Sheet) => [
  {
    label: instruments.bass || 'Bass',
    durations: getDurations(bass, duration),
  },
  {
    label: instruments.kick || 'Kick',
    durations: getDurations(kick, duration),
  },
  {
    label: instruments.lead || 'Lead',
    durations: getDurations(lead, duration),
  },
  {
    label: instruments.hihat || 'Hi-Hat',
    durations: getDurations(hihat, duration),
  },
  {
    label: instruments.back || 'Back',
    durations: getDurations(back, duration),
  },
  {
    label: instruments.snare || 'Snare',
    durations: getDurations(snare, duration),
  },
];
