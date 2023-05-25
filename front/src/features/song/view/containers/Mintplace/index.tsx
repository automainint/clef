import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { NotePreloader } from 'shared/components';
import { usePreloader, useTriggerScrollFix } from 'shared/hooks';
import { ContainerTypes, isErrorWithMessage } from 'shared/types';
import { useStore } from 'store/createStore';

import { SelectToMint } from '../SelectToMint';
import styles from './mintplace.module.scss';

type Props = {
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
};

const Mintplace: FC<Props> = observer(({ currentPlayingID, PlayButton }) => {
  const { mintableSongsWithInfo, isMintPending, getMintableSongAssetIDs, getNextMintableSongsWithInfo } =
    useStore().song;
  const { isPending, error, setLoadingStatus } = usePreloader('', true);

  const handleInfiniteScrollNext = async () => {
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await getNextMintableSongsWithInfo();
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
    const fetchData = async () => {
      try {
        await getMintableSongAssetIDs();
        await getNextMintableSongsWithInfo();
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
  }, [getMintableSongAssetIDs, getNextMintableSongsWithInfo, setLoadingStatus]);

  useTriggerScrollFix([mintableSongsWithInfo.length]);

  return (
    <div className={styles.root}>
      <p className={styles.title}>{isMintPending || isPending ? 'Please wait...' : 'Mintplace'}</p>
      {isPending || error || isMintPending ? (
        <NotePreloader isPending={isPending || isMintPending} error={error} />
      ) : (
        <InfiniteScroll
          dataLength={mintableSongsWithInfo.length}
          hasMore={mintableSongsWithInfo.length !== 0}
          next={handleInfiniteScrollNext}
          loader={null}
          style={{ overflow: 'initial' }}
        >
          <SelectToMint currentPlayingID={currentPlayingID} PlayButton={PlayButton} />
        </InfiniteScroll>
      )}
    </div>
  );
});

export { Mintplace };
