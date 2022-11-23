import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import NextLink from 'next/link';

import { useStore } from 'store/createStore';
import { PlainButton } from 'shared/components';

import styles from './debugPanel.module.scss';

type Props = {};

const DebugPanel: FC<Props> = observer(() => {
  const { user, getBalance } = useStore().wallet;
  const { generateSong, addBalance } = useStore().debug;
  const { getSongs, getCanMintHybrid } = useStore().mix;
  const { volume, setVolume } = useStore().song;
  const [songCount, setSongCount] = useState(0);

  const handleGenerateClick = async () => {
    if (user === null) return;
    await generateSong(user);
    setSongCount(songCount + 1);
  };

  const handleGetFromBackClick = async () => {
    if (user === null) return;
    await getSongs(user);
    setSongCount(0);
  };

  const handleAddBalanceClick = async () => {
    if (user === null) return;
    await addBalance(user);
    await getBalance(user);
    await getCanMintHybrid(user);
  };

  const handleVolumeChange = async ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(currentTarget.value));
  };

  return (
    <div className={styles.root}>
      <p className={styles.title}>Debug panel</p>
      <div className={styles.controls}>
        <div className={styles.buttons}>
          <NextLink href="http://localhost:3000/claim-airdrop/test">
            <a>claim-airdrop/test</a>
          </NextLink>
          <NextLink href="http://localhost:3000/song/6">
            <a>song/6</a>
          </NextLink>
          <NextLink href="http://localhost:3000/song/7">
            <a>song/7</a>
          </NextLink>
          <NextLink href="http://localhost:3000/song/77">
            <a>song/77</a>
          </NextLink>
          <NextLink href="http://localhost:3000/image/6">
            <a>image/6</a>
          </NextLink>
          <NextLink href="http://localhost:3000/image/7">
            <a>image/7</a>
          </NextLink>
          <NextLink href="http://localhost:3000/image/77">
            <a>image/77</a>
          </NextLink>
          <PlainButton onClick={handleGenerateClick} size="small" theme="filledDarkGradient">
            Generate song {songCount !== 0 && <>(new: {songCount})</>}
          </PlainButton>
          <PlainButton onClick={handleGetFromBackClick} size="small" theme="filledDarkGradient">
            Get songs from back_fake
          </PlainButton>
          <PlainButton onClick={handleAddBalanceClick} size="small" theme="filledDarkGradient">
            Add balance
          </PlainButton>
          <div className={styles.volumeLabel}>Volume {volume !== 0 && <>{(volume * 100).toFixed()}%</>}</div>
        </div>
        <div className={styles.volumeBox}>
          <input
            className={styles.range}
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
});

export { DebugPanel };
