import { FC, ReactElement } from 'react';
import cn from 'classnames';

import styles from './elementCard.module.scss';

type Props = {
  title: string;
  text: string;
  icon: ReactElement;
  price?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
};

const ElementCard: FC<Props> = ({ title, text, icon, price = '', isSelected = false, isDisabled = false }) => (
  <div className={cn(styles.root, { [styles.selected]: isSelected, [styles.disabled]: isDisabled })}>
    <div className={styles.header}>
      <div className={styles.icon}>{icon}</div>
      <p className={styles.title}>{title}</p>
    </div>
    <div className={styles.footer}>
      <p className={styles.text}>{text}</p>
      {price !== '' && <p className={styles.price}>{price}</p>}
    </div>
  </div>
);

export { ElementCard };
