import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { NextPageWithLayout } from 'shared/types';
import { PlainButton } from 'shared/components';

import { Main } from '../shared';
import { PuzzleHoldersAirdropCard, WCTHoldersAirdropCard } from './components';
import { anchors } from './constants';
import styles from './home.module.scss';

type StaticProps = {};

const Home: NextPageWithLayout<StaticProps> = observer(() => (
  <>
    <Head>
      <title>Clef</title>
    </Head>
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Clef</h1>
        <div className={styles.cards}>
          <div className={styles.card} id={anchors.puzzleHoldersAirdrop}>
            <PuzzleHoldersAirdropCard />
          </div>
          <div className={styles.card} id={anchors.wctHoldersAirdrop}>
            <WCTHoldersAirdropCard />
          </div>
        </div>
      </div>
      <div className={styles.sideBar}>
        <p className={styles.subtitle}>Timeline</p>
        <div className={styles.button}>
          <PlainButton href={`#${anchors.puzzleHoldersAirdrop}`} theme="filledDarkGradient" isAlongEdges>
            33 songs for 33 $PUZZLE
          </PlainButton>
        </div>
        <div className={styles.button}>
          <PlainButton href={`#${anchors.wctHoldersAirdrop}`} theme="borderedDark" isAlongEdges>
            Airdrop for $WCT holders
          </PlainButton>
        </div>
      </div>
    </div>
  </>
));

Home.getLayout = (page) => <Main>{page}</Main>;

export { Home, type StaticProps };
