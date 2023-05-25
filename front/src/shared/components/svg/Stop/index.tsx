import { FC } from 'react';

import { Theme } from 'shared/types';

type Props = {
  theme?: Theme;
};

const Stop: FC<Props> = ({ theme = 'light' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11px"
    height="11px"
    viewBox="0 0 277.33 277.33"
    fill={theme === 'dark' ? '#E1E1E1' : '#424242'}
  >
    <path
      d="M231.677,0H45.665C20.45,0,0,20.442,0,45.657v186.021c0,25.207,20.45,45.652,45.665,45.652h186.012
		c25.223,0,45.653-20.445,45.653-45.652V45.657C277.338,20.434,256.899,0,231.677,0z"
    />
  </svg>
);

export { Stop };
