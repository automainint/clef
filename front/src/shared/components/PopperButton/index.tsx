import { FC, PropsWithChildren, ReactElement, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

import { Button } from '../Button';
import styles from './popperButton.module.scss';

type Props = {
  icon: ReactElement;
  label: string;
};

const PopperButton: FC<PropsWithChildren<Props>> = ({ icon, label, children }) => {
  const [isShowPopper, setIsShowPopper] = useState(false);

  const handleButtonClick = () => setIsShowPopper(!isShowPopper);

  const handleClickAway = () => setIsShowPopper(false);

  return (
    <div className={styles.root}>
      <Button size="small" onClick={handleButtonClick}>
        {icon} {label}
      </Button>
      {isShowPopper && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={styles.popper}>{children}</div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export { PopperButton };
