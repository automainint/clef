import { FC } from 'react';

type Props = {
  color?: string;
};

const Vibe: FC<Props> = ({ color = 'white' }) => (
  <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32.8846" cy="35.0604" rx="11.2418" ry="3.98901" fill={color} />
    <ellipse cx="32.8846" cy="35.0604" rx="11.2418" ry="3.98901" fill={color} />
    <ellipse cx="13.3928" cy="26.3571" rx="8.25" ry="2.35714" fill={color} />
    <ellipse cx="13.3928" cy="26.3571" rx="8.25" ry="2.35714" fill={color} />
    <path d="M13.3928 26.3574C13.3928 1.6074 33.4285 2.78571 33.4285 35.7859" stroke={color} strokeWidth="2.35714" />
  </svg>
);

export { Vibe };
