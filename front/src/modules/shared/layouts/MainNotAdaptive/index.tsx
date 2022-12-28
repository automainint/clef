import { FC, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

import { Wallet } from 'features/wallet';
import { DebugPanel } from 'features/debug';
import { MainBar } from 'shared/components';

import styles from './mainNotAdaptive.module.scss';

type Props = {};

const MainNotAdaptive: FC<PropsWithChildren<Props>> = observer(({ children }) => (
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

export { MainNotAdaptive };
