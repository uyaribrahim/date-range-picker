import React, {FC} from 'react';
import {quick_ranges} from '../../../constants/quickRanges';

interface IQuickRangesProps {
  selectedQuickRange: string;
  handleQuickRanges: (value: string) => void;
}

const QuickRanges: FC<IQuickRangesProps> = ({
  selectedQuickRange,
  handleQuickRanges
}) => {
  return (
    <div className="quick-ranges-container">
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {quick_ranges['en'].map((range, index) => (
          <span
            key={index}
            className={`range-label${
              selectedQuickRange === range.value ? ' selected-range-label' : ''
            }`}
            style={{color: selectedQuickRange === range.value ? '#22ccce' : ''}}
            onClick={() => handleQuickRanges(range.value)}
          >
            {range.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuickRanges;
