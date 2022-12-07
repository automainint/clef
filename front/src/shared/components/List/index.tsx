import { forwardRef, ReactNode } from 'react';

import styles from './list.module.scss';

type Props = {
  items: { key: string; item: ReactNode }[];
};

const List = forwardRef<HTMLUListElement, Props>(({ items }, ref) => (
  <ul ref={ref} className={styles.root}>
    {items.map(({ key, item }) => (
      <li key={key}>{item}</li>
    ))}
  </ul>
));

export { List };
