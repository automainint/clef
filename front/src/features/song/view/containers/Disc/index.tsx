import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { Song } from 'shared/types';
import { getSongAssetID, getSongColors } from 'shared/utils';
import { useStore } from 'store/createStore';

const ClefDisc = dynamic(() => import('./ClefDisc'), { ssr: false });

type Props = {
  song: Song;
  isPlaying: boolean;
  isSaveImage?: boolean;
  isSmall?: boolean;
};

const Disc: FC<Props> = observer(({ song, isPlaying, isSaveImage = false, isSmall = false }) => {
  const { saveDiscImage } = useStore().song;

  const handleImageReady = (image: string) => saveDiscImage(image);

  return (
    <ClefDisc
      assetID={getSongAssetID(song)}
      colors={getSongColors(song)}
      isAnimate={isPlaying}
      onImageReady={isSaveImage ? handleImageReady : undefined}
      borderColor={isSaveImage ? '#efefef' : undefined}
      size={isSmall ? 'small-responsive' : 'normal-responsive'}
    />
  );
});

export { Disc };
