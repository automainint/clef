import { FC } from 'react';

type Props = {
  size?: 'small' | 'normal';
};

const Cross: FC<Props> = ({ size = 'normal' }) => (
  <>
    {size === 'small' ? (
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 10L10 1" stroke="#C2C2C2" strokeWidth="1.5" />
        <path d="M10 10L1 1" stroke="#C2C2C2" strokeWidth="1.5" />
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L13 13" stroke="#ACACAC" strokeWidth="2" />
        <path d="M13 1L1 13" stroke="#ACACAC" strokeWidth="2" />
      </svg>
    )}
  </>
);

export { Cross };
