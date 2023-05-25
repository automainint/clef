import { FC, ReactElement, useState } from 'react';
import cn from 'classnames';
import NextImage from 'next/image';

import { CrossFade, Next, Play, RangeSlider, Stop, Volume } from 'shared/components';
import { ValueWithStatus } from 'shared/types';

import styles from './radio.module.scss';

type Props = {
  disc?: ReactElement | null;
  like?: ReactElement | null;
  title: string;
  volume?: ValueWithStatus<number>;
  isPlaying: boolean;
  isPendingPlay?: boolean;
  isPendingStop?: boolean;
  isPendingNext?: boolean;
  crossFade: ValueWithStatus<boolean>;
  onPlayClick: () => void;
  onStopClick: () => void;
  onNextClick?: () => void;
  onVolumeChange?: (value: number) => void;
  onCrossFadeClick?: () => void;
};

const Radio: FC<Props> = ({
  disc = null,
  like = null,
  title,
  volume,
  isPlaying = false,
  isPendingPlay = false,
  isPendingStop = false,
  isPendingNext = false,
  crossFade = { value: false, status: 'IDLE' },
  onPlayClick,
  onStopClick,
  onNextClick,
  onVolumeChange,
  onCrossFadeClick,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className={styles.root} onPointerLeave={() => setShowVolumeSlider(false)}>
      <div className={styles.disc}>
        {disc !== null ? disc : <NextImage src="/images/disc-stub.png" width={28} height={28} />}
      </div>
      {!isPlaying ? (
        <div className={styles.startContainer}>
          Radio{' '}
          <button
            className={cn(styles.button, styles.buttonIndented, { [styles.buttonBlinked]: isPendingPlay })}
            type="button"
            title="Play"
            disabled={isPendingPlay}
            onClick={onPlayClick}
          >
            <Play />
          </button>
        </div>
      ) : (
        <div className={styles.controlsContainer}>
          <div className={styles.mainControlsWrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.mainControls}>
              <div className={styles.leftControls}>
                <button
                  className={cn(styles.button, { [styles.buttonBlinked]: isPendingStop })}
                  type="button"
                  title="Stop"
                  disabled={isPendingStop || isPendingNext}
                  onClick={onStopClick}
                >
                  <Stop />
                </button>
                {onNextClick !== undefined && (
                  <button
                    className={cn(styles.button, { [styles.buttonBlinked]: isPendingNext })}
                    type="button"
                    title="Next"
                    onClick={onNextClick}
                    disabled={isPendingNext || isPendingStop}
                  >
                    <Next />
                  </button>
                )}
              </div>
              {volume !== undefined && onVolumeChange !== undefined && (
                <div className={styles.volumeButtonWrapper}>
                  <div className={cn(styles.volumeSlider, { [styles.volumeSliderHidden]: !showVolumeSlider })}>
                    <RangeSlider value={volume.value} onChange={onVolumeChange} />
                  </div>
                  <button
                    className={cn(styles.button, styles.buttonEnlarged, {
                      [styles.buttonBlinked]: volume.status === 'PENDING',
                    })}
                    type="button"
                    title="Volume"
                    onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                  >
                    <Volume />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.additionalControls}>
            <button
              className={cn(styles.button, {
                [styles.buttonSelected]: crossFade.value,
                [styles.buttonBlinked]: crossFade.status === 'PENDING',
              })}
              type="button"
              title="Cross-fade"
              onClick={onCrossFadeClick}
            >
              <CrossFade />
            </button>
            {like !== null && <div className={styles.like}>{like}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export { Radio };
