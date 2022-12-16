import React, {useEffect, useState} from 'react';
import {months} from '../../constants/months';
import {quick_ranges} from '../../constants/quickRanges';
import {currMonth, currYear, today} from '../../constants/today';
import {yearList} from '../../constants/years';
import {DaysInMonthDetails} from '../../types';
import {getDaysInMonthDetails} from '../../utils/helpers/getDaysInMonthDetails';
import Calendar from '../Calendar';
import LeftArrow from '../SVGComponents/LeftArrow';
import RightArrow from '../SVGComponents/RightArrow';
import './styles.css';

export interface DateRangePickerProps {
  start_date?: Date;
}

export type DateState = {
  month: number;
  year: number;
};

const DateRangePicker = () => {
  const [date, setDate] = useState<DateState>({
    month: currMonth,
    year: currYear
  });
  const [startDate, setStartDate] = useState<number>(
    new Date(today).setHours(0, 0, 0, 0)
  );
  const [endDate, setEndDate] = useState<number | undefined>(
    new Date(today).setHours(0, 0, 0, 0)
  );
  const [daysInMonthDetails, setDaysInMonthDetails] = useState<
    DaysInMonthDetails[]
  >([]);

  const month = date.month;
  const year = date.year;

  useEffect(() => {
    let days_in_month_details = getDaysInMonthDetails(year, month);
    setDaysInMonthDetails(days_in_month_details);
  }, [date]);

  const handlePrevMonthClick = () => {
    let prevMonthIndex = month - 1;
    let prevYear = year;
    if (prevMonthIndex < 0) {
      prevMonthIndex = 11;
      prevYear--;
    }
    setDate({month: prevMonthIndex, year: prevYear});
  };

  const handleNextMonthClick = () => {
    let nextMonthIndex = month + 1;
    let nextYear = year;
    if (nextMonthIndex > 11) {
      nextMonthIndex = 0;
      nextYear++;
    }
    setDate({month: nextMonthIndex, year: nextYear});
  };

  const onChangeYear = (year: number) => {
    setDate(prevState => ({...prevState, year: year}));
  };

  const onChangeMonth = (month: string) => {
    let index = months['en'].findIndex(el => {
      return el == month;
    });
    setDate(prevState => ({...prevState, month: index}));
  };

  return (
    <div className="module-container">
      <div className="quick-ranges-container">
        <div
          style={{
            display: 'flex',
            flex: 8,
            flexDirection: 'column'
          }}
        >
          {quick_ranges['en'].map((range, index) => (
            <span key={index} className="range-label">
              {range}
            </span>
          ))}
        </div>
      </div>
      <div className="date-picker-container">
        <div className="month-and-year-container">
          <div className="next-prev-button-wrapper">
            <div className="next-prev-button" onClick={handlePrevMonthClick}>
              <LeftArrow />
            </div>
          </div>

          <div className="month-and-year-pickers">
            <select
              className="month-picker"
              onChange={e => onChangeMonth(e.target.value)}
              value={months['en'][month]}
            >
              {months['en'].map((el, index) => (
                <option key={index}>{el}</option>
              ))}
            </select>
            <select
              className="year-picker"
              onChange={e => onChangeYear(Number(e.target.value))}
              value={yearList?.[2042 - year]}
            >
              {yearList?.map((el, index) => {
                return <option key={index}>{el}</option>;
              })}
            </select>
          </div>
          <div className="next-prev-button-wrapper">
            <div className="next-prev-button" onClick={handleNextMonthClick}>
              <RightArrow />
            </div>
          </div>
        </div>

        <Calendar
          daysInMonth={daysInMonthDetails}
          startDate={startDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
        <div style={{display: 'flex', flex: 1}}></div>
      </div>
    </div>
  );
};

export default DateRangePicker;
