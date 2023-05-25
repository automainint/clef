import { FC } from 'react';

import { Theme } from 'shared/types';

type Props = {
  theme?: Theme;
};

const CircleCheck: FC<Props> = ({ theme = 'light' }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill={theme === 'dark' ? 'white' : 'black'} />
    <path d="M8 14.2L13.25 19L21.5 11" stroke={theme === 'dark' ? '#333' : 'white'} strokeWidth="3" />
  </svg>
);

export { CircleCheck };
