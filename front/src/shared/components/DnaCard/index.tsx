import { FC, ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';
import NextLink from 'next/link';

import { InstrumentLine, ResourceType, Theme } from 'shared/types';
import { mobileMaxWidthBP } from 'shared/constants';

import { Chords } from '../Chords';
import { Instruments } from '../Instruments';
import { ArrowExternal, CircleCheck, Logo } from '../svg';
import { messages } from './constants';
import styles from './dnaCard.module.scss';

type Props = {
  slotElement: ReactNode;
  title: string;
  desc: string;
  id: string;
  url: string;
  melodyKey?: string;
  family?: string;
  tempo?: string;
  length?: string;
  meter?: string;
  accentColor?: string;
  generation?: string;
  chordNames?: string[];
  chords?: number[][];
  instruments?: InstrumentLine[];
  buttons?: { key: string; button: ReactNode; size?: 'small' | 'middle' }[];
  rarity?: ReactNode | null;
  withMessageForType?: ResourceType | null;
  theme?: Theme;
};

const DnaCard: FC<Props> = ({
  slotElement,
  title,
  desc,
  id,
  url,
  melodyKey = '',
  family = '',
  tempo = '',
  length = '',
  meter = '',
  generation = '',
  accentColor = '',
  chordNames = [],
  chords = [],
  instruments = [],
  buttons = [],
  rarity = null,
  withMessageForType = null,
  theme = 'light',
}) => {
  const [assetID, setAssetID] = useState(id);

  useEffect(() => {
    if (!window) return;
    const defineAssetIDStr = () => {
      if (window.screen.width > mobileMaxWidthBP) setAssetID(id);
      else setAssetID(`${id.substring(0, 8)}...${id.substring(id.length - 8)}`);
    };
    defineAssetIDStr();
    window.addEventListener('resize', defineAssetIDStr);
    return () => window.removeEventListener('resize', defineAssetIDStr);
  }, [id]);

  return (
    <div
      className={styles.root}
      style={{
        backgroundImage: accentColor ? `linear-gradient(180deg, #333333 0%, ${accentColor} 92.71%` : 'none',
        backgroundColor: accentColor ? 'transparent' : undefined,
      }}
    >
      {withMessageForType !== null && (
        <div className={cn(styles.message, { [styles.messageThemeDark]: theme === 'dark' })}>
          <div className={styles.messageIcon}>
            <CircleCheck theme={theme} />
          </div>
          <div className={styles.messageText}>
            <p className={cn(styles.messageTitle, { [styles.messageTitleThemeDark]: theme === 'dark' })}>
              {messages[withMessageForType]?.title}
            </p>
            <p className={styles.messageDesc}>{messages[withMessageForType]?.desc}</p>
          </div>
        </div>
      )}
      <div className={cn(styles.header, { [styles.headerThemeDark]: theme === 'dark' })}>
        <NextLink href="/">
          <a className={styles.logo}>
            <Logo />
          </a>
        </NextLink>
        <div className={styles.slotElement}>{slotElement}</div>
        <div className={styles.info}>
          <p className={cn(styles.desc, styles.descMobileLarge)}>{desc}</p>
          <p className={styles.title} style={{ color: accentColor }}>
            {title}
          </p>
          {buttons.length > 0 && (
            <div className={styles.buttons}>
              {buttons.map(({ key, button, size }) => (
                <div key={key} className={cn(styles.button, { [styles.buttonSizeMiddle]: size === 'middle' })}>
                  {button}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.passport}>
        <div className={styles.details}>
          {melodyKey !== '' && (
            <div className={styles.detailsItem}>
              <p className={cn(styles.desc, { [styles.descThemeDark]: theme === 'dark' })}>Key</p>
              <p className={cn(styles.detailsValue, { [styles.detailsValueThemeDark]: theme === 'dark' })}>
                {melodyKey}
              </p>
            </div>
          )}
          {family !== '' && (
            <div className={styles.detailsItem}>
              <p className={cn(styles.desc, { [styles.descThemeDark]: theme === 'dark' })}>Family</p>
              <p className={cn(styles.detailsValue, { [styles.detailsValueThemeDark]: theme === 'dark' })}>{family}</p>
            </div>
          )}
          {tempo !== '' && (
            <div className={styles.detailsItem}>
              <p className={cn(styles.desc, { [styles.descThemeDark]: theme === 'dark' })}>Tempo</p>
              <p className={cn(styles.detailsValue, { [styles.detailsValueThemeDark]: theme === 'dark' })}>{tempo}</p>
            </div>
          )}
          {length !== '' && (
            <div className={styles.detailsItem}>
              <p className={cn(styles.desc, { [styles.descThemeDark]: theme === 'dark' })}>Length</p>
              <p className={cn(styles.detailsValue, { [styles.detailsValueThemeDark]: theme === 'dark' })}>{length}</p>
            </div>
          )}
          {meter !== '' && (
            <div className={styles.detailsItem}>
              <p className={cn(styles.desc, { [styles.descThemeDark]: theme === 'dark' })}>Meter</p>
              <p className={cn(styles.detailsValue, { [styles.detailsValueThemeDark]: theme === 'dark' })}>{meter}</p>
            </div>
          )}
          {generation !== '' && (
            <div className={styles.detailsItem}>
              <p className={styles.desc}>Gen.</p>
              <p className={styles.detailsValue}>{generation}</p>
            </div>
          )}
          {rarity}
        </div>
        <div className={styles.idSection}>
          <p className={cn(styles.subtitle, { [styles.subtitleThemeDark]: theme === 'dark' })}>ID</p>
          <a
            className={cn(styles.idLink, { [styles.idLinkThemeDark]: theme === 'dark' })}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {assetID} <ArrowExternal />
          </a>
        </div>
        {chordNames.length > 0 && chords.length > 0 && (
          <div className={styles.chordsSection}>
            <p className={styles.subtitle}>Chord progression</p>
            <div className={styles.chords}>
              <Chords names={chordNames} chords={chords} />
            </div>
          </div>
        )}
        {instruments.length > 0 && (
          <div className={styles.instrumentsSection}>
            <p className={styles.subtitle}>Instruments</p>
            <div className={styles.instruments}>
              <Instruments instruments={instruments} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { DnaCard };
