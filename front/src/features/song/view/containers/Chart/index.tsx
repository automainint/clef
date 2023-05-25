import { observer } from 'mobx-react-lite';
import { FC, useState, useEffect } from 'react';

import { NotePreloader, Tabs } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { ContainerTypes, isErrorWithMessage, User } from 'shared/types';
import { useStore } from 'store/createStore';

import { LikesList } from '../LikesList';
import { TopList } from '../TopList';
import styles from './chart.module.scss';

type Props = {
  user: User | null;
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
};

const Chart: FC<Props> = observer(({ user, currentPlayingID, PlayButton }) => {
  const { likesList, getTopList, getLikesList } = useStore().song;
  const { isPending, error, setLoadingStatus } = usePreloader('', true);
  const [tab, setTab] = useState<'top' | 'likes'>('top');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTopList();
        if (user !== null) await getLikesList(user);
        setLoadingStatus({ isPending: false, error: '' });
      } catch (err) {
        setLoadingStatus({ isPending: false, error: 'something went wrong' });
        if (isErrorWithMessage(err)) {
          // eslint-disable-next-line no-console
          console.log(`Error: ${err.message}`);
        } else {
          // eslint-disable-next-line no-console
          console.log(`Unknown error: ${JSON.stringify(err)}`);
        }
      }
    };

    fetchData();
  }, [user, getTopList, getLikesList, setLoadingStatus]);

  return (
    <Tabs
      tabs={[
        { title: 'Top songs', isCurrent: tab === 'top', onClick: () => setTab('top') },
        {
          title: 'My likes',
          isCurrent: tab === 'likes',
          isDisabled: user === null || likesList.length === 0,
          onClick: () => setTab('likes'),
        },
      ]}
      tabsType="module"
    >
      {isPending || error ? (
        <div className={styles.preloader}>
          <NotePreloader isPending={isPending} error={error} />
        </div>
      ) : (
        <>
          {tab === 'top' && <TopList user={user} currentPlayingID={currentPlayingID} PlayButton={PlayButton} />}
          {tab === 'likes' && <LikesList user={user} currentPlayingID={currentPlayingID} PlayButton={PlayButton} />}
        </>
      )}
    </Tabs>
  );
});

export { Chart };
