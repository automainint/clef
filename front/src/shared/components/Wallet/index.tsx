import { FC, useEffect, useState, PointerEvent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NextImage from 'next/image';
import * as identityImg from 'identity-img';
import cn from 'classnames';

import { Currency } from 'shared/types';

import { Settings } from '../svg';
import styles from './wallet.module.scss';

type Props = {
  address: string;
  explorerURL: string;
  currencies: Currency[];
  onDisconnectClick?: () => void;
};

const Wallet: FC<Props> = ({ address, explorerURL, currencies, onDisconnectClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSettingsClick = (e: PointerEvent<HTMLButtonElement>) => {
    setMenuOpen(!menuOpen);
    e.stopPropagation();
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setMenuOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener('click', () => setMenuOpen(false));
    document.addEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.ava}>
          <NextImage
            src={identityImg.create(address, { size: 64, rows: 8, cells: 8 })}
            width={24}
            height={24}
            alt="Avatar"
          />
        </div>
        <div className={styles.address}>{`${address.slice(0, 3)}...${address.slice(address.length - 4)}`}</div>
        <button className={styles.settings} type="button" onClick={handleSettingsClick}>
          <Settings />
        </button>
        {menuOpen && (
          <div className={styles.menu}>
            <CopyToClipboard text={address}>
              <button className={styles.menuItem} type="button">
                Copy address
              </button>
            </CopyToClipboard>
            <a className={styles.menuItem} href={explorerURL} target="_blank" rel="noopener noreferrer">
              Open in Waves Explorer
            </a>
            <button
              className={cn(styles.menuItem, styles.menuItemWithSeparator)}
              type="button"
              onClick={onDisconnectClick}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
      <div className={styles.currencies}>
        {currencies.map(({ label, value }) => (
          <div key={label + value} className={styles.currency}>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Wallet };
