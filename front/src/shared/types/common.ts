import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

import { WalletContainers } from 'features/wallet';
import { SongContainers } from 'features/song';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type SetLoadingStatus<TError = string> = React.Dispatch<
  React.SetStateAction<{
    isPending: boolean;
    error: TError;
  }>
>;

export type Currency = {
  label: string;
  value: number;
};

export type ContainerTypes = {
  ConnectButton: WalletContainers['ConnectButton'];
  PlayButton: SongContainers['PlayButton'];
  ObserveDNAButton: SongContainers['ObserveDNAButton'];
  Disc: SongContainers['Disc'];
};
