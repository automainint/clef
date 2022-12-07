import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { Preloader } from 'shared/components';

import { usePreloader } from 'shared/hooks';
import { isErrorWithMessage } from 'shared/types';
import { useStore } from 'store/createStore';

import styles from './rarity.module.scss';

type Props = {
  assetID: string;
};

const Rarity: FC<Props> = observer(({ assetID }) => {
  const { rarity, fetchSongRarity } = useStore().song;
  const { isPending, error, setLoadingStatus } = usePreloader('', true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSongRarity(assetID);
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
  }, [setLoadingStatus, assetID, fetchSongRarity]);

  return (
    <>
      {!error && (
        <div className={styles.root}>
          <p className={styles.desc}>Rarity</p>
          {isPending ? (
            <div className={styles.preloader}>
              <Preloader isPending />
            </div>
          ) : (
            <p className={styles.value}>{rarity}%</p>
          )}
        </div>
      )}
    </>
  );
});

export { Rarity };
