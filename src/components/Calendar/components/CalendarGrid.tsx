import React, {FC} from 'react';
import {DaysInMonthDetails} from '../../../types';
import Day from './Day';

export interface ICalendarProps {
  daysInMonth: DaysInMonthDetails[];
  startDate: number;
  endDate?: number;
  onClickDay: (value: number) => void;
}

const CalendarGrid: FC<ICalendarProps> = ({
  daysInMonth,
  startDate,
  endDate,
  onClickDay
}) => {
  return (
    <div className="calendar-grid">
      {daysInMonth?.map((day: DaysInMonthDetails, index: number) => (
        <Day
          index={index}
          onClickDay={onClickDay}
          day={day}
          startDate={startDate}
          endDate={endDate}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
