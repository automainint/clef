import { FC } from 'react';

import { ContainerTypes } from 'shared/types';
import { AnnouncementCard, DiscsChain, PlainButton } from 'shared/components';
import { routes } from 'shared/constants';

import styles from './mixingCard.module.scss';

type Props = {
  ConnectButton: ContainerTypes['ConnectButton'];
  isAuth?: boolean;
};

const MixingCard: FC<Props> = ({ ConnectButton, isAuth = false }) => (
  <AnnouncementCard
    title="Mixing is added"
    text="You can now use Clef&#8217;s Mixing Deck. 
      You can purchase genesis melodies to mix on Puzzle Market. 
      In order to see your Clef melodies and to use Clef&#8217;s Mixing Deck — connect your wallet."
    head={
      <div className={styles.discsChain}>
        <DiscsChain isFilled />
      </div>
    }
    buttons={[
      {
        key: 'connect-or-start',
        button: isAuth ? (
          <PlainButton href={routes.mix} theme="borderedLight">
            Start Mixing
          </PlainButton>
        ) : (
          <ConnectButton />
        ),
      },
      {
        key: 'shop-at-market',
        button: (
          <PlainButton href="https://puzzlemarket.org/" isExternal theme="filledLight">
            Shop at Puzzle Market
          </PlainButton>
        ),
      },
    ]}
    theme="blueGradient"
  />
);

export { MixingCard };
