import { FC, ReactNode } from 'react';
import cn from 'classnames';

import { InstrumentLine } from 'shared/types';

import { Chords } from '../Chords';
import { Instruments } from '../Instruments';
import { ArrowExternal, CircleCheck } from '../svg';
import styles from './dnaCard.module.scss';

type Props = {
  disc: ReactNode;
  title: string;
  melodyKey: string;
  tempo: string;
  length: string;
  meter: string;
  generation: string;
  id: string;
  url: string;
  chordNames: string[];
  chords: number[][];
  instruments: InstrumentLine[];
  withMessage?: boolean;
  buttons?: { key: string; button: ReactNode; size?: 'small' | 'middle' }[];
};

const DnaCard: FC<Props> = ({
  disc,
  title,
  melodyKey,
  tempo,
  length,
  meter,
  generation,
  id,
  url,
  chordNames,
  chords,
  instruments,
  withMessage = false,
  buttons = [],
}) => (
  <div className={styles.root}>
    {withMessage && (
      <div className={styles.message}>
        <div className={styles.messageIcon}>
          <CircleCheck />
        </div>
        <div className={styles.messageText}>
          <p className={styles.messageTitle}>Your new mix is ready</p>
          <p className={styles.messageDesc}>The new mix is added to your library</p>
        </div>
      </div>
    )}
    <div className={styles.header}>
      <div className={styles.disc}>{disc}</div>
      <div className={styles.info}>
        <p className={styles.desc}>Track</p>
        <p className={styles.title}>{title}</p>
        {buttons.length > 0 && (
          <div className={styles.buttons}>
            {buttons.map(({ key, button, size }) => (
              <div key={key} className={cn(styles.button, { [styles.buttonSizeMiddle]: size === 'middle' })}>
                {button}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <div className={styles.passport}>
      <div className={styles.details}>
        <div className={styles.detailsItem}>
          <p className={styles.desc}>Key</p>
          <p className={styles.detailsValue}>{melodyKey}</p>
        </div>
        <div className={styles.detailsItem}>
          <p className={styles.desc}>Tempo</p>
          <p className={styles.detailsValue}>{tempo}</p>
        </div>
        <div className={styles.detailsItem}>
          <p className={styles.desc}>Length</p>
          <p className={styles.detailsValue}>{length}</p>
        </div>
        <div className={styles.detailsItem}>
          <p className={styles.desc}>Meter</p>
          <p className={styles.detailsValue}>{meter}</p>
        </div>
        <div className={styles.detailsItem}>
          <p className={styles.desc}>Gen.</p>
          <p className={styles.detailsValue}>{generation}</p>
        </div>
      </div>
      <div className={styles.idSection}>
        <p className={styles.subtitle}>ID</p>
        <a className={styles.idLink} href={url} target="_blank" rel="noopener noreferrer">
          {id} <ArrowExternal />
        </a>
      </div>
      <div className={styles.chordsSection}>
        <p className={styles.subtitle}>Chord progression</p>
        <div className={styles.chords}>
          <Chords names={chordNames} chords={chords} />
        </div>
      </div>
      <div className={styles.instrumentsSection}>
        <p className={styles.subtitle}>Instruments</p>
        <div className={styles.instruments}>
          <Instruments instruments={instruments} />
        </div>
      </div>
    </div>
  </div>
);

export { DnaCard };
