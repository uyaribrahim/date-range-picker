import React, {FC} from 'react';

interface ISelectedDatesProps {
  startDate: number;
  endDate: number | undefined;
  isSelectingStartDate: boolean;
  setIsSelectingStartDate: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedDates: FC<ISelectedDatesProps> = ({
  startDate,
  endDate,
  isSelectingStartDate,
  setIsSelectingStartDate
}) => {
  const options: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const startDateString = new Date(startDate).toLocaleDateString(
    'en-US',
    options
  );
  const endDateString = endDate
    ? new Date(endDate).toLocaleDateString('en-US', options)
    : undefined;

  return (
    <div className="selected-dates-container">
      <div
        className="start-end-date"
        style={{borderColor: isSelectingStartDate ? '#22ccce' : ''}}
        onClick={() => setIsSelectingStartDate(true)}
      >
        <span>{startDateString}</span>
      </div>
      <div
        className="start-end-date"
        style={{borderColor: isSelectingStartDate ? '' : '#22ccce'}}
        onClick={() => setIsSelectingStartDate(false)}
      >
        <span>{endDateString ?? '-'}</span>
      </div>
    </div>
  );
};

export default SelectedDates;
