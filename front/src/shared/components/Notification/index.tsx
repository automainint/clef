import { FC, useEffect } from 'react';

import { NotificationStatus } from 'shared/types';

import { Portal } from '../Portal';
import { Success } from '../svg';
import styles from './notification.module.scss';

type Props = {
  notification?: NotificationStatus;
  time?: number;
  onShown?: () => void;
};

const Notification: FC<Props> = ({ notification, time = 1500, onShown }) => {
  useEffect(() => {
    const timer = setTimeout(() => onShown?.(), time);
    return () => {
      clearTimeout(timer);
    };
  }, [onShown, time]);

  return (
    <Portal>
      <div className={styles.root}>
        {notification?.status === 'success' && <Success />}
        {notification?.text}
      </div>
    </Portal>
  );
};

export { Notification };
