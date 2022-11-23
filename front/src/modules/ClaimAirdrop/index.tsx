import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useStore } from 'store/createStore';
import { ConnectButton } from 'features/wallet';
import { ClaimAirdrop as ClaimAirdropFeature } from 'features/claimAirdrop';
import { NextPageWithLayout } from 'shared/types';
import { Preloader } from 'shared/components';

import { Main } from '../shared';
import styles from './claimAirdrop.module.scss';

type StaticProps = {};

const ClaimAirdrop: NextPageWithLayout<StaticProps> = observer(() => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useStore().wallet;

  const isCorrectID = id !== undefined && !Array.isArray(id);

  useEffect(() => {
    if (!router.isReady) return;
    if (!isCorrectID) router.replace('/');
  }, [isCorrectID, router]);

  return (
    <>
      <Head>
        <title>Clef - Airdrop claiming</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          <h2 className={styles.title}>Airdrop claiming</h2>
          {isCorrectID ? (
            <ClaimAirdropFeature user={user} ConnectButton={ConnectButton} name={id} />
          ) : (
            <div className={styles.preloader}>
              <Preloader isPending />
            </div>
          )}
        </div>
      </div>
    </>
  );
});

ClaimAirdrop.getLayout = (page) => <Main>{page}</Main>;

export { ClaimAirdrop, type StaticProps };
