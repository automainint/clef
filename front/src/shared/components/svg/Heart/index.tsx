/* eslint-disable max-len */
import { FC } from 'react';

type Props = {
  weight?: 'thin' | 'bold';
};

const Heart: FC<Props> = ({ weight = 'thin' }) => (
  <>
    {weight === 'bold' ? (
      <svg width="100%" height="100%" viewBox="0 0 17 17" fill="inherit" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.5584 14.875C14.2753 12.374 16.4992 6.60501 13.9817 4.10405C11.4639 1.60305 8.57938 5.01315 8.57938 5.01315C8.57938 5.01315 5.67366 1.60305 3.15612 4.10405C0.638628 6.60472 2.84151 12.374 8.5584 14.875Z"
          stroke="currentColor"
          strokeWidth="2.75675"
        />
      </svg>
    ) : (
      <svg width="100%" height="100%" viewBox="0 0 16 16" fill="inherit" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.05496 14C13.4356 11.6461 15.5286 6.21648 13.1592 3.86263C10.7896 1.50876 8.07471 4.71826 8.07471 4.71826C8.07471 4.71826 5.33991 1.50876 2.97045 3.86263C0.601054 6.21621 2.67436 11.6462 8.05496 14Z"
          stroke="#424242"
          strokeWidth="1.83783"
        />
      </svg>
    )}
  </>
);

export { Heart };
