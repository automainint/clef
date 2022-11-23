import { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import { ArrowUp } from 'shared/components';

import styles from './anchorButton.module.scss';

type Props = {
  hidden?: boolean;
  onClick?: () => void;
};

const AnchorButton: FC<PropsWithChildren<Props>> = ({ children, hidden = undefined, onClick }) => (
  <button
    className={cn(styles.root, { [styles.visible]: hidden === false, [styles.hidden]: hidden })}
    style={{ transition: hidden === undefined ? 'none' : '' }}
    disabled={hidden}
    onClick={onClick}
    type="button"
  >
    <div className={styles.wrapper}>
      <p className={styles.label}>
        Back the mixing deck <ArrowUp />
      </p>
      <div className={styles.mixingDeck}>{children}</div>
    </div>
  </button>
);

export { AnchorButton };
