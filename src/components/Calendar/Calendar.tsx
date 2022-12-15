import React, {FC} from 'react';
import {days} from '../../constants/days';
import {DaysInMonthDetails} from '../../types';

export interface ICalendarProps {
  daysInMonth: DaysInMonthDetails[];
  startDate: number;
  endDate?: number;
  setEndDate: React.Dispatch<React.SetStateAction<number | undefined>>;
  setStartDate: React.Dispatch<React.SetStateAction<number>>;
}

const Calendar: FC<ICalendarProps> = ({
  daysInMonth,
  startDate,
  endDate,
  setEndDate,
  setStartDate
}) => {
  const onClickDay = (timeStamp: number) => {
    const start_date = startDate;
    const end_date = endDate;

    if (start_date && end_date) {
      setStartDate(timeStamp);
      setEndDate(undefined);
      return;
    }
    if (timeStamp < startDate) {
      setStartDate(timeStamp);
      setEndDate(undefined);
      return;
    }
    setEndDate(timeStamp);
  };

  function getDayClass(isCurrentMonth: boolean): string {
    let dayClass = 'day';
    dayClass += isCurrentMonth
      ? ' day-of-current-month'
      : ' day-of-other-month';
    return dayClass;
  }

  return (
    <div className="calendar">
      <div className="calendar-header ">
        {days['en'].map((day, index) => (
          <div className="day-label" key={index}>
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {daysInMonth?.map((day: DaysInMonthDetails, index: number) => {
          const currDayTimeStamp = day.timeStamp;
          const isCurrentMonth = day.monthStatus === 0;
          const isStartDate = startDate === currDayTimeStamp;
          const isEndDate = endDate === currDayTimeStamp;

          const dayClass = getDayClass(isCurrentMonth);

          const isWithinDateRange =
            currDayTimeStamp > startDate &&
            (endDate == null ? null : currDayTimeStamp < endDate) &&
            isCurrentMonth;

          const dayBgColor = isWithinDateRange ? 'rgb(210, 244, 245)' : '';

          const isWithinDifferentDates = endDate && endDate != startDate;
          const backgroundColor = 'rgb(210, 244, 245)';
          console.log(new Date(day.timeStamp));
          return (
            <div
              key={index}
              onClick={() => onClickDay(currDayTimeStamp)}
              // onMouseEnter={
              //   isCurrentMonth
              //     ? () => handleMouseEnter(currDayTimeStamp)
              //     : undefined
              // }
              //   onMouseLeave={isCurrentMonth ? handleMouseLeave : undefined}
              className={dayClass}
              style={{
                borderTopLeftRadius: day.dayOfWeek == 0 ? 100 : 0,
                borderBottomLeftRadius: day.dayOfWeek == 0 ? 100 : 0,
                borderTopRightRadius: day.dayOfWeek == 6 ? 100 : 0,
                borderBottomRightRadius: day.dayOfWeek == 6 ? 100 : 0,
                background: dayBgColor
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '50%',
                  height: '100%',
                  left: 0,
                  background:
                    isEndDate && isCurrentMonth && isWithinDifferentDates
                      ? 'rgb(210 244 245)'
                      : ''
                }}
              ></div>
              <div
                className={
                  (isStartDate || isEndDate) && isCurrentMonth
                    ? ' selected-date'
                    : ''
                }
                style={{position: 'relative', zIndex: 5}}
              >
                <span>{day.dateNumber}</span>
              </div>

              <div
                style={{
                  position: 'absolute',
                  background:
                    isStartDate && isCurrentMonth && isWithinDifferentDates
                      ? backgroundColor
                      : '',
                  width: '50%',
                  height: '100%',
                  right: 0,
                  zIndex: 0
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
