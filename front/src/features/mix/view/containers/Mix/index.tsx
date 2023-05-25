import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import cn from 'classnames';

import { DiscsChainCard, MixingDeck, Preloader, Switch } from 'shared/components';
import { ContainerTypes, isErrorWithMessage, User } from 'shared/types';
import { useStore } from 'store/createStore';
import { usePreloader } from 'shared/hooks';
import { getSongID } from 'shared/utils';

import {
  AnchorButton,
  MelodiesListSection,
  MixButton,
  MixingDeckSection,
  MixingOptionsSection,
} from '../../components';
import { Melody } from '../Melody';
import styles from './mix.module.scss';

type Props = {
  user: User | null;
  ConnectButton: ContainerTypes['ConnectButton'];
  PlayButton: ContainerTypes['PlayButton'];
  ObserveDNAButton: ContainerTypes['ObserveDNAButton'];
  Disc: ContainerTypes['Disc'];
  currentPlayingID: string;
  haveFMT?: boolean;
  onMix?: () => void;
};

const Mix: FC<Props> = observer(
  ({ user, ConnectButton, PlayButton, ObserveDNAButton, Disc, currentPlayingID, haveFMT = false, onMix }) => {
    const {
      songs,
      hybrid,
      newHybrid,
      hybridPrice,
      canMintHybrid,
      getSongs,
      getNextSongs,
      mintHybrid,
      clearHybrid,
      getHybridPrice,
      getCanMintHybrid,
    } = useStore().mix;

    const isEnoughForMix = canMintHybrid;

    const { isPending, error, setLoadingStatus } = usePreloader('', false);
    const { isPending: isMixPending, error: mixError, setLoadingStatus: setMixStatus } = usePreloader('', false);
    const mixingDeckRef = useRef<HTMLDivElement>(null);
    const [withAnchor, setWithAnchor] = useState<boolean | null>(null);
    const [isShowOptions, setIsShowOptions] = useState(false);
    const [isShowNewPassport, setIsShowNewPassport] = useState(false);
    const [isBurn, setIsBurn] = useState(!isEnoughForMix);
    const [isMixWithFMT, setIsMixWithFMT] = useState(false);
    const [mixInfo, setMixInfo] = useState('');

    const isMixButtonDisabled = hybrid[0] === null || hybrid[1] === null;

    const loadSongs = useCallback(async () => {
      if (user === null) return;
      setLoadingStatus({ isPending: true, error: '' });
      try {
        await getSongs(user);
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
    }, [getSongs, setLoadingStatus, user]);

    const loadNextSongs = async () => {
      if (user === null) return;
      setLoadingStatus({ isPending: true, error: '' });
      try {
        await getNextSongs(user);
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

    const scrollTop = () => window.scrollTo({ top: 0 });

    const showOptions = async () => {
      if (user === null) return;
      setMixStatus({ isPending: true, error: '' });
      try {
        await getHybridPrice(user);
        setMixStatus({ isPending: false, error: '' });
        setIsShowOptions(true);
      } catch (err) {
        setMixStatus({ isPending: false, error: 'something went wrong' });
        if (isErrorWithMessage(err)) {
          // eslint-disable-next-line no-console
          console.log(`Error: ${err.message}`);
        } else {
          // eslint-disable-next-line no-console
          console.log(`Unknown error: ${JSON.stringify(err)}`);
        }
      }
    };

    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const mix = async () => {
      if (user === null) return;
      scrollTop();
      setMixStatus({ isPending: true, error: '' });
      try {
        await mintHybrid(user, isBurn, isMixWithFMT);
        await getSongs(user);
        clearHybrid();
        setMixStatus({ isPending: false, error: '' });
        onMix?.();
        setIsShowOptions(false);
        disableScroll();
        setIsShowNewPassport(true);
      } catch (err) {
        setMixStatus({ isPending: false, error: 'something went wrong' });
        if (isErrorWithMessage(err)) {
          // eslint-disable-next-line no-console
          console.log(`Error: ${err.message}`);
        } else {
          // eslint-disable-next-line no-console
          console.log(`Unknown error: ${JSON.stringify(err)}`);
        }
      }
    };

    const checkCanMintHybrid = useCallback(async () => {
      if (user === null) return;
      setMixStatus({ isPending: true, error: '' });
      try {
        await getCanMintHybrid(user);
        setMixStatus({ isPending: false, error: '' });
        setIsBurn(!isEnoughForMix);
      } catch (err) {
        setMixStatus({ isPending: false, error: 'something went wrong' });
        if (isErrorWithMessage(err)) {
          // eslint-disable-next-line no-console
          console.log(`Error: ${err.message}`);
        } else {
          // eslint-disable-next-line no-console
          console.log(`Unknown error: ${JSON.stringify(err)}`);
        }
      }
    }, [getCanMintHybrid, setMixStatus, user, isEnoughForMix]);

    const defineMixButtonMessage = useCallback(() => {
      setMixInfo('');
      if (hybrid[0] === null || hybrid[1] === null) setMixInfo('Pick two melodies to be able to mix them');
      if (!isEnoughForMix && isShowOptions) setMixInfo('You don\u2019t have enough balance to keep original melodies');
      if (mixError) setMixInfo(`Error: ${mixError}`);
    }, [isEnoughForMix, hybrid, mixError, isShowOptions]);

    const handleWindowScroll = () => {
      if (!mixingDeckRef.current) return;
      const { offsetTop, offsetHeight } = mixingDeckRef.current;
      const breakPoint = offsetTop + offsetHeight;
      setWithAnchor(window.pageYOffset > breakPoint);
    };

    const handleMixButtonClick = async () => {
      if (!isShowOptions) {
        setWithAnchor(null);
        showOptions();
      } else mix();
    };

    const handleBackButtonClick = () => setIsShowOptions(false);

    const handleMelodyClosePassport = () => setIsShowNewPassport(false);

    const handleKeepCardCheckChange = () => setIsBurn(false);

    const handleBurnCardCheckChange = () => setIsBurn(true);

    const handleFMTToggleChange = () => setIsMixWithFMT(!isMixWithFMT);

    useEffect(() => {
      if (user === null) clearHybrid();
      else loadSongs();
    }, [user, clearHybrid, loadSongs]);

    useEffect(() => {
      checkCanMintHybrid();
    }, [checkCanMintHybrid, hybrid]);

    useEffect(() => defineMixButtonMessage(), [defineMixButtonMessage]);

    useEffect(() => {
      window.addEventListener('scroll', handleWindowScroll);
    }, []);

    useEffect(() => {
      if (haveFMT) return;
      setIsMixWithFMT(false);
    }, [haveFMT]);

    return (
      <div className={styles.root}>
        <div className={cn(styles.content, { [styles.contentAdditional]: isShowOptions })}>
          {isShowOptions ? (
            <MixingOptionsSection onBackButtonClick={handleBackButtonClick}>
              <DiscsChainCard
                desc="Keep parent melodies"
                price={hybridPrice !== null ? `${hybridPrice.amount} ${hybridPrice.asset_name.toUpperCase()}` : ''}
                isDiscount={hybridPrice !== null && hybridPrice.amount < 100}
                isChecked={!isBurn}
                isDisabled={!isEnoughForMix}
                switcher={
                  <Switch isChecked={isMixWithFMT} isDisabled={!haveFMT || isBurn} onChange={handleFMTToggleChange}>
                    Free Mix token
                  </Switch>
                }
                onChange={handleKeepCardCheckChange}
              />
              <DiscsChainCard
                desc="Burn parent melodies"
                price="Free"
                isChecked={isBurn}
                isBurn
                onChange={handleBurnCardCheckChange}
              />
            </MixingOptionsSection>
          ) : (
            <>
              <MixingDeckSection ref={mixingDeckRef}>
                <MixingDeck
                  leftSide={
                    hybrid[0] !== null ? (
                      <Melody
                        song={hybrid[0]}
                        PlayButton={PlayButton}
                        currentPlayingID={currentPlayingID}
                        ObserveDNAButton={ObserveDNAButton}
                        Disc={Disc}
                        isDeckCard
                      />
                    ) : (
                      <></>
                    )
                  }
                  rightSide={
                    hybrid[1] !== null ? (
                      <Melody
                        song={hybrid[1]}
                        PlayButton={PlayButton}
                        currentPlayingID={currentPlayingID}
                        ObserveDNAButton={ObserveDNAButton}
                        Disc={Disc}
                        isDeckCard
                      />
                    ) : (
                      <></>
                    )
                  }
                />
              </MixingDeckSection>
              <InfiniteScroll
                dataLength={songs.length}
                hasMore={songs.length !== 0}
                next={loadNextSongs}
                loader={null}
                style={{ overflow: 'initial' }}
              >
                <MelodiesListSection
                  isAuth={user !== null}
                  ConnectButton={ConnectButton}
                  melodies={songs.map((song) => ({
                    id: getSongID(song),
                    melody: (
                      <Melody
                        song={song}
                        PlayButton={PlayButton}
                        currentPlayingID={currentPlayingID}
                        ObserveDNAButton={ObserveDNAButton}
                        Disc={Disc}
                        showNewPassport={
                          newHybrid !== null && getSongID(newHybrid) === getSongID(song) ? isShowNewPassport : false
                        }
                        onClosePassport={handleMelodyClosePassport}
                      />
                    ),
                  }))}
                >
                  <>
                    {(isPending || error) && (
                      <div className={styles.preloader}>
                        <Preloader isPending={isPending} error={error} />
                      </div>
                    )}
                  </>
                </MelodiesListSection>
              </InfiniteScroll>
            </>
          )}
        </div>
        <div className={styles.sideBar}>
          <MixButton
            text={isShowOptions ? 'Finish' : 'Mix'}
            info={mixInfo}
            isDisabled={isMixButtonDisabled}
            isLoading={isMixPending}
            onClick={handleMixButtonClick}
          />
          <AnchorButton hidden={withAnchor === null ? undefined : !withAnchor} onClick={scrollTop}>
            <MixingDeck
              leftSide={
                hybrid[0] !== null ? (
                  <Disc isPlaying={currentPlayingID === getSongID(hybrid[0])} song={hybrid[0]} />
                ) : (
                  <></>
                )
              }
              rightSide={
                hybrid[1] !== null ? (
                  <Disc isPlaying={currentPlayingID === getSongID(hybrid[1])} song={hybrid[1]} />
                ) : (
                  <></>
                )
              }
              isSmall
            />
          </AnchorButton>
        </div>
      </div>
    );
  }
);

export { Mix };
