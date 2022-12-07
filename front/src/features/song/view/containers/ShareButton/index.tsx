import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';

import {
  Copy,
  Share,
  List,
  ListButton,
  Notification,
  Twitter,
  Telegram,
  Download,
  PopperButton,
} from 'shared/components';
import { environments, routes } from 'shared/constants';
import { isErrorWithMessage, NotificationStatus, Song } from 'shared/types';
import { getSongAssetID, getSongLabel } from 'shared/utils';
import { useStore } from 'store/createStore';

type Props = {
  song: Song;
};

const ShareButton: FC<Props> = observer(({ song }) => {
  const { discImage, renderWAV, songWAV } = useStore().song;
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [notification, setNotification] = useState<NotificationStatus>();
  const [isRenderingWAV, setIsRenderingWAV] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const title = getSongLabel(song);
  const link = `${environments.host}${routes.song}/${getSongAssetID(song)}`;
  const twitterMessage = "That's my jam! Check out this Clef Song I made with @ClefSongs";
  const telegramMessage = "That's my jam! Check out my Clef Song";

  const handleCopyClick = (_: string, result: boolean) => {
    setNotification({
      status: result ? 'success' : 'error',
      text: result ? 'Link copied' : 'Error: something went wrong',
    });
    setIsShowNotification(true);
  };

  const handleDownloadSong = async () => {
    setIsRenderingWAV(true);
    try {
      await renderWAV(song);
      setIsRenderingWAV(false);
    } catch (err) {
      setIsRenderingWAV(false);
      setNotification({ status: 'error', text: 'Error: something went wrong' });
      setIsShowNotification(true);
      if (isErrorWithMessage(err)) {
        // eslint-disable-next-line no-console
        console.log(`Error: ${err.message}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Unknown error: ${JSON.stringify(err)}`);
      }
    }
  };

  const handleNotificationShown = () => setIsShowNotification(false);

  useEffect(() => {
    if (!songWAV || listRef.current === null) return;
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = songWAV;
    a.download = `${title}.wav`;
    listRef.current.appendChild(a);
    a.click();
  }, [songWAV, title]);

  return (
    <>
      <PopperButton icon={<Share />} label="Share">
        <List
          ref={listRef}
          items={[
            {
              key: 'copy',
              item: <ListButton label="Copy link" icon={<Copy />} value={link} onCopy={handleCopyClick} />,
            },
            {
              key: 'twitter',
              item: (
                <ListButton
                  label="Share to Twitter"
                  icon={<Twitter />}
                  href={`http://twitter.com/intent/tweet?text=${twitterMessage} &url=${link}`}
                />
              ),
            },
            {
              key: 'telegram',
              item: (
                <ListButton
                  label="Share to Telegram"
                  icon={<Telegram />}
                  href={`https://t.me/share/url?text=${telegramMessage}&url=${link}`}
                />
              ),
            },
            {
              key: 'download-song',
              item: (
                <ListButton
                  label="Download song"
                  icon={<Download />}
                  isPending={isRenderingWAV}
                  onClick={handleDownloadSong}
                />
              ),
            },
            {
              key: 'download-image',
              item: <ListButton label="Download image" icon={<Download />} href={discImage} filename={title} />,
            },
          ]}
        />
      </PopperButton>
      {isShowNotification && <Notification notification={notification} onShown={handleNotificationShown} />}
    </>
  );
});

export { ShareButton };
