import { FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react';

import styles from './modal.module.scss';

type Props = {
  isOpen: boolean;
  isManualClosing?: boolean;
  withoutCloseButton?: boolean;
  onClose: () => void;
};

const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  isOpen = false,
  isManualClosing = false,
  withoutCloseButton = false,
  onClose,
}) => {
  const closeRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyPress);
    } else if (!isManualClosing) {
      document.body.style.overflow = '';
    }
  }, [isOpen, isManualClosing, handleKeyPress]);

  return (
    <>
      {isOpen && (
        <div className={styles.root} onClick={onClose} onKeyDown={() => {}} tabIndex={-1} role="button">
          <div className={styles.wrapper}>
            <div
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={() => {}}
              tabIndex={-1}
              role="button"
            >
              {!withoutCloseButton && (
                <input
                  ref={closeRef}
                  className={styles.cross}
                  type="button"
                  onClick={onClose}
                  onBlur={(e) => e.currentTarget.focus()}
                />
              )}
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Modal };
