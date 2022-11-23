import dynamic from 'next/dynamic';
import { forwardRef, useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import cn from 'classnames';

import { SongColor } from 'shared/types';

import { Note } from '../svg';
import { DefaultCircle } from './DefaultCircle';
import styles from './disc.module.scss';

const GradientCircle = dynamic(() => import('./GradientCircle'), { ssr: false });

type Props = {
  colors?: SongColor[];
  isAnimate?: boolean;
  onRendered?: () => void;
};

const Disc = forwardRef<HTMLDivElement, Props>(({ colors = undefined, isAnimate = false, onRendered }, ref) => {
  const [isRendering, setIsRendering] = useState(true);

  const angle = colors ? (colors.reduce((acc, color) => acc + color) / colors.length) * 360 : 0;

  const handleRendered = async () => {
    setIsRendering(false);
    onRendered?.();
  };

  const gradientCircleFallbackRender = useCallback(() => <DefaultCircle angle={angle} />, [angle]);

  return (
    <div className={cn(styles.root, { [styles.animate]: isAnimate })}>
      <div ref={ref} className={styles.discContainer}>
        <div className={styles.disc} style={{ transform: `rotate(${angle}deg)` }}>
          <ErrorBoundary fallbackRender={gradientCircleFallbackRender}>
            {(isRendering || colors === undefined) && <DefaultCircle angle={angle} />}
            {colors !== undefined && <GradientCircle colors={colors} onRendered={handleRendered} />}
          </ErrorBoundary>
          <div className={styles.note}>
            <Note />
          </div>
        </div>
      </div>
      <div className={styles.border} />
    </div>
  );
});

export { Disc };
