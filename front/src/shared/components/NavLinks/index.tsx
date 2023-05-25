import { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { links } from './constants';
import styles from './navLinks.module.scss';

type Props = {};

const NavLinks: FC<Props> = () => {
  const { route } = useRouter();

  return (
    <ul className={styles.root}>
      {links.map(({ label, href }) => (
        <li key={href} className={styles.item}>
          {label === 'Compose' || label === 'Release' ? (
            <a className={cn(styles.link, styles.linkSoon)} style={{ cursor: 'default' }}>
              {label}
            </a>
          ) : (
            <NextLink href={href}>
              <a className={cn(styles.link, { [styles.linkCurrent]: route.indexOf(href) !== -1 })}>{label}</a>
            </NextLink>
          )}
        </li>
      ))}
    </ul>
  );
};

export { NavLinks };
