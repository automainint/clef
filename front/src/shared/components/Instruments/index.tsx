import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { InstrumentLine } from 'shared/types';
import { mobileMaxWidthBP, mobilePaddings } from 'shared/constants';

import { defaultLineWidth } from './constants';
import styles from './instruments.module.scss';

type Props = {
  instruments: InstrumentLine[];
};

const Instruments: FC<Props> = ({ instruments }) => {
  const [lineWidth, setLineWidth] = useState(defaultLineWidth);

  const isNarrow = (duration: number) => {
    const widthPer = lineWidth * duration;
    return widthPer < 2 && widthPer !== 0;
  };

  useEffect(() => {
    if (!window) return;
    const changeLineWidth = () => {
      if (window.screen.width > mobileMaxWidthBP) setLineWidth(260);
      else setLineWidth(window.screen.width - mobilePaddings);
    };
    changeLineWidth();
    window.addEventListener('resize', changeLineWidth);
    return () => window.removeEventListener('resize', changeLineWidth);
  }, []);

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
