import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { Play, Stop, PushButton } from 'shared/components';
import { PlayableResource, Theme } from 'shared/types';
import { useStore } from 'store/createStore';

import { getID } from '../../../utils';

type Props = {
  playableResource: PlayableResource;
  theme?: Theme;
};

const PlayButton: FC<Props> = observer(({ playableResource, theme = 'light' }) => {
  const { turntable, play, stop } = useStore().turntable;
  const [isRender, setIsRender] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  const handlePlayClick = async () => {
    if (turntable.find(({ item }) => item.type === 'resource' && getID(item.data) === getID(playableResource))) {
      try {
        await stop({ type: 'resource', data: playableResource });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } else {
      try {
        await play({ type: 'resource', data: playableResource });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setIsRender(
      turntable.find(
        ({ item, status }) =>
          item.type === 'resource' && getID(item.data) === getID(playableResource) && status === 'RENDERING'
      ) !== undefined
    );
    setIsPlay(
      turntable.find(
        ({ item, status }) =>
          item.type === 'resource' && getID(item.data) === getID(playableResource) && status === 'PLAYING'
      ) !== undefined
    );
  }, [turntable, playableResource]);

  return (
    <PushButton theme={theme} isLoading={isRender} onClick={handlePlayClick}>
      {isPlay ? (
        <>
          <Stop theme={theme} /> Stop
        </>
      ) : (
        <>
          <Play theme={theme} /> Play
        </>
      )}
    </PushButton>
  );
});

export { PlayButton };
