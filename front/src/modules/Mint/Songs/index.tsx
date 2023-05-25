import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store/createStore';
import { NextPageWithLayout } from 'shared/types';
import { Mintplace } from 'features/song';
import { PlayButton } from 'features/turntable';

import { Base, Main } from '../../shared';
import styles from './songs.module.scss';

const Songs: NextPageWithLayout = observer(() => {
  const { currentPlayingID } = useStore().turntable;

  return (
    <>
      <Head>
        <title>Clef - Mint songs</title>
      </Head>
      <div className={styles.root}>
        <Mintplace currentPlayingID={currentPlayingID} PlayButton={PlayButton} />
      </div>
    </>
  );
});

Songs.getLayout = (page) => (
  <Base>
    <Main withSongMintButton withAssetWallet>
      {page}
    </Main>
  </Base>
);

export { Songs };
