import { FC, useEffect, useRef, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

import { SongColor } from 'shared/types';

import { conicalGradient } from '../utils';
import { songColors } from '../constants';
import styles from './gradientCircle.module.scss';

interface Props {
  colors: SongColor[];
  onRendered?: () => void;
}

const GradientCircle: FC<Props> = ({ colors, onRendered }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number | null>(null);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    if (size === null) return;

    const density = 1000;
    const radius = size / 2;
    const fromAngle = -163;
    const transitionAngle = 4;

    p5.createCanvas(size, size).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.translate(radius, radius);

    const isMultiColor = colors.find((color) => color !== colors[0]) !== undefined;

    const mainSectionColors = isMultiColor
      ? [
          songColors[colors[0]].light,
          ...colors.slice(1, colors.length - 2).map((color) => songColors[color].middle),
          songColors[colors[colors.length - 1]].dark,
        ]
      : [songColors[colors[0]].light, songColors[colors[0]].dark];
    conicalGradient(p5, density, radius, fromAngle, fromAngle + 360 - transitionAngle, mainSectionColors);

    const transitionSectionColors = [songColors[colors[colors.length - 1]].dark, songColors[colors[0]].light];
    conicalGradient(p5, density, radius, fromAngle + 360 - transitionAngle, fromAngle + 360, transitionSectionColors);

    setTimeout(() => onRendered?.());
  };

  useEffect(() => {
    if (rootRef.current === null) return;
    setSize(rootRef.current.offsetWidth);
  }, []);

  return (
    <div ref={rootRef} className={styles.rootRef}>
      {size !== null && <Sketch key={colors?.join()} setup={setup} />}
    </div>
  );
};

export default GradientCircle;
