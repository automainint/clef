import { FC, PropsWithChildren, ReactElement } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store/createStore';
import { AssetsWallet } from 'features/wallet';
import { MintButton as SongMintButton, Cards, Disc, LikeButton } from 'features/song';
import { MintButton as ElementMintButton } from 'features/element';
import { PlayButton, Radio } from 'features/turntable';

import styles from './main.module.scss';

type Props = {
  slot?: ReactElement | null;
  withSongMintButton?: boolean;
  withElementMintButton?: boolean;
  withAssetWallet?: boolean;
};

const Main: FC<PropsWithChildren<Props>> = observer(
  ({ children, slot = null, withSongMintButton = false, withElementMintButton = false, withAssetWallet = false }) => {
    const { user } = useStore().wallet;
    const { currentPlayingID } = useStore().turntable;
    const { mintableSongsWithInfo } = useStore().song;

    return (
      <div className={styles.root}>
        <main className={styles.main}>{children}</main>
        <div className={styles.wing}>
          <div className={styles.colWrapper}>
            <div className={styles.radio}>
              <Radio user={user} Disc={Disc} LikeButton={LikeButton} />
            </div>
          </div>
          {withAssetWallet && user !== null && (
            <div className={styles.assetsWallet}>
              <AssetsWallet currentPlayingID={currentPlayingID} PlayButton={PlayButton} SongCards={Cards} />
            </div>
          )}
          {withElementMintButton && user !== null && (
            <div className={styles.colWrapper}>
              <div className={styles.mintButton}>
                <ElementMintButton user={user} PlayButton={PlayButton} />
                <SongMintButton user={user} currentPlayingID={currentPlayingID} PlayButton={PlayButton} />
              </div>
            </div>
          )}
          {withSongMintButton && mintableSongsWithInfo.length > 0 && user !== null && (
            <div className={styles.colWrapper}>
              <div className={styles.mintButton}>
                <SongMintButton user={user} currentPlayingID={currentPlayingID} PlayButton={PlayButton} />
              </div>
            </div>
          )}
          {slot !== null && <div className={styles.colWrapper}>{slot}</div>}
        </div>
      </div>
    );
  }
);

export { Main };
