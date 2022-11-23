import { FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './announcementCard.module.scss';

type Props = {
  title: string;
  text: string;
  head?: ReactNode | null;
  buttons?: { key: string; button: ReactNode }[] | null;
  theme?: 'light' | 'blueGradient';
};

const AnnouncementCard: FC<Props> = ({ title, text, head = null, buttons = null, theme = 'light' }) => (
  <div className={cn(styles.root, { [styles.blueGradient]: theme === 'blueGradient' })}>
    {head !== null && <div className={styles.head}>{head}</div>}
    <h2 className={cn(styles.title, { [styles.titleIndented]: head !== null })}>{title}</h2>
    <p
      className={cn(styles.text, {
        [styles.textInverted]: theme === 'blueGradient',
        [styles.textIndented]: head === null,
      })}
    >
      {text}
    </p>
    {buttons !== null && (
      <div className={cn(styles.buttons, { [styles.buttonsIndented]: head === null })}>
        {buttons.map(({ key, button }) => (
          <div key={key} className={styles.button}>
            {button}
          </div>
        ))}
      </div>
    )}
  </div>
);

export { AnnouncementCard };
