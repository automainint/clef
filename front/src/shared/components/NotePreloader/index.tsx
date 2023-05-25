import Image from 'next/image';
import { FC } from 'react';

import Note from './images/note.svg';
import styles from './notePreloader.module.scss';

type Props = {
  isPending?: boolean;
  error?: string;
};

const NotePreloader: FC<Props> = ({ isPending = false, error = '' }) => (
  <div className={styles.root}>
    {isPending && !error && (
      <Image className={styles.image} src={Note} width={63} height={63} alt="Loading..." draggable={false} />
    )}
    {error && <span>Error: {error}</span>}
  </div>
);

export { NotePreloader };
