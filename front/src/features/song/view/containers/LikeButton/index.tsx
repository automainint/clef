import { observer } from 'mobx-react-lite';
import { FC, useEffect, useCallback } from 'react';

import { LikeButton as LikeButtonComponent } from 'shared/components';
import { usePreloader } from 'shared/hooks';
import { isErrorWithMessage, User } from 'shared/types';
import { useStore } from 'store/createStore';

type Props = {
  user: User | null;
  assetID: string;
  withCount?: boolean;
  allowAutoFetchList?: boolean;
};

const LikeButton: FC<Props> = observer(({ user, assetID, withCount = false, allowAutoFetchList = true }) => {
  const { likesList, topList, getLikesList, getTopList, setMustRefetchTopSongs, setMustRefetchLikesSongs, like } =
    useStore().song;
  const { isPending, setLoadingStatus } = usePreloader('', false);

  const likesCount = topList.find(({ asset_id: _assetID }) => _assetID === assetID)?.likes;

  const fetchLists = useCallback(async () => {
    if (user === null) return;
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await getTopList();
      await getLikesList(user);
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
  }, [user, getLikesList, getTopList, setLoadingStatus]);

  const handleLikeClick = async () => {
    if (user === null) return;
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await like(user, assetID);
      await fetchLists();
      setMustRefetchTopSongs(true);
      setMustRefetchLikesSongs(true);
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

  useEffect(() => {
    if (!allowAutoFetchList) return;
    fetchLists();
  }, [allowAutoFetchList, fetchLists]);

  return (
    <LikeButtonComponent
      isLike={likesList.includes(assetID)}
      count={withCount ? likesCount || 0 : null}
      isPending={isPending}
      onClick={handleLikeClick}
    />
  );
});

export { LikeButton };
