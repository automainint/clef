import { routes } from 'shared/constants';

const links = [
  {
    label: 'Mint',
    href: routes.mint,
  },
  {
    label: 'Compose',
    href: routes.compose,
  },
  {
    label: 'Mix',
    href: routes.mix,
  },
  {
    label: 'Release',
    href: routes.release,
  },
] as const;

export { links };
