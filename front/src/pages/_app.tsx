import Head from 'next/head';

import { AppPropsWithLayout } from 'shared/types';
import { StoreProvider, useStore } from 'store/createStore';

import './_app.scss';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const store = useStore();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ff710d" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
      </Head>
      <StoreProvider store={store}>{getLayout(<Component {...pageProps} />)}</StoreProvider>
    </>
  );
};

export default MyApp;
