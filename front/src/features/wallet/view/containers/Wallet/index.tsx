import { FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store/createStore';
import { ConnectCard, Preloader, Wallet as WalletComponent } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { isErrorWithMessage } from 'shared/types';
import { env } from 'shared/utils';

import { ConnectButtons } from '../../components';
import styles from './wallet.module.scss';

type Props = {};

const Wallet: FC<Props> = observer(() => {
  const {
    provider,
    user,
    address,
    explorerURL,
    balance,
    freeMixBalance,
    keeperAuth,
    cloudAuth,
    webAuth,
    getAddress,
    getExplorerURL,
    getBalance,
    getFreeMixBalance,
    disconnect,
  } = useStore().wallet;
  const { isPending, error, setLoadingStatus } = usePreloader('', false);

  const currencies = [];
  if (balance !== null) currencies.push(balance);
  if (freeMixBalance !== null) currencies.push(freeMixBalance);

  const handleKeeperClick = useCallback(async () => {
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

  const handleExchangeMailClick = useCallback(async () => {
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
  }, [cloudAuth, setLoadingStatus]);

  const handleExchangeSeedClick = useCallback(async () => {
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
  }, [webAuth, setLoadingStatus]);

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
    if (user === null) return;
    const fetchData = async () => {
      setLoadingStatus({ isPending: true, error: '' });
      try {
        await Promise.all([getAddress(user), getExplorerURL(user), getBalance(user), getFreeMixBalance(user)]);
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
  }, [user, getAddress, getExplorerURL, getBalance, setLoadingStatus, getFreeMixBalance]);

  useEffect(() => {
    switch (provider) {
      case env.keeper.provider:
        handleKeeperClick();
        break;
      case env.cloud.provider:
        handleExchangeMailClick();
        break;
      case env.web.provider:
        handleExchangeSeedClick();
        break;
      default:
    }
  }, [provider, handleKeeperClick, handleExchangeMailClick, handleExchangeSeedClick]);

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
              currencies={currencies}
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
