/* eslint-disable react/button-has-type */
import { FC, PropsWithChildren, PointerEvent } from 'react';
import NextLink from 'next/link';
import cn from 'classnames';

import styles from './plainButton.module.scss';

type Props = {
  size?: 'big' | 'small';
  theme?: 'borderedLight' | 'borderedDark' | 'filledLight' | 'filledDark' | 'filledDarkGradient';
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isDisabled?: boolean;
  isInvert?: boolean;
  isExternal?: boolean;
  isAlongEdges?: boolean;
  href?: string;
  onClick?: (event: PointerEvent<HTMLButtonElement>) => void;
};

const PlainButton: FC<PropsWithChildren<Props>> = ({
  children,
  size = 'big',
  theme = 'borderedDark',
  type = 'button',
  isLoading = false,
  isDisabled = false,
  isInvert = false,
  isExternal = false,
  isAlongEdges = false,
  href = '',
  onClick,
}) => {
  const className = cn(styles.root, {
    [styles.big]: size === 'big',
    [styles.small]: size === 'small',
    [styles.borderedLight]: theme === 'borderedLight',
    [styles.borderedDark]: theme === 'borderedDark',
    [styles.filledLight]: theme === 'filledLight',
    [styles.filledDark]: theme === 'filledDark',
    [styles.filledDarkGradient]: theme === 'filledDarkGradient',
    [styles.loading]: isLoading,
    [styles.invert]: isInvert,
    [styles.alongEdges]: isAlongEdges,
  });

  return (
    <>
      {href ? (
        <>
          {isExternal ? (
            <a className={className} href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ) : (
            <NextLink href={href}>
              <a className={className}>{children}</a>
            </NextLink>
          )}
        </>
      ) : (
        <button className={className} type={type} disabled={isDisabled || isLoading} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export { PlainButton };
