import { FC, ReactElement } from 'react';

import { ElementType } from 'shared/types';

import { Beat, Chord, Vibe } from '../svg';
import styles from './elementIcon.module.scss';

type Props = {
  type: ElementType;
  color?: string;
};

const ElementIcon: FC<Props> = ({ type, color = 'white' }) => {
  let icon: ReactElement | null = null;

  switch (type) {
    case 'chord':
      icon = <Chord color={color} />;
      break;
    case 'beat':
      icon = <Beat color={color} />;
      break;
    case 'vibe':
      icon = <Vibe color={color} />;
      break;
    default:
  }

  return (
    <div className={styles.root}>
      <div className={styles.icon}>{icon}</div>
    </div>
  );
};

export { ElementIcon };
