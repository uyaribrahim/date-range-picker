import React, {FC} from 'react';
import {days} from '../../../constants/days';
import {DaysInMonthDetails} from '../../../types';
import CalendarGrid from './CalendarGrid';

export interface ICalendarProps {
  daysInMonth: DaysInMonthDetails[];
  startDate: number;
  endDate?: number;
  onClickDay: (value: number) => void;
}

const Calendar: FC<ICalendarProps> = ({
  daysInMonth,
  startDate,
  endDate,
  onClickDay
}) => {
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
