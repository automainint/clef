import { FC } from 'react';
import Slider from '@appigram/react-rangeslider';
import '@appigram/react-rangeslider/lib/index.css';

import styles from './rangeSlider.module.scss';

type Props = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

const RangeSlider: FC<Props> = ({ value, min = 0, max = 1, step = 0.01, onChange }) => {
  const handleChange = (_value: number) => {
    onChange(Number(_value.toFixed(step < 1 ? step.toString().length - 2 : 0)));
  };

  return (
    <div className={styles.root}>
      <Slider value={value} min={min} max={max} step={step} orientation="vertical" onChange={handleChange} />
    </div>
  );
};

export { RangeSlider };
