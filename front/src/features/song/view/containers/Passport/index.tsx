import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { DnaCard, Preloader } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { isErrorWithMessage, Song } from 'shared/types';
import {
  getSongAssetID,
  getSongAssetURL,
  getSongBPM,
  getSongChordNames,
  getSongChords,
  getSongGeneration,
  getSongLabel,
  getSongMeter,
  getSongTonality,
  renderSheet,
} from 'shared/utils';
import { useStore } from 'store/createStore';

import { getInstruments, getScaleFormat, getTimeFormat } from '../../../utils';
import { Disc } from '../Disc';
import { PlayButton } from '../PlayButton';
import { Rarity } from '../Rarity';
import { ShareButton } from '../ShareButton';
import styles from './passport.module.scss';

type Props = {
  assetID: string;
  song?: Song;
  isNew?: boolean;
  onLoad?: (title: string) => void;
};

const Passport: FC<Props> = observer(({ assetID, song = undefined, isNew = false, onLoad = undefined }) => {
  const { fetchSong, saveSong, currentSong } = useStore().song;
  const { isPending, error, setLoadingStatus } = usePreloader('', true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (song === undefined) await fetchSong(assetID);
        else saveSong(song);
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
  }, [setLoadingStatus, fetchSong, assetID, saveSong, song]);

  useEffect(() => {
    if (isPending || error || currentSong !== null) return;
    setLoadingStatus({ isPending: false, error: 'song does not exist' });
  }, [isPending, error, setLoadingStatus, currentSong]);

  useEffect(() => {
    if (currentSong === null) return;
    const title = getSongLabel(currentSong);
    if (typeof title !== 'string') return;
    onLoad?.(title);
  }, [onLoad, currentSong]);

  return (
    <>
      {isPending || error || currentSong === null ? (
        <div className={styles.preloader}>
          <Preloader isPending={isPending} error={error} />
        </div>
      ) : (
        <DnaCard
          disc={<Disc song={currentSong} isSaveImage />}
          rarity={<Rarity assetID={getSongAssetID(currentSong)} />}
          title={getSongLabel(currentSong)}
          melodyKey={getSongTonality(currentSong)}
          tempo={getSongBPM(currentSong)}
          length={getTimeFormat(renderSheet(currentSong).duration)}
          meter={getScaleFormat(getSongMeter(currentSong))}
          generation={getSongGeneration(currentSong)}
          id={getSongAssetID(currentSong)}
          url={getSongAssetURL(currentSong)}
          chordNames={getSongChordNames(currentSong)}
          chords={getSongChords(currentSong)}
          instruments={getInstruments(renderSheet(currentSong))}
          withMessage={isNew}
          buttons={[
            { key: 'play', button: <PlayButton song={currentSong} /> },
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
});

export { Passport };
