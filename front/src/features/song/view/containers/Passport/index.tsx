import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { DnaCard, Preloader } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { isErrorWithMessage } from 'shared/types';
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
import { ShareButton } from '../ShareButton';
import styles from './passport.module.scss';

type Props = {
  id: string;
  isNew?: boolean;
  onLoad?: (title: string) => void;
};

const Passport: FC<Props> = observer(({ id, isNew = false, onLoad = undefined }) => {
  const { fetchSong, song } = useStore().song;
  const { isPending, error, setLoadingStatus } = usePreloader('', true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSong(id);
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
  }, [setLoadingStatus, fetchSong, id]);

  useEffect(() => {
    if (isPending || error || song !== null) return;
    setLoadingStatus({ isPending: false, error: 'song does not exist' });
  }, [isPending, error, setLoadingStatus, song]);

  useEffect(() => {
    if (song === null) return;
    const title = getSongLabel(song);
    if (typeof title !== 'string') return;
    onLoad?.(title);
  }, [onLoad, song]);

  return (
    <>
      {isPending || error || song === null ? (
        <div className={styles.preloader}>
          <Preloader isPending={isPending} error={error} />
        </div>
      ) : (
        <DnaCard
          disc={<Disc song={song} isSaveImage={isNew} />}
          title={getSongLabel(song)}
          melodyKey={getSongTonality(song)}
          tempo={getSongBPM(song)}
          length={getTimeFormat(renderSheet(song).duration)}
          meter={getScaleFormat(getSongMeter(song))}
          generation={getSongGeneration(song)}
          id={getSongAssetID(song)}
          url={getSongAssetURL(song)}
          chordNames={getSongChordNames(song)}
          chords={getSongChords(song)}
          instruments={getInstruments(renderSheet(song))}
          withMessage={isNew}
          buttons={[{ key: 'play', button: <PlayButton song={song} /> }]}
        />
      )}
    </>
  );
});

export { Passport };
