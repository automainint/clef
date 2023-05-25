import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

import { WalletContainers } from 'features/wallet';
import { SongContainers } from 'features/song';
import { TurntableContainers } from 'features/turntable';

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

export type ContainerTypes = {
  ConnectButton: WalletContainers['ConnectButton'];
  ObserveDNAButton: SongContainers['ObserveDNAButton'];
  Disc: SongContainers['Disc'];
  SongCards: SongContainers['Cards'];
  LikeButton: SongContainers['LikeButton'];
  PlayButton: TurntableContainers['PlayButton'];
};

export type NotificationStatus = {
  status: 'success' | 'error';
  text: string;
};

export type Theme = 'light' | 'dark';

export type Status = 'PENDING' | 'IDLE';

export type ValueWithStatus<T> = {
  value: T;
  status: Status;
};
