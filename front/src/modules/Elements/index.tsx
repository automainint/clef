import Head from 'next/head';

import { ElementResource, NextPageWithLayout } from 'shared/types';
import { getAllElements, getElementLabel, getSongID } from 'shared/utils';
import { PlayButton } from 'features/turntable';

import { Base } from '../shared';
import styles from './elements.module.scss';

const Elements: NextPageWithLayout = () => {
  const elements: ElementResource[] = getAllElements();

  return (
    <>
      <Head>
        <title>Clef - Elements</title>
      </Head>
      <div className={styles.root}>
        <div className={styles.content}>
          <h2 className={styles.title}>Elements</h2>
          {!elements ? (
            <p>No elements</p>
          ) : (
            <ul className={styles.elements}>
              {elements.map((element) => (
                //  FIXME
                //  Add function to get element id. - Mitya Selivanov
                <li className={styles.element} key={getElementLabel(element) + getSongID(element)}>
                  <PlayButton playableResource={element} />
                  <p>{getElementLabel(element)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

Elements.getLayout = (page) => <Base>{page}</Base>;

export { Elements };
