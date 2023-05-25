import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { Drawer, Tabs } from 'shared/components';
import { ContainerTypes } from 'shared/types';
import { useStore } from 'store/createStore';

type Props = {
  currentPlayingID: string;
  PlayButton: ContainerTypes['PlayButton'];
  SongCards: ContainerTypes['SongCards'];
};

const AssetsWallet: FC<Props> = observer(({ currentPlayingID, PlayButton, SongCards }) => {
  const { user, selectedAssetsPocket, setAssetsPocket } = useStore().wallet;
  const [allowFetch, setAllowFetch] = useState(false);

  const handleSongsTabClick = () => setAssetsPocket('songs');
  const handleElementsTabClick = () => setAssetsPocket('elements');

  const handleDrawerOpen = () => setAllowFetch(true);

  return (
    <Drawer onOpen={handleDrawerOpen}>
      <Tabs
        tabs={[
          { title: 'My songs', isCurrent: selectedAssetsPocket === 'songs', onClick: handleSongsTabClick },
          {
            title: 'elements',
            isCurrent: selectedAssetsPocket === 'elements',
            isDisabled: true,
            onClick: handleElementsTabClick,
          },
        ]}
      >
        {selectedAssetsPocket === 'songs' ? (
          <SongCards user={user} currentPlayingID={currentPlayingID} PlayButton={PlayButton} allowFetch={allowFetch} />
        ) : (
          <></>
        )}
      </Tabs>
    </Drawer>
  );
});

export { AssetsWallet };
