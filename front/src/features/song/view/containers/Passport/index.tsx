import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { DnaCard, Preloader } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { ContainerTypes, isErrorWithMessage, ResourceType } from 'shared/types';

import { useStore } from 'store/createStore';

import { Disc } from '../Disc';
import { Rarity } from '../Rarity';
import { ShareButton } from '../ShareButton';
import styles from './passport.module.scss';

type Props = {
  assetID: string;
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
  withMessageForType?: ResourceType | null;
  onLoad?: (title: string) => void;
};

const Passport: FC<Props> = observer(
  ({ assetID, currentPlayingID, PlayButton, withMessageForType = null, onLoad = undefined }) => {
    const { fetchSong, fetchPassport, passport, currentSong } = useStore().song;
    const { isPending, error, setLoadingStatus } = usePreloader('', true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await fetchSong(assetID);
          await fetchPassport();
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
    }, [setLoadingStatus, fetchSong, fetchPassport, assetID]);

    useEffect(() => {
      if (isPending || error || currentSong !== null) return;
      setLoadingStatus({ isPending: false, error: 'song does not exist' });
    }, [isPending, error, setLoadingStatus, currentSong]);

    useEffect(() => {
      if (passport === null) return;
      onLoad?.(passport.label);
    }, [onLoad, passport]);

    return (
      <>
        {isPending || error || currentSong === null || passport === null ? (
          <div className={styles.preloader}>
            <Preloader isPending={isPending} error={error} />
          </div>
        ) : (
          <DnaCard
            slotElement={<Disc song={currentSong} isPlaying={currentPlayingID === passport.id} isSaveImage />}
            rarity={<Rarity assetID={passport.asset_id} />}
            title={passport.label}
            desc="Track"
            melodyKey={passport.tonality}
            tempo={passport.songBPM}
            length={passport.time}
            meter={passport.scale}
            generation={passport.generation}
            id={passport.asset_id}
            url={passport.url}
            chordNames={passport.chordNames}
            chords={passport.chords}
            instruments={passport.instruments}
            withMessageForType={withMessageForType}
            buttons={[
              { key: 'play', button: <PlayButton playableResource={currentSong} /> },
              {
                key: 'share',
                button: <ShareButton song={currentSong} />,
                size: 'middle',
              },
            ]}
          />
        )}
      </>
    );
  }
);

export { Passport };
