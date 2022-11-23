import { FC } from 'react';

import { AnnouncementCard, PlainButton } from 'shared/components';

const WCTHoldersAirdropCard: FC = () => (
  <AnnouncementCard
    title="$WCT holders airdrop"
    text="Biggest whales of $WCT token have been whitelisted for an airdrop of Clef songs. 
      Limited&nbsp;number of songs is available for claiming. 
      Check&nbsp;your eligibility using the button below."
    buttons={[
      {
        key: 'check-eligibility',
        button: (
          <PlainButton href="/claim-airdrop/wct" theme="borderedDark">
            Check eligibility
          </PlainButton>
        ),
      },
    ]}
  />
);

export { WCTHoldersAirdropCard };
