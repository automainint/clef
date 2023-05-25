import { FC, useState } from 'react';
import cn from 'classnames';

import ClickAwayListener from 'react-click-away-listener';
import { Heart } from '../svg';
import styles from './likeButton.module.scss';

type Props = {
  count?: number | null;
  isLike?: boolean;
  isPending?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const LikeButton: FC<Props> = ({ count = 0, isLike = false, isPending = false, disabled = false, onClick }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [fixPopup, setFixPopup] = useState(false);

  const handlePointerEnter = () => {
    if (fixPopup) return;
    setShowPopup(true);
  };

  const handlePointerLeave = () => {
    if (fixPopup) return;
    setShowPopup(false);
  };

  const handleButtonClick = () => {
    if (showPopup === fixPopup) {
      setShowPopup(!showPopup);
      setFixPopup(!fixPopup);
    } else {
      setShowPopup(showPopup);
      setFixPopup(!fixPopup);
    }
    onClick?.();
  };

  const handleClickAway = () => {
    setShowPopup(false);
    setFixPopup(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={styles.root} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
        {showPopup && count !== null && (
          <div className={styles.popup}>
            <Heart weight="bold" /> <span>{count}</span>
          </div>
        )}
        <button
          className={cn(styles.button, { [styles.buttonFilled]: isLike, [styles.buttonBlinked]: isPending })}
          type="button"
          title="Like"
          disabled={disabled}
          onClick={handleButtonClick}
        >
          <Heart />
        </button>
      </div>
    </ClickAwayListener>
  );
};

export { LikeButton };
