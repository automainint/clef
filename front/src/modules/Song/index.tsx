import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { NextPageWithLayout } from 'shared/types';
import { Passport } from 'features/song';

import { Preloader } from 'shared/components';
import { Main } from '../shared';
import styles from './song.module.scss';

const Song: NextPageWithLayout = observer(() => {
  const [subtitle, setSubtitle] = useState<string>('');
  const router = useRouter();
  const { id } = router.query;

  const isCorrectID = id !== undefined && !Array.isArray(id);

  const handlePassportLoad = (title: string) => {
    setSubtitle(title);
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!isCorrectID) router.replace('/');
  }, [isCorrectID, router]);

  return (
    <>
      <Head>
        <title>Clef - Song{subtitle && `: ${subtitle}`}</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          {isCorrectID ? (
            <Passport id={id} onLoad={handlePassportLoad} />
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

Song.getLayout = (page) => <Main>{page}</Main>;

export { Song };
