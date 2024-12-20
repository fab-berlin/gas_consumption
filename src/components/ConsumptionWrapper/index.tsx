'use client';

import ConsumptionForm from '@/components/ConsumptionForm';
import NumPad from '@/components/NumPad';
import { useState } from 'react';

const ConsumptionWrapper = () => {
  const [value, setValue] = useState('');
  const handleKeyPress = (key: string) => {
    setValue((prevValue) => prevValue + key);
  };
  const handleBackspace = () => {
    setValue((prevValue) => prevValue.slice(0, -1));
  };
  const handleClear = () => {
    setValue('');
  };

  return (
    <>
      <ConsumptionForm
        value={value}
        onFocus={handleClear}
      />
      <NumPad
        onClear={handleClear}
        onBackspace={handleBackspace}
        onKeyPress={handleKeyPress}
      />
    </>
  );
};

export default ConsumptionWrapper;
