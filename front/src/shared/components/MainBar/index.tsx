import { FC } from 'react';
import NextLink from 'next/link';

import { Logo } from '../svg';
import { NavLinks } from '../NavLinks';
import styles from './mainBar.module.scss';

type Props = {};

const MainBar: FC<Props> = () => (
  <div className={styles.root}>
    <NextLink href="/">
      <a className={styles.logo}>
        <Logo />
      </a>
    </NextLink>
    <nav className={styles.navLinks}>
      <NavLinks />
    </nav>
  </div>
);

export { MainBar };
