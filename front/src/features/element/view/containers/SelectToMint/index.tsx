import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC } from 'react';

import { ElementCard, ElementIcon, RadioBox } from 'shared/components';
import { isElementType } from 'shared/types';
import { useStore } from 'store/createStore';

import styles from './selectToMint.module.scss';

const SelectToMint: FC = observer(() => {
  const { selectedToMint, selectToMint } = useStore().element;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (!isElementType(value)) return;
    selectToMint(value);
  };

  return (
    <div className={styles.root}>
      <RadioBox name="element" value="chord" checked={selectedToMint === 'chord'} onChange={handleChange} hidden>
        <ElementCard
          title="Chord"
          text="Harmonic style of the song"
          icon={<ElementIcon type="chord" />}
          isSelected={selectedToMint === 'chord'}
        />
      </RadioBox>
      <RadioBox name="element" value="beat" checked={selectedToMint === 'beat'} onChange={handleChange} hidden>
        <ElementCard
          title="Beat"
          text="A combination of 3 percussion rhythms"
          icon={<ElementIcon type="beat" />}
          isSelected={selectedToMint === 'beat'}
        />
      </RadioBox>
      <RadioBox name="element" value="vibe" checked={selectedToMint === 'vibe'} onChange={handleChange} hidden>
        <ElementCard
          title="Vibe"
          text="A combination of instrument, rhythms and arpeggio"
          icon={<ElementIcon type="vibe" />}
          isSelected={selectedToMint === 'vibe'}
        />
      </RadioBox>
    </div>
  );
});

export { SelectToMint };
