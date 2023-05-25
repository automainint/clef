import { FC } from 'react';

import { AnnouncementCard, PlainButton } from 'shared/components';

const TrialCard: FC = () => (
  <AnnouncementCard
    title="Free trial"
    text="Players can now taste what using Clef Mixing feels like in a free trial. 
      We&nbsp;reconstructed&nbsp;the&nbsp;full&nbsp;mixing&nbsp;experience and removed all the barriers:
      no need to buy songs or connect blockchain before trying."
    buttons={[
      {
        key: 'open-trial',
        button: (
          <PlainButton href="https://trial.clef.one/" theme="borderedDark">
            Try out
          </PlainButton>
        ),
      },
    ]}
  />
);

export { TrialCard };
