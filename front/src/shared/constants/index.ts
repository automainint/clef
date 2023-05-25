export const environments = {
  host: process.env.NEXT_PUBLIC_HOST,
};

export const routes = {
  mint: '/mint',
  mintSongs: '/mint/songs',
  mintElements: '/mint/elements',
  compose: '/compose',
  mix: '/mix',
  release: '/release',
  song: '/song',
  chart: '/chart',
} as const;

export const mobileMaxWidthBP = 599;
export const mobilePaddings = 40;

export const currency = {
  usdt: 'USDT',
  waves: 'WAVES',
  fmt: 'FMT',
};
