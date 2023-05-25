import { FC } from 'react';

import { DnaCard, ElementIcon } from 'shared/components';
import { ContainerTypes, ElementResource } from 'shared/types';

type Props = {
  element: ElementResource;
  PlayButton: ContainerTypes['PlayButton'];
};

const Passport: FC<Props> = ({ element, PlayButton }) => (
  <DnaCard
    slotElement={<ElementIcon type="beat" color="#D4C053" />}
    title="Jackfruit"
    desc="Beat"
    tempo="120"
    length="0:16"
    meter="4/4"
    id="CSB5QjKAYeY5BCK4EyLC66fKn5QWX73HAXhn4pNb9HD"
    url="/"
    buttons={[
      {
        key: 'play',
        button: <PlayButton playableResource={element} theme="dark" />,
        size: 'small',
      },
    ]}
    withMessageForType="beat"
    theme="dark"
    accentColor="#D4C053"
  />
);

export { Passport };
