/* eslint-disable max-len */
import { FC } from 'react';

import { Theme } from 'shared/types';

type Props = {
  theme?: Theme;
};

const Play: FC<Props> = ({ theme = 'light' }) => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.86049 4.26445C10.8131 4.81445 10.8131 6.18945 9.86049 6.73945L2.89439 10.7613C1.94176 11.3113 0.750976 10.6238 0.750976 9.52383L0.750976 1.48007C0.750976 0.38007 1.94176 -0.307429 2.89439 0.242572L9.86049 4.26445Z"
      fill={theme === 'dark' ? '#E1E1E1' : '#424242'}
    />
  </svg>
);

export { Play };
