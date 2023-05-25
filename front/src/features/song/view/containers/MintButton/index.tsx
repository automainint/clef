import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { LaunchButton, Modal } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { ContainerTypes, isErrorWithMessage, User } from 'shared/types';
import { getSongAssetID } from 'shared/utils';
import { useStore } from 'store/createStore';

import { Passport } from '../Passport';

type Props = {
  user: User | null;
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
};

const MintButton: FC<Props> = observer(({ user, currentPlayingID, PlayButton }) => {
  const { selectedToMint, mintableSongsWithInfo, newMintedSong, mint, resetNewMintedSong } = useStore().song;
  const { isPending, error, setLoadingStatus } = usePreloader('', false);

  let info = '';
  if (selectedToMint === null) info = 'Pick a song to mint';
  if (isPending) info = 'Wait while your song is minting';

  const handleClick = async () => {
    if (user === null) return;
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await mint(user);
      setLoadingStatus({ isPending: false, error: '' });
    } catch (err) {
      setLoadingStatus({ isPending: false, error: 'Something went wrong' });
      if (isErrorWithMessage(err)) {
        // eslint-disable-next-line no-console
        console.log(`Error: ${err.message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Unknown error: ${JSON.stringify(err)}`);
      }
    }
  };

  const handleModalClose = () => resetNewMintedSong();

  return (
    <>
      {mintableSongsWithInfo.length > 0 && (
        <LaunchButton
          text={isPending ? 'Minting' : 'Mint'}
          info={selectedToMint === null ? error || info : ''}
          isLoading={isPending}
          isDisabled={selectedToMint === null}
          onClick={handleClick}
        />
      )}
      <Modal isOpen={newMintedSong !== null} onClose={handleModalClose}>
        {newMintedSong !== null && (
          <Passport
            assetID={getSongAssetID(newMintedSong)}
            PlayButton={PlayButton}
            currentPlayingID={currentPlayingID}
            withMessageForType="song"
          />
        )}
      </Modal>
    </>
  );
});

export { MintButton };
