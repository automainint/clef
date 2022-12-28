import { FC, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

import { Wallet } from 'features/wallet';
import { MainBar } from 'shared/components';

import styles from './main.module.scss';

type Props = {};

const Main: FC<PropsWithChildren<Props>> = observer(({ children }) => (
  <div className={styles.root}>
    <div className={styles.mainBar}>
      <MainBar />
      <div className={styles.wallet}>
        <Wallet />
      </div>
    </div>
    <main className={styles.main}>{children}</main>
  </div>
));

export { Main };
