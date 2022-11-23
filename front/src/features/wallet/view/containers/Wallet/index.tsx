import { FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store/createStore';
import { ConnectCard, Preloader, Wallet as WalletComponent } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { isErrorWithMessage } from 'shared/types';

import { ConnectButtons } from '../../components';
import styles from './wallet.module.scss';

type Props = {};

const Wallet: FC<Props> = observer(() => {
  const {
    user,
    address,
    explorerURL,
    balance,
    keeperAuth,
    cloudAuth,
    webAuth,
    getAddress,
    getExplorerURL,
    getBalance,
    disconnect,
  } = useStore().wallet;
  const { isPending, error, setLoadingStatus } = usePreloader('', true);

  const defaultAuth = useCallback(async () => {
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
  }, [keeperAuth, setLoadingStatus]);

  const handleKeeperClick = () => defaultAuth();

  const handleExchangeMailClick = async () => {
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

  const handleDisconnectClick = async () => {
    if (user === null) return;
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await disconnect(user);
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

  useEffect(() => {
    defaultAuth();
  }, [defaultAuth]);

  useEffect(() => {
    if (user === null) return;
    const fetchData = async () => {
      setLoadingStatus({ isPending: true, error: '' });
      try {
        await Promise.all([getAddress(user), getExplorerURL(user), getBalance(user)]);
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

    fetchData();
  }, [user, getAddress, getExplorerURL, getBalance, setLoadingStatus]);

  return (
    <>
      {isPending ? (
        <div className={styles.preloader}>
          <Preloader isPending={isPending} />
        </div>
      ) : (
        <>
          {user === null ? (
            <ConnectCard>
              <ConnectButtons
                onExchangeMailClick={handleExchangeMailClick}
                onExchangeSeedClick={handleExchangeSeedClick}
                onKeeperClick={handleKeeperClick}
              />
            </ConnectCard>
          ) : (
            <WalletComponent
              address={address}
              explorerURL={explorerURL}
              currencies={[{ label: 'USDN', value: balance }]}
              onDisconnectClick={handleDisconnectClick}
            />
          )}
          {error && <p>Error: {error}</p>}
        </>
      )}
    </>
  );
});

export { Wallet };
