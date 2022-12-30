import React, {FC, useEffect, useRef, useState} from 'react';
import useDate from '../../../hooks/useDate';
import PickerContainer from '../../PickerContainer';
import '../DateRangePicker.style.css';
import Button from './Button';
interface IDateRangePickerProps {
  range: {startDate: Date; endDate: Date};
  onChangeDateRange: React.Dispatch<
    React.SetStateAction<{startDate: Date; endDate: Date}>
  >;
}

const DateRangePicker: FC<IDateRangePickerProps> = ({
  range,
  onChangeDateRange
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [isButtonCloserToLeftSide, setIsButtonCloserToLeftSide] =
    useState<boolean>(false);
  const dateProps = useDate(range);
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
    onChangeDateRange({
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
        <PickerContainer
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

export default DateRangePicker;
