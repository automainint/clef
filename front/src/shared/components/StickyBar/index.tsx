import { FC, PropsWithChildren } from 'react';

import styles from './stickyBar.module.scss';

const StickyBar: FC<PropsWithChildren> = ({ children }) => <div className={styles.root}>{children}</div>;

export { StickyBar };
