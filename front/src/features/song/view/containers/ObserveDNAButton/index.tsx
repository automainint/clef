import { FC, useEffect, useState } from 'react';

import { Button, Dna, Modal } from 'shared/components';
import { ContainerTypes, ResourceType } from 'shared/types';

import { Passport } from '../Passport';

type Props = {
  assetID: string;
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
  withMessageForType?: ResourceType | null;
  onClose?: () => void;
};

const ObserveDNAButton: FC<Props> = ({ assetID, currentPlayingID, PlayButton, withMessageForType = null, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    document.body.style.overflow = '';
    setShowModal(false);
    onClose?.();
  };

  const handleDnaClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (withMessageForType === null) return;
    setShowModal(true);
  }, [withMessageForType]);

  return (
    <>
      <Button size="small" onClick={handleDnaClick}>
        <Dna /> Observe DNA
      </Button>
      <Modal isOpen={showModal} onClose={handleModalClose} isManualClosing>
        <Passport
          assetID={assetID}
          PlayButton={PlayButton}
          withMessageForType={withMessageForType}
          currentPlayingID={currentPlayingID}
        />
      </Modal>
    </>
  );
};

export { ObserveDNAButton };
