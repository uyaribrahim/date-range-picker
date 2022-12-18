import React, {FC} from 'react';
import {days} from '../../../constants/days';
import {DaysInMonthDetails} from '../../../types';
import CalendarGrid from './CalendarGrid';

export interface ICalendarProps {
  daysInMonth: DaysInMonthDetails[];
  startDate: number;
  endDate?: number;
  setEndDate: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStartDate: React.Dispatch<React.SetStateAction<number>>;
  setSelectedQuickRange: React.Dispatch<React.SetStateAction<string>>;
}

const Calendar: FC<ICalendarProps> = ({
  daysInMonth,
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  setSelectedQuickRange
}) => {
  const onClickDay = (timestamp: number) => {
    const start_date = startDate;
    const end_date = endDate;
    setSelectedQuickRange('');
    if (start_date && end_date) {
      setStartDate(timestamp);
      setEndDate(undefined);
      return;
    }
    if (timestamp < startDate) {
      setStartDate(timestamp);
      setEndDate(undefined);
      return;
    }
    setEndDate(timestamp);
  };

  return (
    <div className="calendar">
      <div className="calendar-header ">
        {days['en'].map((day, index) => (
          <div className="day-label" key={index}>
            {day}
          </div>
        ))}
      </div>
      <CalendarGrid
        daysInMonth={daysInMonth}
        startDate={startDate}
        endDate={endDate}
        onClickDay={onClickDay}
      />
    </div>
  );
};

export default Calendar;
