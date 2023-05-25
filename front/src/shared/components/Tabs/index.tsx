import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './tabs.module.scss';

type Props = {
  tabs: {
    title: string;
    isCurrent?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
  }[];
  tabsType?: 'widget' | 'module';
};

const Tabs: FC<PropsWithChildren<Props>> = ({ children, tabs, tabsType = 'widget' }) => {
  const [contentHeight, setContentHeight] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsType === 'module') return;
    const interval = setInterval(() => {
      if (rootRef.current === null || tabsRef.current === null) return;
      const height = rootRef.current.offsetHeight - tabsRef.current.offsetHeight;
      if (height === contentHeight) return;
      setContentHeight(height);
    });

    return () => clearInterval(interval);
  }, [contentHeight, tabsType]);

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={tabsRef} className={cn(styles.tabs, { [styles.tabsTypeModule]: tabsType === 'module' })}>
        {tabs.map(({ title, isCurrent, isDisabled, onClick }) => (
          <button
            key={title}
            className={cn(
              styles.button,
              { [styles.buttonTypeModule]: tabsType === 'module' },
              { [styles.buttonSelected]: isCurrent },
              { [styles.buttonDisabled]: isDisabled }
            )}
            type="button"
            disabled={isDisabled || isCurrent}
            onClick={onClick}
          >
            {title}
          </button>
        ))}
      </div>
      <div className={styles.content} style={{ height: tabsType === 'widget' ? `${contentHeight}px` : undefined }}>
        {children}
      </div>
    </div>
  );
};

export { Tabs };
