import { useState } from 'react';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onClear: () => void;
}

const NumPad = ({ onKeyPress, onBackspace, onClear }: KeypadProps) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];
  return (
    <>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {keys.map((key) => (
          <TouchButton
            action={() => onKeyPress(key)}
            label={key}
            key={key}
          />
        ))}
        <button onClick={onBackspace}>←</button>
        <button onClick={onClear}>Clear</button>
      </div>
    </>
  );
};

export default NumPad;

const TouchButton = ({
  action,
  label,
}: {
  action: (() => void) | ((key: string) => void);
  label: string;
}) => {
  const [touchStatus, setTouchStatus] = useState(false);
  return (
    <button
      onClick={() => action(label)}
      onTouchStart={() => setTouchStatus(true)}
      onTouchEnd={() => setTouchStatus(false)}
      className={`rounded-sm border border-white py-2 transition-colors ${touchStatus ? 'bg-white text-gray-500' : 'bg-transparent text-white'}`}
    >
      {label}
    </button>
  );
};
