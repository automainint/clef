import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC } from 'react';

import { RadioBox, SongCard } from 'shared/components';
import { ContainerTypes, Song } from 'shared/types';
import { getSongID, getSongLabel } from 'shared/utils';
import { useStore } from 'store/createStore';

import { Disc } from '../Disc';
import styles from './selectToMint.module.scss';

type Props = {
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
};

const SelectToMint: FC<Props> = observer(({ currentPlayingID, PlayButton }) => {
  const { mintableSongsWithInfo, selectedToMint, selectToMint } = useStore().song;

  const isChecked = (song: Song) => (selectedToMint !== null ? getSongID(selectedToMint) === getSongID(song) : false);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const selectedSong = mintableSongsWithInfo.find(({ song }) => getSongID(song) === value);
    if (selectedSong === undefined) return;
    selectToMint(selectedSong.song);
  };

  return (
    <div className={styles.root}>
      {mintableSongsWithInfo.length > 0 ? (
        mintableSongsWithInfo.map(({ song, type, price, quantity }) => (
          <RadioBox
            key={getSongID(song)}
            name="song-to-mint"
            value={getSongID(song)}
            checked={isChecked(song)}
            onChange={handleChange}
            hidden
          >
            <SongCard
              songType={type}
              title={getSongLabel(song)}
              price={price}
              quantity={quantity}
              disc={<Disc song={song} isPlaying={currentPlayingID === getSongID(song)} />}
              playButton={<PlayButton playableResource={song} />}
              isSelected={isChecked(song)}
            />
          </RadioBox>
        ))
      ) : (
        <p>No mintable songs...</p>
      )}
    </div>
  );
});

export { SelectToMint };
