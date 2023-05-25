import Head from 'next/head';

import { ModuleCard } from 'shared/components';
import { NextPageWithLayout } from 'shared/types';
import { routes } from 'shared/constants';

import { Base, Main } from '../shared';
import styles from './mint.module.scss';

const Mint: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Clef - Mint</title>
    </Head>
    <div className={styles.root}>
      <h1 className={styles.title}>Mintplace</h1>
      <div className={styles.mintVariants}>
        <ModuleCard title="Songs" href={routes.mintSongs} buttonText="Mint song" type="songs" />
        <ModuleCard title="Elements" type="elements" />
      </div>
    </div>
  </>
);

Mint.getLayout = (page) => (
  <Base>
    <Main withAssetWallet>{page}</Main>
  </Base>
);

export { Mint };
