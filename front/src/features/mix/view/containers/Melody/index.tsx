import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { MelodyCard } from 'shared/components';
import { ContainerTypes, Song } from 'shared/types';
import { getSongID, getSongLabel } from 'shared/utils';
import { useStore } from 'store/createStore';

import { MelodyOnDeck } from '../../components';

type Props = {
  song: Song;
  PlayButton: ContainerTypes['PlayButton'];
  ObserveDNAButton: ContainerTypes['ObserveDNAButton'];
  Disc: ContainerTypes['Disc'];
  isDeckCard?: boolean;
  showNewPassport?: boolean;
  onClosePassport?: () => void;
};

const Melody: FC<Props> = observer(
  ({ song, PlayButton, ObserveDNAButton, Disc, isDeckCard = false, showNewPassport = false, onClosePassport }) => {
    const { hybrid, addToHybrid, removeFromHybrid } = useStore().mix;

    const isOnDeck =
      (hybrid[0] !== null && getSongID(song) === getSongID(hybrid[0])) ||
      (hybrid[1] !== null && getSongID(song) === getSongID(hybrid[1]));

    const handleCheckChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
      if (currentTarget.checked) addToHybrid(song);
      else removeFromHybrid(song);
    };

    const handleRemoveClick = () => removeFromHybrid(song);

    return (
      <>
        {isDeckCard ? (
          <MelodyOnDeck
            title={getSongLabel(song)}
            onRemoveClick={handleRemoveClick}
            buttons={[
              { key: 'play', button: <PlayButton song={song} /> },
              {
                key: 'passport',
                button: <ObserveDNAButton id={getSongID(song)} isNew={showNewPassport} onClose={onClosePassport} />,
                size: 'wider',
              },
            ]}
          >
            <Disc song={song} />
          </MelodyOnDeck>
        ) : (
          <MelodyCard
            title={getSongLabel(song)}
            isOnDeck={isOnDeck}
            disc={<Disc song={song} />}
            onCheckChange={handleCheckChange}
            buttons={[
              { key: 'play', button: <PlayButton song={song} /> },
              {
                key: 'passport',
                button: <ObserveDNAButton id={getSongID(song)} isNew={showNewPassport} onClose={onClosePassport} />,
              },
            ]}
          />
        )}
      </>
    );
  }
);

export { Melody };
