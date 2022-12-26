import React, {useEffect, useRef, useState} from 'react';
import useDate from '../../hooks/useDate';
import DateRangePicker from '../DateRangePicker';
import '../DateRangePicker/styles.css';
import Button from './components/Button';
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
    dateProps.setStartDate(dateRange.start_date);
    dateProps.setEndDate(dateRange.end_date);
    setDateToStartDate(dateRange.start_date);
    setShowCalendar(false);
  };

  const handleApply = (start_date: number, end_date: number | undefined) => {
    setDateToStartDate(start_date);
    setDateRange({start_date: start_date, end_date: end_date});
    setShowCalendar(false);
  };

  const setDateToStartDate = (startDate: number) => {
    let _startDate = new Date(startDate);
    dateProps.setDate({
      month: _startDate.getMonth(),
      year: _startDate.getFullYear()
    });
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
      <Button
        setShowCalendar={setShowCalendar}
        start_date={dateProps.startDate}
        end_date={dateProps.endDate}
      />
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
