import { FC } from 'react';

type Props = {
  color?: string;
};

const Chord: FC<Props> = ({ color = 'white' }) => (
  <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_170_932)">
      <ellipse
        cx="16.8795"
        cy="26.6601"
        rx="10.1433"
        ry="6.58478"
        transform="rotate(-121.416 16.8795 26.6601)"
        fill={color}
      />
      <ellipse
        cx="16.8795"
        cy="26.6601"
        rx="10.1433"
        ry="6.58478"
        transform="rotate(-121.416 16.8795 26.6601)"
        fill={color}
      />
      <g filter="url(#filter0_d_170_932)">
        <ellipse
          cx="24.3696"
          cy="21.4556"
          rx="13.6594"
          ry="6.31936"
          transform="rotate(-149.957 24.3696 21.4556)"
          fill={color}
        />
        <ellipse
          cx="24.3696"
          cy="21.4556"
          rx="13.6594"
          ry="6.31936"
          transform="rotate(-149.957 24.3696 21.4556)"
          fill={color}
        />
      </g>
      <g filter="url(#filter1_d_170_932)">
        <ellipse
          cx="27.1529"
          cy="12.636"
          rx="14.201"
          ry="4.4244"
          transform="rotate(4.01648 27.1529 12.636)"
          fill={color}
        />
        <ellipse
          cx="27.1529"
          cy="12.636"
          rx="14.201"
          ry="4.4244"
          transform="rotate(4.01648 27.1529 12.636)"
          fill={color}
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_170_932"
        x="2.69789"
        y="5.62645"
        width="43.3435"
        height="36.3725"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2.35714" />
        <feGaussianBlur stdDeviation="4.71429" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_170_932" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_170_932" result="shape" />
      </filter>
      <filter
        id="filter1_d_170_932"
        x="3.55458"
        y="-1.31773"
        width="47.1965"
        height="27.9076"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="4.71429" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_170_932" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_170_932" result="shape" />
      </filter>
      <clipPath id="clip0_170_932">
        <rect width="47.1429" height="47.1429" fill={color} transform="translate(0.428467 0.428589)" />
      </clipPath>
    </defs>
  </svg>
);

export { Chord };
