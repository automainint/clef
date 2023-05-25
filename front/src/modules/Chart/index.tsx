import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { NextPageWithLayout } from 'shared/types';
import { Chart as ChartContainer } from 'features/song';
import { useStore } from 'store/createStore';
import { PlayButton } from 'features/turntable';

import { Base, Main } from '../shared';
import styles from './chart.module.scss';

const Chart: NextPageWithLayout = observer(() => {
  const { user } = useStore().wallet;
  const { currentPlayingID } = useStore().turntable;

  return (
    <>
      <Head>
        <title>Clef - Mix</title>
      </Head>
      <div className={styles.root}>
        <h1 className={styles.title}>Radio chart</h1>
        <ChartContainer user={user} currentPlayingID={currentPlayingID} PlayButton={PlayButton} />
      </div>
    </>
  );
});

Chart.getLayout = (page) => (
  <Base>
    <Main withAssetWallet>{page}</Main>
  </Base>
);

export { Chart };
