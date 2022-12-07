import { FC, ReactElement } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Preloader } from '../Preloader';
import styles from './listButton.module.scss';

type Props = {
  label: string;
  href?: string;
  value?: string;
  filename?: string;
  icon?: ReactElement;
  isPending?: boolean;
  onClick?: () => void;
  onCopy?: (text: string, result: boolean) => void;
};

const ListButton: FC<Props> = ({
  label,
  href = '',
  value = '',
  filename = '',
  icon = undefined,
  isPending = false,
  onClick,
  onCopy,
}) => (
  <>
    {href !== '' ? (
      <>
        {filename !== '' ? (
          <a className={styles.root} href={href} target="_self" download={filename}>
            {icon}
            {label}
          </a>
        ) : (
          <a className={styles.root} href={href} target="_blank" rel="noopener noreferrer">
            {icon}
            {label}
          </a>
        )}
      </>
    ) : (
      <CopyToClipboard text={value} onCopy={onCopy}>
        <button className={styles.root} onClick={onClick} type="button" disabled={isPending}>
          {isPending ? (
            <div className={styles.preloader}>
              <Preloader isPending />
            </div>
          ) : (
            icon
          )}
          {label}
        </button>
      </CopyToClipboard>
    )}
  </>
);

export { ListButton };
