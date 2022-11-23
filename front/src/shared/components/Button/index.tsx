/* eslint-disable react/button-has-type */
import { FC, PropsWithChildren, PointerEvent } from 'react';
import cn from 'classnames';

import styles from './button.module.scss';

type Props = {
  size?: 'big' | 'small';
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: (event: PointerEvent<HTMLButtonElement>) => void;
};

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  size = 'big',
  type = 'button',
  isLoading = false,
  isDisabled = false,
  onClick,
}) => (
  <button
    className={cn(styles.root, {
      [styles.big]: size === 'big',
      [styles.small]: size === 'small',
      [styles.loading]: isLoading,
    })}
    type={type}
    disabled={isDisabled || isLoading}
    onClick={onClick}
  >
    {children}
  </button>
);

export { Button };
