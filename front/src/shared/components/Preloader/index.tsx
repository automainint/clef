import Image from 'next/image';
import { FC } from 'react';

import Icon from './images/icon.svg';
import styles from './preloader.module.scss';

type Props = {
  isPending?: boolean;
  error?: string;
};

const Preloader: FC<Props> = ({ isPending = false, error = '' }) => (
  <div className={styles.root}>
    {isPending && !error && (
      <div className={styles.imageWrapper}>
        <Image className={styles.image} src={Icon} width={32} height={32} alt="Loading..." />
      </div>
    )}
    {error && <span>Error: {error}</span>}
  </div>
);

export { Preloader };
