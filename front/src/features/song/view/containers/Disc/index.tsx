import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { Song } from 'shared/types';
import { getSongAssetID, getSongColors, getSongID } from 'shared/utils';
import { useStore } from 'store/createStore';

const ClefDisc = dynamic(() => import('./ClefDisc'), { ssr: false });

type Props = {
  song: Song;
  isSaveImage?: boolean;
};

const Disc: FC<Props> = observer(({ song, isSaveImage = false }) => {
  const { turntable, saveDiscImage } = useStore().song;
  const [isPlay, setIsPlay] = useState(false);

  const handleImageReady = (image: string) => saveDiscImage(image);

  useEffect(() => {
    setIsPlay(
      turntable.find((item) => getSongID(item.song) === getSongID(song) && item.status === 'PLAYING') !== undefined
    );
  }, [turntable, song]);

  return (
    <ClefDisc
      assetID={getSongAssetID(song)}
      colors={getSongColors(song)}
      isAnimate={isPlay}
      onImageReady={isSaveImage ? handleImageReady : undefined}
      borderColor="#efefef"
    />
  );
});

export { Disc };
