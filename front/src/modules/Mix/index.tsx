import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store/createStore';
import { NextPageWithLayout } from 'shared/types';
import { Mix as MixFeature } from 'features/mix';
import { ConnectButton } from 'features/wallet';
import { Disc, ObserveDNAButton, PlayButton } from 'features/song';

import { MainNotAdaptive } from '../shared';

type StaticProps = {};

const Mix: NextPageWithLayout<StaticProps> = observer(() => {
  const { user, getBalance, getFreeMixBalance, freeMixBalance } = useStore().wallet;

  const handleMix = async () => {
    if (user === null) return;
    await getBalance(user);
    await getFreeMixBalance(user);
  };

  return (
    <>
      <Head>
        <title>Clef - Mix</title>
      </Head>
      <MixFeature
        user={user}
        haveFMT={freeMixBalance > 0}
        ConnectButton={ConnectButton}
        PlayButton={PlayButton}
        ObserveDNAButton={ObserveDNAButton}
        Disc={Disc}
        onMix={handleMix}
      />
    </>
  );
});

Mix.getLayout = (page) => <MainNotAdaptive>{page}</MainNotAdaptive>;

export { Mix, type StaticProps };
