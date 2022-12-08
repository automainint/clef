import { FC, ReactNode } from 'react';
import cn from 'classnames';

import { Check } from '../Check';
import { DiscsChain } from '../DiscsChain';
import styles from './discsChainCard.module.scss';

type Props = {
  desc: string;
  price: string;
  isDiscount?: boolean;
  isChecked?: boolean;
  isBurn?: boolean;
  isDisabled?: boolean;
  switcher?: ReactNode | null;
  onChange?: () => void;
};

const DiscsChainCard: FC<Props> = ({
  desc,
  price,
  isDiscount = false,
  isChecked = false,
  isBurn = false,
  isDisabled = false,
  switcher = null,
  onChange,
}) => (
  <div
    className={cn(styles.root, { [styles.checked]: isChecked }, { [styles.disabled]: isDisabled })}
    onClick={!isDisabled ? onChange : () => {}}
    onKeyDown={() => {}}
    tabIndex={-1}
    role="button"
  >
    <div className={styles.discsChain}>
      <DiscsChain isBurn={isBurn} />
    </div>
    <div className={styles.footer}>
      <p className={styles.desc}>{desc}</p>
      <div className={styles.priceOptions}>
        {switcher}
        <div className={styles.price}>
          {isDiscount && <div className={styles.discount}>Promo</div>}
          <Check isChecked={isChecked} isDisabled={isDisabled} onChange={onChange}>
            {price}
          </Check>
        </div>
      </div>
    </div>
  </div>
);

export { DiscsChainCard };
