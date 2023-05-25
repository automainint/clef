import { FC } from 'react';

import { Info, Reload } from '../svg';

import styles from './launchButton.module.scss';

type Props = {
  text: string;
  info: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

const LaunchButton: FC<Props> = ({ text, info, isDisabled = false, isLoading = false, onClick }) => (
  <div className={styles.root}>
    <button className={styles.button} type="button" disabled={isDisabled || isLoading} onClick={onClick}>
      {text} <Reload rotate={isLoading} size="medium" />
    </button>
    {info !== '' && (
      <p className={styles.desc}>
        <span className={styles.icon}>
          <Info />
        </span>
        {info}
      </p>
    )}
  </div>
);

export { LaunchButton };
