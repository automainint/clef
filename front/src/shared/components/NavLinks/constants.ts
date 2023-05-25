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
  {
    label: 'Chart',
    href: routes.chart,
  },
] as const;

export { links };
