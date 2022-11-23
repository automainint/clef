import { FC } from 'react';
import cn from 'classnames';

import { InstrumentLine } from 'shared/types';

import styles from './instruments.module.scss';

type Props = {
  instruments: InstrumentLine[];
};

const Instruments: FC<Props> = ({ instruments }) => {
  const lineWidth = 260;

  const isNarrow = (duration: number) => {
    const widthPer = lineWidth * duration;
    return widthPer < 2 && widthPer !== 0;
  };

  return (
    <div className={styles.root}>
      {instruments.map(({ label, durations }) => (
        <div key={label} className={styles.instrument}>
          <div className={styles.line} style={{ width: `${lineWidth}px` }}>
            {durations.map((duration, index) => (
              <div
                key={duration + Math.random()}
                className={cn(styles.segment, {
                  [styles.segmentMarked]: index % 2 === 0 && !isNarrow(duration),
                  [styles.segmentNarrowMarked]: index % 2 === 0 && isNarrow(duration),
                })}
                style={{ flexBasis: `${lineWidth * duration}%` }}
              />
            ))}
          </div>
          <p className={styles.title}>{label}</p>
        </div>
      ))}
    </div>
  );
};

export { Instruments };
