import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

import { isErrorWithMessage } from 'shared/types';

import { Disc } from 'shared/components';
import { getColorsByAssetID, songColors } from 'shared/utils';

enum SongColors {
  Major = songColors.major,
  Minor = songColors.minor,
  Neutral = songColors.neutral,
  Weird = songColors.weird,
}

const Image: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [colors, setColors] = useState<SongColors[] | null>(null);
  const discContainerRef = useRef<HTMLDivElement>(null);

  const isCorrectID = id !== undefined && !Array.isArray(id);

  const handleRendered = async () => {
    if (discContainerRef.current === null) return;
    try {
      const canvas = await html2canvas(discContainerRef.current, { backgroundColor: 'rgba(0, 0, 0, 0)' });
      const image = canvas.toDataURL('image/png', 0.9);
      console.log(image);
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
    if (!router.isReady) return;
    if (!isCorrectID) router.replace('/');
  }, [isCorrectID, router]);

  useEffect(() => {
    if (!isCorrectID) return;
    const fetchData = async () => {
      try {
        const data = await getColorsByAssetID(id);
        setColors(data);
      } catch (err) {
        if (isErrorWithMessage(err)) {
          // eslint-disable-next-line no-console
          console.log(`Error: ${err.message}`);
        } else {
          // eslint-disable-next-line no-console
          console.log(`Unknown error: ${JSON.stringify(err)}`);
        }
      }
    };

    fetchData();
  }, [isCorrectID, id]);

  return (
    <>
      <Head>
        <title>Clef - Image</title>
      </Head>
      {isCorrectID && colors !== null && colors.length > 0 && (
        <Disc ref={discContainerRef} colors={colors} onRendered={handleRendered} />
      )}
    </>
  );
};

export { Image };
