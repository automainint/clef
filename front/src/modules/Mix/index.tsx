import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { useStore } from 'store/createStore';
import { NextPageWithLayout } from 'shared/types';
import { Mix as MixFeature } from 'features/mix';
import { ConnectButton } from 'features/wallet';
import { Disc, ObserveDNAButton } from 'features/song';
import { PlayButton } from 'features/turntable';

import { Base } from '../shared';

type StaticProps = {};

const Mix: NextPageWithLayout<StaticProps> = observer(() => {
  const { user, getBalance, getFreeMixBalance, freeMixBalance } = useStore().wallet;
  const { currentPlayingID } = useStore().turntable;

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
        haveFMT={freeMixBalance !== null && freeMixBalance.amount > 0}
        ConnectButton={ConnectButton}
        PlayButton={PlayButton}
        ObserveDNAButton={ObserveDNAButton}
        Disc={Disc}
        currentPlayingID={currentPlayingID}
        onMix={handleMix}
      />
    </>
  );
});

Mix.getLayout = (page) => <Base>{page}</Base>;

export { Mix, type StaticProps };
