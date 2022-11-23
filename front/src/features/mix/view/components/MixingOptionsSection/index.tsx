import { FC, PropsWithChildren } from 'react';

import { ArrowLeft } from 'shared/components';

import styles from './mixingOptionsSection.module.scss';

type Props = {
  onBackButtonClick?: () => void;
};

const MixingOptionsSection: FC<PropsWithChildren<Props>> = ({ children, onBackButtonClick }) => (
  <section>
    <button className={styles.backButton} onClick={onBackButtonClick} type="button">
      <ArrowLeft /> Back to mixing deck
    </button>
    <h1 className={styles.title}>Mixing options</h1>
    <div className={styles.discsChains}>{children}</div>
  </section>
);

export { MixingOptionsSection };
