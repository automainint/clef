import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { ContainerTypes, isErrorWithMessage, User } from 'shared/types';
import { MessageCard, PlainButton } from 'shared/components';
import { useStore } from 'store/createStore';
import { usePreloader } from 'shared/hooks';
import { routes } from 'shared/constants';

type Props = {
  user: User | null;
  ConnectButton: ContainerTypes['ConnectButton'];
  name: string;
};

const ClaimAirdrop: FC<Props> = observer(({ user, ConnectButton, name }) => {
  const { fetchAirdropInfo, airdropInfo, airdropClaim, claimingStatus } = useStore().claimAirdrop;
  const { isPending, error, setLoadingStatus } = usePreloader('', false);

  const handleClaimButtonClick = async () => {
    if (user === null) return;
    setLoadingStatus({ isPending: true, error: '' });
    try {
      await airdropClaim(user, name);
      await fetchAirdropInfo(user, name);
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
    if (user === null) return;
    const fetchData = async () => {
      setLoadingStatus({ isPending: true, error: '' });
      try {
        await fetchAirdropInfo(user, name);
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

    fetchData();
  }, [fetchAirdropInfo, name, setLoadingStatus, user]);

  if (user === null)
    return (
      <MessageCard
        title="You are not authorized yet"
        desc="To check your airdrop eligibility connect your wallet"
        action={<ConnectButton isInvert />}
      />
    );

  if (isPending) return <MessageCard isPending />;
  if (error) return <MessageCard title="Error" desc={error} />;

  switch (claimingStatus) {
    case 'NO_AIRDROP':
      return (
        <MessageCard
          title="This airdrop does not exist"
          desc="Check if the link is correct"
          action={
            <PlainButton href="/" theme="filledDark">
              Home
            </PlainButton>
          }
        />
      );
    case 'NOT_IN_WHITELIST':
      return (
        <MessageCard
          title="No luck this time :("
          desc="Your address is not in the claiming whitelist. Stay tuned for more opportunities coming soon!"
          contentSize="medium"
        />
      );
    case 'NO_SONGS':
      return (
        <MessageCard
          title="Sorry!"
          desc="You&#8217;re eligible for an airdrop but no songs left to claim."
          action={
            <PlainButton isDisabled theme="filledDark">
              Claim
            </PlainButton>
          }
        />
      );
    case 'CANT_CLAIM':
      return (
        <MessageCard
          title="Congratulations!"
          desc="You have claimed your song. Now you can listen to it!"
          action={
            <PlainButton href={routes.mix} theme="filledDark">
              To my library
            </PlainButton>
          }
        />
      );
    case 'CAN_CLAIM':
      return (
        <MessageCard
          title="Congratulations!"
          desc={`You\u2019re eligible for an airdrop. Songs left to claim: ${airdropInfo?.songs_total || 0}`}
          action={
            <PlainButton onClick={handleClaimButtonClick} isDisabled={!airdropInfo?.songs_total} theme="filledDark">
              Claim
            </PlainButton>
          }
        />
      );
    default:
      return null;
  }
});

export { ClaimAirdrop };
