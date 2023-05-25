import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect } from 'react';
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
import styles from './likesList.module.scss';

type Props = {
  user: User | null;
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
};

const LikesList: FC<Props> = observer(({ user, currentPlayingID, PlayButton }) => {
  const { likesSongs, mustRefetchLikesSongs, getNextLikesSongs, resetLikesSongs, setMustRefetchLikesSongs } =
    useStore().song;
  const { isPending, error, setLoadingStatus } = usePreloader('', true);

  const fetchNextLikesSongs = useCallback(async () => {
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await getNextLikesSongs();
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
  }, [getNextLikesSongs, setLoadingStatus]);

  useEffect(() => {
    fetchNextLikesSongs();
  }, [fetchNextLikesSongs]);

  useEffect(() => {
    if (!mustRefetchLikesSongs) return;
    setMustRefetchLikesSongs(false);
    resetLikesSongs();
    fetchNextLikesSongs();
  }, [mustRefetchLikesSongs, setMustRefetchLikesSongs, resetLikesSongs, fetchNextLikesSongs]);

  useTriggerScrollFix([likesSongs.length]);

  return (
    <InfiniteScroll
      dataLength={likesSongs.length}
      hasMore={likesSongs.length !== 0}
      next={fetchNextLikesSongs}
      loader={null}
      style={{ overflow: 'initial' }}
    >
      <div className={styles.list}>
        {likesSongs.length > 0 &&
          likesSongs.map(({ song, order }, index) => (
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
          <div className={cn(styles.preloader, { [styles.preloaderIndented]: likesSongs.length === 0 })}>
            <NotePreloader isPending={isPending} error={error} />
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
});

export { LikesList };
