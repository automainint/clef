import { FC, ReactElement } from 'react';

import styles from './rowCard.module.scss';

type Props = {
  number: string;
  title: string;
  disc: ReactElement;
  playButton: ReactElement;
  passportButton: ReactElement;
  likeButton: ReactElement;
};

const RowCard: FC<Props> = ({ number, title, disc, playButton, passportButton, likeButton }) => (
  <div className={styles.root}>
    <div className={styles.number}>{number}</div>
    <div className={styles.disc}>{disc}</div>
    <div className={styles.title}>{title}</div>
    <div className={styles.buttons}>
      <div className={styles.pushButtons}>
        {playButton} {passportButton}
      </div>
      <div className={styles.like}>{likeButton}</div>
    </div>
  </div>
);

export { RowCard };
