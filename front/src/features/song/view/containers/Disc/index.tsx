import html2canvas from 'html2canvas';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';

import { Disc as DiscComponent } from 'shared/components';
import { isErrorWithMessage, Song } from 'shared/types';
import { getSongColors, getSongID } from 'shared/utils';
import { useStore } from 'store/createStore';

type Props = {
  song: Song;
  isSaveImage?: boolean;
};

const Disc: FC<Props> = observer(({ song, isSaveImage = false }) => {
  const { turntable, saveDiscImage } = useStore().song;
  const [isPlay, setIsPlay] = useState(false);
  const discContainerRef = useRef<HTMLDivElement>(null);

  const handleRendered = async () => {
    if (!isSaveImage || discContainerRef.current === null) return;
    try {
      const canvas = await html2canvas(discContainerRef.current, { backgroundColor: 'rgba(0, 0, 0, 0)' });
      saveDiscImage(canvas.toDataURL('image/png', 0.9));
    } catch (error) {
      if (isErrorWithMessage(error)) {
        // eslint-disable-next-line no-console
        console.log(`Error: ${error.message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Unknown render image error: ${JSON.stringify(error)}`);
      }
    }
  };

  useEffect(() => {
    setIsPlay(
      turntable.find((item) => getSongID(item.song) === getSongID(song) && item.status === 'PLAYING') !== undefined
    );
  }, [turntable, song]);

  return (
    <DiscComponent ref={discContainerRef} isAnimate={isPlay} colors={getSongColors(song)} onRendered={handleRendered} />
  );
});

export { Disc };
