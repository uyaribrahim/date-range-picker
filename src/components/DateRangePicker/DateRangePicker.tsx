import React, {useEffect, useState} from 'react';
import {months} from '../../constants/months';
import {quick_ranges} from '../../constants/quickRanges';
import {yearList} from '../../constants/years';
import useDate from '../../hooks/useDate';
import {DaysInMonthDetails} from '../../types';
import {getDaysInMonthDetails} from '../../utils/helpers/getDaysInMonthDetails';
import Calendar from '../Calendar';
import LeftArrow from '../SVGComponents/LeftArrow';
import RightArrow from '../SVGComponents/RightArrow';
import './styles.css';

export interface DateRangePickerProps {
  start_date?: Date;
}

const DateRangePicker = () => {
  const {
    date,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedQuickRange,
    setSelectedQuickRange,
    onSelectQuickRange,
    onClickNextMonth,
    onClickPrevMonth,
    onSelectMonth,
    onSelectYear
  } = useDate();

  const [daysInMonthDetails, setDaysInMonthDetails] = useState<
    DaysInMonthDetails[]
  >([]);

  const month = date.month;
  const year = date.year;

  useEffect(() => {
    let days_in_month_details = getDaysInMonthDetails(year, month);
    setDaysInMonthDetails(days_in_month_details);
  }, [date]);

  const handlePrevMonthClick = () => onClickPrevMonth();

  const handleNextMonthClick = () => onClickNextMonth();

  const handleYearPicker = (year: number) => onSelectYear(year);

  const handleMonthPicker = (month: string) => onSelectMonth(month);

  const handleQuickRanges = (range: string) => onSelectQuickRange(range);

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
            <span
              key={index}
              className="range-label"
              style={{
                color: selectedQuickRange == range.value ? '#22ccce' : ''
              }}
              onClick={() => handleQuickRanges(range.value)}
            >
              {range.label}
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
              onChange={e => handleMonthPicker(e.target.value)}
              value={months['en'][month]}
            >
              {months['en'].map((el, index) => (
                <option key={index}>{el}</option>
              ))}
            </select>
            <select
              className="year-picker"
              onChange={e => handleYearPicker(Number(e.target.value))}
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
          setSelectedQuickRange={setSelectedQuickRange}
        />
        <div style={{display: 'flex', flex: 1}}></div>
      </div>
    </div>
  );
};

export default DateRangePicker;
