import { FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './mixingDeck.module.scss';

type Props = {
  leftSide?: ReactNode;
  rightSide?: ReactNode;
  isSmall?: boolean;
};

const MixingDeck: FC<Props> = ({ leftSide, rightSide, isSmall = false }) => (
  <div className={cn(styles.root, { [styles.small]: isSmall })}>
    <div className={cn(styles.slot, { [styles.slotSmall]: isSmall })}>{leftSide}</div>
    <div className={cn(styles.slot, { [styles.slotSmall]: isSmall })}>{rightSide}</div>
  </div>
);

export { MixingDeck };
