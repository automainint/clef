import { FC, ReactElement } from 'react';
import NextLink from 'next/link';
import cn from 'classnames';

import styles from './moduleCard.module.scss';

type Props = {
  title?: string;
  href?: string;
  buttonText?: string;
  type?: 'songs' | 'elements' | 'none';
};

const ModuleCard: FC<Props> = ({ title = '', href = '', buttonText = '', type = 'none' }) => {
  const card: ReactElement = (
    <div
      className={cn(styles.root, {
        [styles.typeSongs]: type === 'songs',
        [styles.typeElements]: type === 'elements',
        [styles.active]: href !== '',
      })}
    >
      {title !== '' && <p className={styles.title}>{title}</p>}
      {buttonText !== '' && (
        <button className={styles.button} type="button">
          {buttonText}
        </button>
      )}
      {href === '' && <p className={styles.text}>Soon</p>}
    </div>
  );

  return href !== '' ? (
    <NextLink href={href}>
      <a className={styles.link}>{card}</a>
    </NextLink>
  ) : (
    card
  );
};

export { ModuleCard };
