import React, {FC} from 'react';
import {today} from '../../../constants/today';
import {DaysInMonthDetails} from '../../../types';
import {
  getClassForDayNumberWrapper,
  getClassNamesForSideElements,
  getDayClassName
} from '../helpers';

interface IDayProps {
  index: number;
  onClickDay: (value: number) => void;
  day: DaysInMonthDetails;
  startDate: number;
  endDate?: number;
}
const Day: FC<IDayProps> = ({index, onClickDay, day, startDate, endDate}) => {
  const currDayTimestamp = day.timestamp;
  const todayTimestamp = today.setHours(0, 0, 0, 0);
  const isCurrentMonth = day.monthStatus === 0;
  const isStartDate = startDate === currDayTimestamp;
  const isEndDate = endDate === currDayTimestamp;
  const isToday = currDayTimestamp === todayTimestamp;

  // Check if the current day is the selected start or end date
  const isSelectedDate =
    (isStartDate || isEndDate) && isCurrentMonth ? true : false;
  const isWithinDifferentDates = endDate && endDate != startDate;
  const isValidEndDate =
    isEndDate && isCurrentMonth && isWithinDifferentDates ? true : false;
  const isValidStartDate =
    isStartDate && isCurrentMonth && isWithinDifferentDates ? true : false;

  const dayClass = getDayClassName(isCurrentMonth);
  const dayNumberWrapperClass = getClassForDayNumberWrapper(
    isToday,
    isSelectedDate
  );

  // Check if the current day is within the range of the start and end dates
  const isWithinDateRange =
    currDayTimestamp > startDate &&
    (endDate == null ? null : currDayTimestamp < endDate) &&
    isCurrentMonth;
  const dayBgColor = isWithinDateRange ? '#d2f4f5' : '';

  const rightElementClass = getClassNamesForSideElements(
    'right',
    isValidStartDate
  );
  const leftElementClass = getClassNamesForSideElements('left', isValidEndDate);

  return (
    <div
      key={index}
      onClick={() => onClickDay(day.timestamp)}
      className={dayClass}
      style={{
        borderTopLeftRadius: day.dayOfWeek == 0 ? 100 : 0,
        borderBottomLeftRadius: day.dayOfWeek == 0 ? 100 : 0,
        borderTopRightRadius: day.dayOfWeek == 6 ? 100 : 0,
        borderBottomRightRadius: day.dayOfWeek == 6 ? 100 : 0,
        background: dayBgColor
      }}
    >
      <div className={leftElementClass}></div>
      <div className={dayNumberWrapperClass}>
        <span>{day.dateNumber}</span>
      </div>
      <div className={rightElementClass}></div>
    </div>
  );
};

export default Day;
