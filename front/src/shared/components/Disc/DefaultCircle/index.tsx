import { FC } from 'react';

import { defaultColors } from '../constants';
import styles from './defaultCircle.module.scss';

type Props = {
  angle: number;
};

const DefaultCircle: FC<Props> = ({ angle }) => {
  const defaultCircleGradient = `
    conic-gradient(from ${angle - 77}deg, 
    ${defaultColors.light}, ${defaultColors.dark} 355deg, ${defaultColors.light} 360deg
  `;

  return <div className={styles.root} style={{ background: defaultCircleGradient }} />;
};

export { DefaultCircle };
