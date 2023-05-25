/* eslint-disable react/button-has-type */
import { FC, PropsWithChildren, PointerEvent } from 'react';
import cn from 'classnames';

import { Theme } from 'shared/types';

import styles from './pushButton.module.scss';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  theme?: Theme;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: (event: PointerEvent<HTMLButtonElement>) => void;
};

const PushButton: FC<PropsWithChildren<Props>> = ({
  children,
  type = 'button',
  theme = 'light',
  isLoading = false,
  isDisabled = false,
  onClick,
}) => (
  <button
    className={cn(styles.root, {
      [styles.loading]: isLoading,
      [styles.themeDark]: theme === 'dark',
    })}
    type={type}
    disabled={isDisabled || isLoading}
    onClick={onClick}
  >
    {children}
  </button>
);

export { PushButton };
