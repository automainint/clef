import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { NextPageWithLayout } from 'shared/types';
import { PlainButton } from 'shared/components';
import { ConnectButton } from 'features/wallet';
import { useStore } from 'store/createStore';

import { Base, Main } from '../shared';
import { TrialCard, MixingCard, PuzzleHoldersAirdropCard, WCTHoldersAirdropCard } from './components';
import { anchors } from './constants';
import styles from './home.module.scss';

type StaticProps = {};

const Home: NextPageWithLayout<StaticProps> = observer(() => {
  const { user } = useStore().wallet;

  return (
    <>
      <Head>
        <title>Clef</title>
      </Head>
      <div className={styles.root}>
        <h1 className={styles.title}>Welcome to Clef</h1>
        <div className={styles.cards}>
          <div className={styles.card} id={anchors.trial}>
            <TrialCard />
          </div>
          <div className={styles.card} id={anchors.mixing}>
            <MixingCard ConnectButton={ConnectButton} isAuth={user !== null} />
          </div>
          <div className={styles.card} id={anchors.puzzleHoldersAirdrop}>
            <PuzzleHoldersAirdropCard />
          </div>
          <div className={styles.card} id={anchors.wctHoldersAirdrop}>
            <WCTHoldersAirdropCard />
          </div>
        </div>
      </div>
    </>
  );
});

Home.getLayout = (page) => (
  <Base>
    <Main
      slot={
        <div className={styles.sideBar}>
          <p className={styles.subtitle}>Timeline</p>
          <div className={styles.button}>
            <PlainButton href={`#${anchors.trial}`} theme="filledDarkGradient" isAlongEdges>
              Free trial
            </PlainButton>
          </div>
          <div className={styles.button}>
            <PlainButton href={`#${anchors.mixing}`} theme="borderedDark" isAlongEdges>
              Mixing Added
            </PlainButton>
          </div>
          <div className={styles.button}>
            <PlainButton href={`#${anchors.puzzleHoldersAirdrop}`} theme="borderedDark" isAlongEdges>
              33 songs for 33 $PUZZLE
            </PlainButton>
          </div>
          <div className={styles.button}>
            <PlainButton href={`#${anchors.wctHoldersAirdrop}`} theme="borderedDark" isAlongEdges>
              Airdrop for $WCT holders
            </PlainButton>
          </div>
        </div>
      }
    >
      {page}
    </Main>
  </Base>
);

export { Home, type StaticProps };
