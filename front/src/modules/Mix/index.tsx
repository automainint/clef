import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store/createStore';
import { NextPageWithLayout } from 'shared/types';
import { Mix as MixFeature } from 'features/mix';
import { ConnectButton } from 'features/wallet';
import { Disc, ObserveDNAButton, PlayButton } from 'features/song';

import { Main } from '../shared';

type StaticProps = {};

const Mix: NextPageWithLayout<StaticProps> = observer(() => {
  const { user, getBalance } = useStore().wallet;

  const handleMix = async () => {
    if (user === null) return;
    await getBalance(user);
  };

  return (
    <>
      <Head>
        <title>Clef - Mix</title>
      </Head>
      <MixFeature
        user={user}
        ConnectButton={ConnectButton}
        PlayButton={PlayButton}
        ObserveDNAButton={ObserveDNAButton}
        Disc={Disc}
        onMix={handleMix}
      />
    </>
  );
});

Mix.getLayout = (page) => <Main>{page}</Main>;

export { Mix, type StaticProps };
