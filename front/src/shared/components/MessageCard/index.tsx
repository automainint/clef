import { FC, ReactNode } from 'react';
import cn from 'classnames';

import { Preloader } from '../Preloader';
import styles from './messageCard.module.scss';

type Props = {
  title?: string;
  desc?: string;
  action?: ReactNode | null;
  contentSize?: 'medium' | 'full-width';
  isPending?: boolean;
};

const MessageCard: FC<Props> = ({
  title = '',
  desc = '',
  action = null,
  contentSize = 'full-width',
  isPending = false,
}) => (
  <div className={cn(styles.root, { [styles.rootCentered]: action === null || isPending })}>
    {isPending ? (
      <Preloader isPending />
    ) : (
      <div className={cn(styles.content, { [styles.contentSizeMedium]: contentSize === 'medium' })}>
        <p className={styles.message}>{title}</p>
        <p className={styles.desc}>{desc}</p>
      </div>
    )}
    {action && <div className={styles.action}>{action}</div>}
  </div>
);

export { MessageCard };
