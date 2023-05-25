import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store/createStore';
import { NextPageWithLayout } from 'shared/types';
import { SelectToMint } from 'features/element';
import { NotePreloader } from 'shared/components';

import { Base, Main } from '../../shared';
import styles from './elements.module.scss';

const Elements: NextPageWithLayout = observer(() => {
  const { isMintPending } = useStore().element;

  return (
    <>
      <Head>
        <title>Clef - Mint elements</title>
      </Head>
      <div className={styles.root}>
        <h2 className={styles.title}>{isMintPending ? 'Please wait...' : 'Choose an element to mint'}</h2>
        {isMintPending ? <NotePreloader isPending={isMintPending} /> : <SelectToMint />}
      </div>
    </>
  );
});

Elements.getLayout = (page) => (
  <Base>
    <Main withElementMintButton withAssetWallet>
      {page}
    </Main>
  </Base>
);

export { Elements };
