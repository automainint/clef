import { FC, PropsWithChildren, useState } from 'react';

import { PlainButton } from '../PlainButton';
import { ArrowLeft } from '../svg';
import styles from './connectCard.module.scss';

type Props = {};

const ConnectCard: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [showVariants, setShowVariants] = useState(false);

  const handleBackClick = () => setShowVariants(false);

  const handleConnectClick = () => setShowVariants(true);

  return (
    <div className={styles.root}>
      {showVariants ? (
        <>
          <button className={styles.backButton} onClick={handleBackClick} type="button">
            <ArrowLeft /> Back
          </button>
          <div className={styles.variants}>{children}</div>
        </>
      ) : (
        <>
          <p className={styles.info}>Wallet is not connected</p>
          <PlainButton size="small" isInvert onClick={handleConnectClick} theme="filledDark">
            Connect wallet
          </PlainButton>
        </>
      )}
    </div>
  );
};

export { ConnectCard };
