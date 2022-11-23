import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { Button, Play, Stop } from 'shared/components';
import { Song } from 'shared/types';
import { getSongID } from 'shared/utils';
import { useStore } from 'store/createStore';

type Props = {
  song: Song;
};

const PlayButton: FC<Props> = observer(({ song }) => {
  const { turntable, stopSong, playSong } = useStore().song;
  const [isRender, setIsRender] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const handlePlayClick = () => {
    if (turntable.find((item) => getSongID(item.song) === getSongID(song))) stopSong(song);
    else playSong(song);
  };

  useEffect(() => {
    setIsRender(
      turntable.find((item) => getSongID(item.song) === getSongID(song) && item.status === 'RENDERING') !== undefined
    );
    setIsPlay(
      turntable.find((item) => getSongID(item.song) === getSongID(song) && item.status === 'PLAYING') !== undefined
    );
  }, [turntable, song]);

  return (
    <Button isLoading={isRender} size="small" onClick={handlePlayClick}>
      {isPlay ? (
        <>
          <Stop /> Stop
        </>
      ) : (
        <>
          <Play /> Play
        </>
      )}
    </Button>
  );
});

export { PlayButton };
