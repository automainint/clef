import { FC } from 'react';
import cn from 'classnames';

import { ArrowRight, Plus } from '../svg';
import styles from './discsChain.module.scss';

type Props = {
  isFilled?: boolean;
  isBurn?: boolean;
};

const DiscsChain: FC<Props> = ({ isFilled = false, isBurn = false }) => (
  <div className={styles.root}>
    <div className={cn(styles.disc, { [styles.discFilled]: isFilled, [styles.discBurn]: isBurn })} />
    <Plus isInvert={isFilled} />
    <div className={cn(styles.disc, { [styles.discFilled]: isFilled, [styles.discBurn]: isBurn })} />
    <ArrowRight isInvert={isFilled} />
    <div className={cn(styles.disc, { [styles.discFilled]: isFilled })} />
  </div>
);

export { DiscsChain };
