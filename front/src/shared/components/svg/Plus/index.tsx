import { FC } from 'react';

type Props = {
  isInvert?: boolean;
};

const Plus: FC<Props> = ({ isInvert = false }) => (
  <>
    {isInvert ? (
      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.4268 34.8128V0.15332" stroke="white" />
        <path d="M0.0973548 17.4834L34.7568 17.4834" stroke="white" />
      </svg>
    ) : (
      <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.1582 33.6317V0.0224609" stroke="#9F9F9F" strokeWidth="1.3" />
        <path d="M0.155201 16.8271L34.1611 16.8271" stroke="#9F9F9F" strokeWidth="1.3" />
      </svg>
    )}
  </>
);

export { Plus };
