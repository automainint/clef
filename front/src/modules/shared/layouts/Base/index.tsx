import { FC, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { Wallet } from 'features/wallet';
import { MainBar } from 'shared/components';

import styles from './base.module.scss';

type Props = {
  isAdaptive?: boolean;
};

const Base: FC<PropsWithChildren<Props>> = observer(({ children, isAdaptive = false }) => (
  <div className={cn(styles.root, { [styles.rootAdaptive]: isAdaptive })}>
    <div className={cn(styles.wing, { [styles.wingAdaptive]: isAdaptive })}>
      <div className={cn(styles.colWrapper, { [styles.colWrapperAdaptive]: isAdaptive })}>
        <div className={cn(styles.col, { [styles.colAdaptive]: isAdaptive })}>
          <MainBar />
          <div className={styles.wallet}>
            <Wallet />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.layoutContent}>{children}</div>
  </div>
));

export { Base };
