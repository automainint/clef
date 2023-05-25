import { FC, InputHTMLAttributes, PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './radioBox.module.scss';

type Props = { hidden?: boolean } & InputHTMLAttributes<HTMLInputElement>;

const RadioBox: FC<PropsWithChildren<Props>> = ({ name, value, checked, children, hidden = false, onChange }) => (
  <label className={styles.root}>
    <input
      className={cn(styles.radio, { [styles.radioHidden]: hidden })}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    {children}
  </label>
);

export { RadioBox };
