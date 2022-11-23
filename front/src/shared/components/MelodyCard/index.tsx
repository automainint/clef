import { FC, ReactNode } from 'react';

import { Check } from '../Check';
import styles from './melodyCard.module.scss';

type Props = {
  title: string;
  disc: ReactNode;
  isOnDeck?: boolean;
  buttons?: { key: string; button: ReactNode }[];
  onCheckChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MelodyCard: FC<Props> = ({ title, disc, isOnDeck = false, buttons = [], onCheckChange }) => (
  <div className={styles.root}>
    <div className={styles.melody}>
      <div className={styles.disc}>{disc}</div>
      <div className={styles.innerControls}>
        <p className={styles.title}>{title}</p>
        {buttons.length > 0 && (
          <div className={styles.buttons}>
            {buttons.map(({ key, button }) => (
              <div className={styles.button} key={key}>
                {button}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <div className={styles.outerControls}>
      <Check isChecked={isOnDeck} onChange={onCheckChange}>
        Add to mix
      </Check>
    </div>
  </div>
);

export { MelodyCard };
