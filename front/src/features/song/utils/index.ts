export { getInstruments } from './getInstruments';

export const getTimeFormat = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const time = date.toISOString().substring(14, 19);
  return time[0] === '0' ? time.substring(1) : time;
};

export const getScaleFormat = (meter: number[]) => `${meter[0]}/${meter[1]}`;
