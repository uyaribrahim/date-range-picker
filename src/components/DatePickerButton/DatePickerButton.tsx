import React, {FC, useEffect, useRef, useState} from 'react';
import useDate from '../../hooks/useDate';
import DateRangePicker from '../DateRangePicker';
import '../DateRangePicker/styles.css';
import Button from './components/Button';
import './DatePickerButton.style.css';

interface IDatePickerButtonProps {
  ranges: {startDate: Date; endDate: Date};
  onChangeRange: React.Dispatch<
    React.SetStateAction<{startDate: Date; endDate: Date}>
  >;
}

const DatePickerButton: FC<IDatePickerButtonProps> = ({
  ranges,
  onChangeRange
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [isButtonCloserToLeftSide, setIsButtonCloserToLeftSide] =
    useState<boolean>(false);
  const dateProps = useDate(ranges);
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
    onChangeRange({
      startDate: new Date(start_date),
      endDate: new Date(end_date!!)
    });
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
  console.log(showCalendar);
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
        showCalendar={showCalendar}
        start_date={dateRange.start_date}
        end_date={dateRange.end_date}
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
