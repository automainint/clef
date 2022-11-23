import { FC } from 'react';

import { Button, Info, Reload } from 'shared/components';

import styles from './mixButton.module.scss';

type Props = {
  text: string;
  info: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

const MixButton: FC<Props> = ({ text, info, isDisabled = false, isLoading = false, onClick }) => (
  <div className={styles.root}>
    <Button isDisabled={isDisabled || isLoading} onClick={onClick}>
      {text} <Reload rotate={isLoading} />
    </Button>
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

export { MixButton };
