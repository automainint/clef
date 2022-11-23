import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store/createStore';
import { Cross, Modal, PlainButton } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { isErrorWithMessage } from 'shared/types';

import { ConnectButtons } from '../../components';
import styles from './connectButton.module.scss';

type Props = {
  isInvert?: boolean;
};

const ConnectButton: FC<Props> = observer(({ isInvert = false }) => {
  const { keeperAuth, cloudAuth, webAuth } = useStore().wallet;
  const { isPending, error, setLoadingStatus } = usePreloader('', false);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleKeeperClick = async () => {
    handleModalClose();
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await keeperAuth();
      setLoadingStatus({ isPending: false, error: '' });
    } catch (err) {
      setLoadingStatus({ isPending: false, error: 'something went wrong' });
      if (isErrorWithMessage(err)) {
        // eslint-disable-next-line no-console
        console.log(`Error: ${err.message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Unknown error: ${JSON.stringify(err)}`);
      }
    }
  };

  const handleExchangeMailClick = async () => {
    handleModalClose();
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await cloudAuth();
      setLoadingStatus({ isPending: false, error: '' });
    } catch (err) {
      setLoadingStatus({ isPending: false, error: 'something went wrong' });
      if (isErrorWithMessage(err)) {
        // eslint-disable-next-line no-console
        console.log(`Error: ${err.message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Unknown error: ${JSON.stringify(err)}`);
      }
    }
  };

  const handleExchangeSeedClick = async () => {
    handleModalClose();
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await webAuth();
      setLoadingStatus({ isPending: false, error: '' });
    } catch (err) {
      setLoadingStatus({ isPending: false, error: 'something went wrong' });
      if (isErrorWithMessage(err)) {
        // eslint-disable-next-line no-console
        console.log(`Error: ${err.message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Unknown error: ${JSON.stringify(err)}`);
      }
    }
  };

  return (
    <>
      <PlainButton onClick={handleButtonClick} isLoading={isPending} theme={isInvert ? 'filledDark' : 'borderedLight'}>
        Connect Wallet
      </PlainButton>
      {error && <div className={styles.message}>Error: {error}</div>}
      <Modal isOpen={showModal} onClose={handleModalClose} withoutCloseButton>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <p className={styles.modalTitle}>Connect wallet</p>
            <button className={styles.modalCloseButton} onClick={handleModalClose} type="button">
              <Cross />
            </button>
          </div>
          <div className={styles.modalContent}>
            <ConnectButtons
              onExchangeMailClick={handleExchangeMailClick}
              onExchangeSeedClick={handleExchangeSeedClick}
              onKeeperClick={handleKeeperClick}
            />
          </div>
        </div>
      </Modal>
    </>
  );
});

export { ConnectButton };
