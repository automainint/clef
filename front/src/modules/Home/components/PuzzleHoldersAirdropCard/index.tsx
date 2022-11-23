import { FC } from 'react';

import { AnnouncementCard, PlainButton } from 'shared/components';

const PuzzleHoldersAirdropCard: FC = () => (
  <AnnouncementCard
    title="33 songs for 33 $PUZZLE"
    text="Top holders of $PUZZLE token have been whitelisted for another airdrop of Clef songs. 
      33&nbsp;songs for those holding 33&nbsp;$PUZZLE and more. Check your eligibility using the button below."
    buttons={[
      {
        key: 'check-eligibility',
        button: (
          <PlainButton href="/claim-airdrop/puzzle" theme="borderedDark">
            Check eligibility
          </PlainButton>
        ),
      },
    ]}
  />
);

export { PuzzleHoldersAirdropCard };
