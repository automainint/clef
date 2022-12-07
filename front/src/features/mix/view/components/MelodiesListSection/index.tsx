import { FC, PropsWithChildren, ReactElement } from 'react';

import { MessageCard, PlainButton } from 'shared/components';
import { ContainerTypes } from 'shared/types';

import styles from './melodiesListSection.module.scss';

type MelodiesList = {
  id: string;
  melody: ReactElement;
}[];

type Props = {
  melodies: MelodiesList;
  ConnectButton: ContainerTypes['ConnectButton'];
  isAuth?: boolean;
};

const MelodiesListSection: FC<PropsWithChildren<Props>> = ({ children, melodies, ConnectButton, isAuth = false }) => (
  <section className={styles.root}>
    <h2 className={styles.title}>Your songs</h2>
    {!isAuth ? (
      <MessageCard
        title="You are not authorized yet"
        desc="To use Clef's Mixing Deck connect your wallet"
        action={<ConnectButton isInvert />}
      />
    ) : (
      <>
        {!melodies || melodies.length === 0 ? (
          <MessageCard
            title="No melodies in your wallet yet"
            desc="For now, you can purchase the melodies on Puzzle Market"
            action={
              <PlainButton
                href="https://puzzlemarket.org/collection/3P4m4beJ6p1pMPHqCQMAXEdquUuXJz72CMe/Clef%20genesis%20songs"
                isExternal
                theme="filledDark"
              >
                Shop at Puzzle Market
              </PlainButton>
            }
          />
        ) : (
          <ul className={styles.melodies}>
            {melodies.map(({ id, melody }) => (
              <li key={id} className={styles.melodyCard}>
                {melody}
              </li>
            ))}
          </ul>
        )}
        {children}
      </>
    )}
  </section>
);

export { MelodiesListSection };
