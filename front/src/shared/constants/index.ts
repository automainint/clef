export const environments = {
  host: process.env.NEXT_PUBLIC_HOST,
};

export const routes = {
  mint: '/mint',
  compose: '/compose',
  mix: '/mix',
  release: '/release',
  song: '/song',
} as const;
