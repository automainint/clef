import { FC, PropsWithChildren, ReactNode } from 'react';
import cn from 'classnames';

import { Cross } from 'shared/components';

import styles from './melodyOnDeck.module.scss';

type Props = {
  title: string;
  buttons?: { key: string; button: ReactNode; size?: 'normal' | 'wider' }[];
  onRemoveClick?: () => void;
};

const MelodyOnDeck: FC<PropsWithChildren<Props>> = ({ children, title, buttons = [], onRemoveClick }) => (
  <div className={styles.root}>
    <div className={styles.disc}>{children}</div>
    <div className={styles.controls}>
      <div className={styles.topSection}>
        <p className={styles.title}>{title}</p>
        <button className={styles.removeButton} onClick={onRemoveClick} type="button">
          <Cross size="small" />
        </button>
      </div>
      <div className={styles.bottomSection}>
        {buttons.length > 0 &&
          buttons.map(({ key, button, size }) => (
            <div key={key} className={cn(styles.button, { [styles.buttonWider]: size === 'wider' })}>
              {button}
            </div>
          ))}
      </div>
    </div>
  </div>
);

export { MelodyOnDeck };
