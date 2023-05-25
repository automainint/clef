import { observer } from 'mobx-react-lite';
import { FC, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import cn from 'classnames';

import { NotePreloader } from 'shared/components';
import { useStore } from 'store/createStore';
import { usePreloader, useTriggerScrollFix } from 'shared/hooks';
import { ContainerTypes, isErrorWithMessage, User } from 'shared/types';
import { getSongAssetID, getSongID, getSongLabel } from 'shared/utils';

import { RowCard } from '../../components';
import { Disc } from '../Disc';
import { ObserveDNAButton } from '../ObserveDNAButton';
import { LikeButton } from '../LikeButton';
import styles from './topList.module.scss';

type Props = {
  user: User | null;
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
};

const TopList: FC<Props> = observer(({ user, currentPlayingID, PlayButton }) => {
  const { topSongs, mustRefetchTopSongs, getNextTopSongs, resetTopSongs, setMustRefetchTopSongs } = useStore().song;
  const { isPending, error, setLoadingStatus } = usePreloader('', true);

  const fetchNextTopSongs = useCallback(async () => {
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await getNextTopSongs();
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
  }, [getNextTopSongs, setLoadingStatus]);

  useEffect(() => {
    fetchNextTopSongs();
  }, [fetchNextTopSongs]);

  useEffect(() => {
    if (!mustRefetchTopSongs) return;
    setMustRefetchTopSongs(false);
    resetTopSongs();
    fetchNextTopSongs();
  }, [mustRefetchTopSongs, setMustRefetchTopSongs, resetTopSongs, fetchNextTopSongs]);

  useTriggerScrollFix([topSongs.length]);

  return (
    <InfiniteScroll
      dataLength={topSongs.length}
      hasMore={topSongs.length !== 0}
      next={fetchNextTopSongs}
      loader={null}
      style={{ overflow: 'initial' }}
    >
      <div className={styles.list}>
        {topSongs.length > 0 &&
          topSongs.map(({ song, order }, index) => (
            <RowCard
              key={getSongAssetID(song)}
              number={`${order || index + 1}`}
              title={getSongLabel(song)}
              disc={<Disc song={song} isPlaying={currentPlayingID === getSongID(song)} isSmall />}
              playButton={<PlayButton playableResource={song} />}
              passportButton={
                <ObserveDNAButton
                  currentPlayingID={currentPlayingID}
                  assetID={getSongAssetID(song)}
                  PlayButton={PlayButton}
                />
              }
              likeButton={
                <LikeButton user={user} assetID={getSongAssetID(song)} withCount allowAutoFetchList={false} />
              }
            />
          ))}
        {(isPending || error) && (
          <div className={cn(styles.preloader, { [styles.preloaderIndented]: topSongs.length === 0 })}>
            <NotePreloader isPending={isPending} error={error} />
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
});

export { TopList };
