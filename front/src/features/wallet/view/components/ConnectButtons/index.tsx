import { FC } from 'react';

import styles from './connectButtons.module.scss';

type Props = {
  onExchangeMailClick?: () => void;
  onExchangeSeedClick?: () => void;
  onKeeperClick?: () => void;
};

const ConnectButtons: FC<Props> = ({ onExchangeMailClick, onExchangeSeedClick, onKeeperClick }) => (
  <div className={styles.root}>
    <button className={styles.button} onClick={onExchangeMailClick} type="button">
      <span className={styles.buttonText}>Waves Exchange Mail</span>
      <span className={styles.buttonDesc}>Log in by Waves Exchange email account</span>
    </button>
    <button className={styles.button} onClick={onExchangeSeedClick} type="button">
      <span className={styles.buttonText}>Waves Exchange Seed</span>
      <span className={styles.buttonDesc}>Log in by Waves Exchange seed account</span>
    </button>
    <button className={styles.button} onClick={onKeeperClick} type="button">
      <span className={styles.buttonText}>Waves Keeper</span>
      <span className={styles.buttonDesc}>Log in using Waves Keeper</span>
    </button>
  </div>
);

export { ConnectButtons };
