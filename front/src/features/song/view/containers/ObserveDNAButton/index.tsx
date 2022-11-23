import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Button, Dna, Modal } from 'shared/components';

import { Passport } from '../Passport';

type Props = {
  id: string;
  isNew?: boolean;
  onClose?: () => void;
};

const ObserveDNAButton: FC<Props> = ({ id, isNew = false, onClose }) => {
  const [modalContainer] = useState(() => document.createElement('div'));
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
    document.body.appendChild(modalContainer);
    return () => {
      document.body.removeChild(modalContainer);
    };
  }, [modalContainer]);

  useEffect(() => {
    if (!isNew) return;
    setShowModal(true);
  }, [isNew]);

  return (
    <>
      <Button size="small" onClick={handleDnaClick}>
        <Dna /> Observe DNA
      </Button>
      {ReactDOM.createPortal(
        <Modal isOpen={showModal} onClose={handleModalClose} isManualClosing>
          <Passport id={id} isNew={isNew} />
        </Modal>,
        modalContainer
      )}
    </>
  );
};

export { ObserveDNAButton };
