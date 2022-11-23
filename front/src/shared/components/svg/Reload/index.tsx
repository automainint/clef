/* eslint-disable max-len */
import { FC } from 'react';

import styles from './reload.module.scss';

type Props = {
  rotate?: boolean;
};

const Reload: FC<Props> = ({ rotate = false }) => (
  <svg
    className={rotate ? styles.rotate : ''}
    width="32"
    height="26"
    viewBox="0 0 32 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="mask0_2_29" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="3" y="0" width="27" height="26">
      <circle cx="16.2846" cy="12.9999" r="11.5978" stroke="black" strokeWidth="2.80418" />
    </mask>
    <g mask="url(#mask0_2_29)">
      <path
        d="M3.28467 12.9999C3.28467 15.8256 4.20536 18.5744 5.90735 20.83C7.60933 23.0856 9.99992 24.7253 12.7172 25.5007C15.4344 26.2761 18.3303 26.1451 20.9664 25.1274C23.6025 24.1098 25.8352 22.2609 27.3265 19.8608L16.2846 12.9999L3.28467 12.9999Z"
        fill="white"
      />
    </g>
    <path d="M8.50815 15.116L4.19093 12.4849L1.55988 16.8021" stroke="white" strokeWidth="1.56207" />
    <mask id="mask1_2_29" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="3" y="0" width="27" height="26">
      <circle
        cx="16.2862"
        cy="13.0001"
        r="11.5978"
        transform="rotate(-180 16.2862 13.0001)"
        stroke="black"
        strokeWidth="2.80418"
      />
    </mask>
    <g mask="url(#mask1_2_29)">
      <path
        d="M29.2861 13.0001C29.2861 10.0862 28.3071 7.25681 26.5063 4.966C24.7054 2.67518 22.1872 1.05582 19.3557 0.367799C16.5242 -0.320222 13.5436 -0.0369982 10.8924 1.17201C8.24112 2.38103 6.07294 4.44572 4.73581 7.03471L16.2862 13.0001L29.2861 13.0001Z"
        fill="white"
      />
    </g>
    <path d="M24.1583 11.1951L28.2933 14.1042L31.2024 9.96918" stroke="white" strokeWidth="1.56207" />
  </svg>
);

export { Reload };
