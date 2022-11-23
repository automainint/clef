import { FC, PropsWithChildren, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './check.module.scss';

type Props = {
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Check: FC<PropsWithChildren<Props>> = ({ children, isChecked = false, isDisabled = false, onChange }) => (
  <label className={cn(styles.root, { [styles.disabled]: isDisabled })}>
    {children}
    <input className={styles.check} type="checkbox" checked={isChecked} disabled={isDisabled} onChange={onChange} />
  </label>
);

export { Check };
