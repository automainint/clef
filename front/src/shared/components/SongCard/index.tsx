import { FC, ReactElement, ReactNode } from 'react';
import cn from 'classnames';

import { SongType } from 'shared/types';

import { Currency } from 'shared/types/currency';
import styles from './songCard.module.scss';

type Props = {
  songType: SongType;
  title: string;
  disc: ReactNode;
  playButton: ReactElement;
  price?: Currency | null;
  quantity?: number | null;
  isSelected?: boolean;
  passportButton?: ReactElement | null;
};

const SongCard: FC<Props> = ({
  disc,
  playButton,
  songType,
  title,
  price = null,
  quantity = null,
  isSelected = false,
  passportButton = null,
}) => (
  <div
    className={cn(styles.root, {
      [styles.typeCover]: songType === 'cover' && passportButton,
      [styles.typeMix]: songType === 'mix' && passportButton,
      [styles.typeGenesis]: songType === 'genesis' && passportButton,
      [styles.selected]: isSelected,
      [styles.selectable]: passportButton === null,
      [styles.tall]: passportButton !== null,
    })}
  >
    <div className={styles.head}>
      <div className={styles.disc}>{disc}</div>
      <div className={styles.headOverlay}>
        <div
          className={cn(styles.chip, {
            [styles.chipTypeCover]: songType === 'cover',
            [styles.chipTypeMix]: songType === 'mix',
            [styles.chipTypeGenesis]: songType === 'genesis',
          })}
        >
          <p className={styles.chipText}>{songType}</p>
        </div>
        {!passportButton && <div className={styles.playButton}>{playButton}</div>}
      </div>
    </div>
    <p className={cn(styles.title, { [styles.titleIndented]: passportButton !== null })}>{title}</p>
    {!passportButton && price !== null && quantity !== null && (
      <div className={styles.details}>
        <p className={styles.text}>
          {price.amount} {price.asset_name.toUpperCase()}
        </p>
        <p className={styles.text}>Qty: {quantity}</p>
      </div>
    )}
    {passportButton && (
      <div className={styles.action}>
        <div className={styles.playButton}>{playButton}</div>
        <div className={styles.passportButton}>{passportButton}</div>
      </div>
    )}
  </div>
);

export { SongCard };
