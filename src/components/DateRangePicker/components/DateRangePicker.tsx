import React, {useEffect, useState} from 'react';
import useDate from '../../../hooks/useDate';
import {DaysInMonthDetails} from '../../../types';
import {getDaysInMonthDetails} from '../../../utils/helpers/getDaysInMonthDetails';
import Calendar from '../../Calendar';
import '../styles.css';
import MonthAndYearPickers from './MonthAndYearPickers';
import NextPrevButton from './NextPrevButton';
import QuickRanges from './QuickRanges';
import SelectedDates from './SelectedDates';

export interface DateRangePickerProps {
  start_date?: Date;
}

const DateRangePicker = () => {
  const {
    date,
    startDate,
    endDate,
    selectedQuickRange,
    onClickDay,
    onSelectQuickRange,
    onClickNextMonth,
    onClickPrevMonth,
    onSelectMonth,
    onSelectYear,
    isSelectingStartDate,
    setIsSelectingStartDate
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
          onClickDay={onClickDay}
        />

        <SelectedDates
          startDate={startDate}
          endDate={endDate}
          isSelectingStartDate={isSelectingStartDate}
          setIsSelectingStartDate={setIsSelectingStartDate}
        />
        <div className="btn-container">
          <button className="cancel-button">Cancel</button>
          <button className="apply-button">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
