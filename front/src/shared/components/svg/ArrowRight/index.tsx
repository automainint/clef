import { FC } from 'react';

type Props = {
  isInvert?: boolean;
};

const ArrowRight: FC<Props> = ({ isInvert = false }) => (
  <>
    {isInvert ? (
      <svg width="44" height="29" viewBox="0 0 44 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.988553 14.4829L42.9023 14.4829M42.9023 14.4829L29.1998 0.780273M42.9023 14.4829L29.1998 28.1854"
          stroke="white"
        />
      </svg>
    ) : (
      <svg width="43" height="29" viewBox="0 0 43 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.91464 14.4368L42.0381 14.4368M42.0381 14.4368L28.5939 1.14941M42.0381 14.4368L28.5939 27.7241"
          stroke="#9F9F9F"
          strokeWidth="1.3"
        />
      </svg>
    )}
  </>
);

export { ArrowRight };
