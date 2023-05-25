import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NotePreloader, SongCard } from 'shared/components';

import { usePreloader } from 'shared/hooks';
import { ContainerTypes, isErrorWithMessage, User } from 'shared/types';
import { getSongAssetID, getSongID, getSongLabel } from 'shared/utils';
import { useStore } from 'store/createStore';

import { Disc } from '../Disc';
import { ObserveDNAButton } from '../ObserveDNAButton';
import styles from './cards.module.scss';

type Props = {
  user: User | null;
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
  allowFetch?: boolean;
};

const Cards: FC<Props> = observer(({ user, currentPlayingID, PlayButton, allowFetch = true }) => {
  const { songsWithType, getNextSongsWithType } = useStore().song;
  const { isPending, error, setLoadingStatus } = usePreloader('', true);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsScrollWrapperRef = useRef<HTMLDivElement>(null);

  const scrollableTargetID = `scrollableID${Math.random()}`;

  const handleInfiniteScrollNext = useCallback(async () => {
    if (user === null) return;
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await getNextSongsWithType(user);
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
  }, [user, getNextSongsWithType, setLoadingStatus]);

  useEffect(() => {
    const fetchData = async () => {
      if (user === null || !allowFetch) return;
      try {
        await getNextSongsWithType(user);
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
  }, [allowFetch, user, getNextSongsWithType, setLoadingStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rootRef.current === null || cardsScrollWrapperRef.current === null) return;
      if (cardsScrollWrapperRef.current.offsetHeight > rootRef.current.offsetHeight) return;
      cardsScrollWrapperRef.current.dispatchEvent(new CustomEvent('scroll'));
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      {(isPending || error) && songsWithType.length === 0 ? (
        <NotePreloader isPending={isPending} error={error} />
      ) : (
        <>
          {songsWithType.length > 0 ? (
            <div className={styles.cardsVisorWrapper}>
              <div ref={cardsScrollWrapperRef} id={scrollableTargetID} className={styles.cardsScrollWrapper}>
                <InfiniteScroll
                  dataLength={songsWithType.length}
                  hasMore={songsWithType.length !== 0}
                  next={handleInfiniteScrollNext}
                  loader={null}
                  style={{ overflow: 'initial' }}
                  scrollableTarget={scrollableTargetID}
                >
                  <div className={styles.cards}>
                    {songsWithType.map(({ song, type }) => (
                      <SongCard
                        key={getSongID(song)}
                        songType={type}
                        title={getSongLabel(song)}
                        disc={<Disc song={song} isPlaying={currentPlayingID === getSongID(song)} />}
                        playButton={<PlayButton playableResource={song} />}
                        passportButton={
                          <ObserveDNAButton
                            assetID={getSongAssetID(song)}
                            currentPlayingID={currentPlayingID}
                            PlayButton={PlayButton}
                          />
                        }
                      />
                    ))}
                    {(isPending || error) && <NotePreloader isPending={isPending} error={error} />}
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          ) : (
            <p className={styles.message}>No songs in your wallet yet</p>
          )}
        </>
      )}
    </div>
  );
});

export { Cards };
