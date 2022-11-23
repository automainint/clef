import { FC } from 'react';
import cn from 'classnames';

import styles from './chords.module.scss';

type Props = {
  names: string[];
  chords: number[][];
};

const Chords: FC<Props> = ({ names, chords }) => {
  const min = chords.reduce(
    (result, chord) => (Math.min(...chord) < result ? Math.min(...chord) : result),
    Math.min(...chords[0])
  );
  const max = chords.reduce(
    (result, chord) => (Math.max(...chord) > result ? Math.max(...chord) : result),
    Math.max(...chords[0])
  );
  const length = max - min + 1;
  const lines: number[] = [];
  for (let i = 0; i < length; i += 1) lines.push(Math.random());

  return (
    <div className={styles.root}>
      {names.map((name, chordIndex) => (
        <div key={name + Math.random()} className={styles.chord}>
          <div
            className={cn(styles.chordBox, {
              [styles.chordBoxSmall]: length <= 8,
              [styles.chordBoxMedium]: length > 8 && length <= 16,
              [styles.chordBoxBig]: length > 16 && length <= 24,
            })}
          >
            {lines.map((key, lineIndex) => (
              <div
                key={key}
                className={cn(styles.note, { [styles.noteMarked]: chords[chordIndex].indexOf(lineIndex + min) !== -1 })}
              />
            ))}
          </div>
          <p className={styles.label}>{name}</p>
        </div>
      ))}
    </div>
  );
};

export { Chords };
