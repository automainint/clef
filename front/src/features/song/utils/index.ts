export { getInstruments } from './getInstruments';

export const getTimeFormat = (seconds: number) => {
  const time = new Date(seconds * 1000).toLocaleTimeString('ru', {
    hour: undefined,
    minute: 'numeric',
    second: '2-digit',
  });
  return time[0] === '0' ? time.substring(1) : time;
};

export const getScaleFormat = (meter: number[]) => `${meter[0]}/${meter[1]}`;
