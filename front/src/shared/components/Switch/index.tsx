import { FC, PropsWithChildren, SyntheticEvent } from 'react';
import cn from 'classnames';
import ReactSwitch from 'react-switch';

import styles from './switch.module.scss';

type Props = {
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange: (
    checked: boolean,
    event: MouseEvent | SyntheticEvent<MouseEvent | KeyboardEvent, Event>,
    id: string
  ) => void;
};

const Switch: FC<PropsWithChildren<Props>> = ({ children, isChecked = false, isDisabled = false, onChange }) => (
  <label className={cn(styles.root, { [styles.disabled]: isDisabled })}>
    {children}
    <ReactSwitch checked={isChecked} disabled={isDisabled} onChange={onChange} />
  </label>
);

export { Switch };
