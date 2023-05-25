import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ContainerTypes, User } from 'shared/types';
import { getSongAssetID } from 'shared/utils';
import { useStore } from 'store/createStore';

import { Radio as RadioComponent } from '../../components';

type Props = {
  user: User | null;
  Disc: ContainerTypes['Disc'];
  LikeButton: ContainerTypes['LikeButton'];
};

const Radio: FC<Props> = observer(({ user, Disc, LikeButton }) => {
  const {
    currentPlayingID,
    radioSkipStatus,
    radioCrossFade,
    turntable,
    volume,
    play,
    stop,
    next,
    toggleRadioCrossFade,
    setVolume,
  } = useStore().turntable;

  const radioSlot = turntable.find(({ item }) => item.type === 'radio');
  const { item, status } = radioSlot || { item: null, status: null };
  const { song, name } = item?.data && item.type === 'radio' ? item.data : { song: null, name: null };

  const handlePlayClick = async () => {
    try {
      await play({ type: 'radio' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleStopClick = async () => {
    try {
      await stop(item || { type: 'radio' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleNextClick = async () => {
    try {
      await next({ type: 'radio' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleCrossFadeClick = async () => {
    try {
      await toggleRadioCrossFade();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleVolumeChange = async (value: number) => {
    try {
      await setVolume(value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <RadioComponent
      disc={song !== null ? <Disc song={song} isPlaying={currentPlayingID !== ''} isSmall /> : null}
      like={song !== null && user !== null ? <LikeButton user={user} assetID={getSongAssetID(song)} /> : null}
      title={name !== null ? name : ''}
      isPlaying={song !== null && currentPlayingID !== ''}
      isPendingPlay={status === 'RENDERING'}
      isPendingStop={status === 'STOPPING'}
      isPendingNext={radioSkipStatus === 'PENDING'}
      crossFade={radioCrossFade}
      volume={volume}
      onPlayClick={handlePlayClick}
      onStopClick={handleStopClick}
      onNextClick={handleNextClick}
      onCrossFadeClick={handleCrossFadeClick}
      onVolumeChange={handleVolumeChange}
    />
  );
});

export { Radio };
