import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './drawer.module.scss';
import { minHeight, scrollBlinkOffset } from './constants';

type Props = {
  onOpen?: () => void;
};

const Drawer: FC<PropsWithChildren<Props>> = ({ children, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const rootRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setIsOpen(!isOpen);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rootRef.current === null) return;
      const { offsetWidth, offsetTop } = rootRef.current;
      const height = document.documentElement.clientHeight - offsetTop - 1;
      if (offsetWidth === size.width && height === size.height) return;
      setSize({
        width: offsetWidth - scrollBlinkOffset,
        height: height >= minHeight ? height - scrollBlinkOffset : size.height,
      });
    });

    return () => clearInterval(interval);
  }, [size.width, size.height]);

  useEffect(() => {
    if (!isOpen) return;
    onOpen?.();
  }, [isOpen, onOpen]);

  return (
    <div ref={rootRef} className={styles.root}>
      {size.width > 0 && size.height > 0 && (
        <div className={styles.drawerWrapper} style={{ width: `${size.width}px` }}>
          <div className={cn(styles.drawer, { [styles.drawerOpen]: isOpen })} style={{ height: `${size.height}px` }}>
            <input className={cn(styles.button, { [styles.buttonOpen]: isOpen })} type="button" onClick={handleClick} />
            <div className={styles.contentWrapper}>
              <div className={styles.content} style={{ width: `${size.width}px`, height: `${size.height}px` }}>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Drawer };
