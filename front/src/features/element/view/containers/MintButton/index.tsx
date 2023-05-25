import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { LaunchButton, Modal } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { ContainerTypes, isErrorWithMessage, User } from 'shared/types';
import { useStore } from 'store/createStore';

import { Passport } from '../Passport';

type Props = {
  user: User | null;
  PlayButton: ContainerTypes['PlayButton'];
};

const MintButton: FC<Props> = observer(({ user, PlayButton }) => {
  const { selectedToMint, newMintedElement, mint, resetNewMintedElement } = useStore().element;
  const { isPending, error, setLoadingStatus } = usePreloader('', false);

  let info = '';
  if (selectedToMint === null) info = 'Pick an element to mint';
  if (isPending) info = 'Wait while your element is minting';

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

  const handleModalClose = () => resetNewMintedElement();

  return (
    <>
      <LaunchButton
        text={isPending ? 'Minting' : 'Mint'}
        info={error || info}
        isLoading={isPending}
        isDisabled={selectedToMint === null}
        onClick={handleClick}
      />
      <Modal isOpen={newMintedElement !== null} onClose={handleModalClose}>
        {newMintedElement !== null && <Passport element={newMintedElement} PlayButton={PlayButton} />}
      </Modal>
    </>
  );
});

export { MintButton };
