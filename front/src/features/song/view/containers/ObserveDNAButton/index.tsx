import { FC, useEffect, useState } from 'react';

import { Button, Dna, Modal } from 'shared/components';
import { Song } from 'shared/types';

import { Passport } from '../Passport';

type Props = {
  assetID: string;
  song?: Song;
  isNew?: boolean;
  onClose?: () => void;
};

const ObserveDNAButton: FC<Props> = ({ assetID, song = undefined, isNew = false, onClose }) => {
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
    if (!isNew) return;
    setShowModal(true);
  }, [isNew]);

  return (
    <>
      <Button size="small" onClick={handleDnaClick}>
        <Dna /> Observe DNA
      </Button>
      <Modal isOpen={showModal} onClose={handleModalClose} isManualClosing>
        <Passport assetID={assetID} song={song} isNew={isNew} />
      </Modal>
    </>
  );
};

export { ObserveDNAButton };
