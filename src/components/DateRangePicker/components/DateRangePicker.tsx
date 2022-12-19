import React, {useEffect, useState} from 'react';
import useDate from '../../../hooks/useDate';
import {DaysInMonthDetails} from '../../../types';
import {getDaysInMonthDetails} from '../../../utils/helpers/getDaysInMonthDetails';
import Calendar from '../../Calendar';
import '../styles.css';
import MonthAndYearPickers from './MonthAndYearPickers';
import NextPrevButton from './NextPrevButton';
import QuickRanges from './QuickRanges';

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

  useEffect(() => {
    let days_in_month_details = getDaysInMonthDetails(date.year, date.month);
    setDaysInMonthDetails(days_in_month_details);
  }, [date]);

  const handlePrevMonthClick = () => onClickPrevMonth();

  const handleNextMonthClick = () => onClickNextMonth();

  const handleYearPicker = (year: number) => onSelectYear(year);

  const handleMonthPicker = (month: string) => onSelectMonth(month);

  const handleQuickRanges = (range: string) => onSelectQuickRange(range);

  return (
    <div className="module-container">
      <QuickRanges
        selectedQuickRange={selectedQuickRange}
        handleQuickRanges={handleQuickRanges}
      />
      <div className="date-picker-container">
        <div className="month-and-year-container">
          <NextPrevButton
            direction={'prev'}
            handleClick={handlePrevMonthClick}
          />

          <MonthAndYearPickers
            month={date.month}
            year={date.year}
            handleMonthPicker={handleMonthPicker}
            handleYearPicker={handleYearPicker}
          />

          <NextPrevButton direction="next" handleClick={handleNextMonthClick} />
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
