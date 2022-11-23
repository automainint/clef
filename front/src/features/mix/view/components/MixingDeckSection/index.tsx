import { forwardRef, PropsWithChildren } from 'react';

import styles from './mixingDeckSection.module.scss';

type Props = {};

const MixingDeckSection = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(({ children }, ref) => (
  <section className={styles.root}>
    <h1 className={styles.title}>Mixing deck</h1>
    <div ref={ref} className={styles.mixingDeck}>
      {children}
    </div>
  </section>
));

export { MixingDeckSection };
