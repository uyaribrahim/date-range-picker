import React, {useEffect, useRef, useState} from 'react';
import useDate from '../../hooks/useDate';
import DateRangePicker from '../DateRangePicker';
import '../DateRangePicker/styles.css';
import './DatePickerButton.style.css';

const DatePickerButton = () => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [isButtonCloserToLeftSide, setIsButtonCloserToLeftSide] =
    useState<boolean>(false);
  const dateProps = useDate();
  const [dateRange, setDateRange] = useState<any>({
    start_date: dateProps.startDate,
    end_date: dateProps.endDate
  });
  const refDiv = useRef<HTMLDivElement>(null);

  const handleCancel = () => {
    console.log('handleCancel');
    let start_date = new Date(dateRange.start_date);
    dateProps.setStartDate(dateRange.start_date);
    dateProps.setEndDate(dateRange.end_date);
    dateProps.setDate({
      month: start_date.getMonth(),
      year: start_date.getFullYear()
    });
    setShowCalendar(false);
  };

  const handleApply = (start_date: number, end_date: number | undefined) => {
    let startDate = new Date(start_date);

    dateProps.setDate({
      month: startDate.getMonth(),
      year: startDate.getFullYear()
    });
    setDateRange({start_date: start_date, end_date: end_date});
    setShowCalendar(false);
  };

  useEffect(() => {
    const div = refDiv.current;
    const rect = div!!.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const screenCenter = window.innerWidth / 2;

    if (center < screenCenter) {
      setIsButtonCloserToLeftSide(true);
    } else {
      setIsButtonCloserToLeftSide(false);
    }
  }, []);

  return (
    <div
      ref={refDiv}
      style={{
        position: 'relative',
        width: 'fit-content'
      }}
    >
      <div className="container" onClick={() => setShowCalendar(true)}>
        <div className="date">
          <span>
            {new Date(dateRange.start_date).toLocaleDateString('en-EN')}
          </span>
        </div>
        <div className="space">-</div>
        <div className="date">
          <span>
            {' '}
            {new Date(dateRange.end_date).toLocaleDateString('en-EN')}
          </span>
        </div>
      </div>
      {showCalendar ? (
        <DateRangePicker
          handleCancel={handleCancel}
          handleApply={handleApply}
          position={isButtonCloserToLeftSide}
          {...dateProps}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default DatePickerButton;
