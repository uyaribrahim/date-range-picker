import React, {FC, useEffect, useRef, useState} from 'react';
import {DateState} from '../../../hooks/useDate';
import {DaysInMonthDetails} from '../../../types';
import {getDaysInMonthDetails} from '../../../utils/helpers/getDaysInMonthDetails';
import Calendar from '../../Calendar';
import '../styles.css';
import MonthAndYearPickers from './MonthAndYearPickers';
import NextPrevButton from './NextPrevButton';
import QuickRanges from './QuickRanges';
import SelectedDates from './SelectedDates';

interface IPickerContainerProps {
  handleCancel: () => void;
  handleApply: (start_date: number, end_date: number | undefined) => void;
  position: boolean;
  date: DateState;
  startDate: number;
  endDate: number | undefined;
  selectedQuickRange: string;
  onClickDay: (timestamp: number) => void;
  onSelectQuickRange: (range: string) => void;
  onClickNextMonth: () => void;
  onClickPrevMonth: () => void;
  onSelectMonth: (month: string) => void;
  onSelectYear: (year: number) => void;
  isSelectingStartDate: boolean;
  setIsSelectingStartDate: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickerContainer: FC<IPickerContainerProps> = ({
  handleCancel,
  handleApply,
  position,
  ...props
}) => {
  const [daysInMonthDetails, setDaysInMonthDetails] = useState<
    DaysInMonthDetails[]
  >([]);
  const refDatePickerContainer = useRef<HTMLDivElement>(null);

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
  } = props;

  useEffect(() => {
    let days_in_month_details = getDaysInMonthDetails(date.year, date.month);
    setDaysInMonthDetails(days_in_month_details);
  }, [date]);

  useEffect(() => {
    const hideOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    const hideOnClickOutside = (e: MouseEvent) => {
      if (
        refDatePickerContainer.current &&
        !refDatePickerContainer.current.contains(e.target as Node)
      ) {
        handleCancel();
      }
    };

    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);

    return () => {
      document.removeEventListener('keydown', hideOnEscape, true);
      document.removeEventListener('click', hideOnClickOutside, true);
    };
  }, []);

  const handlePrevMonthClick = () => onClickPrevMonth();

  const handleNextMonthClick = () => onClickNextMonth();

  const handleYearPicker = (year: number) => onSelectYear(year);

  const handleMonthPicker = (month: string) => onSelectMonth(month);

  const handleQuickRanges = (range: string) => onSelectQuickRange(range);

  const containerStyle = position ? {left: 0} : {right: 0};

  return (
    <div
      className="module-container"
      ref={refDatePickerContainer}
      style={{...containerStyle}}
    >
      <SelectedDates
        startDate={startDate}
        endDate={endDate}
        isSelectingStartDate={isSelectingStartDate}
        setIsSelectingStartDate={setIsSelectingStartDate}
      />
      <div style={{display: 'flex'}}>
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

            <NextPrevButton
              direction="next"
              handleClick={handleNextMonthClick}
            />
          </div>

          <Calendar
            daysInMonth={daysInMonthDetails}
            startDate={startDate}
            endDate={endDate}
            onClickDay={onClickDay}
          />

          <div className="btn-container">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="apply-button"
              onClick={() => handleApply(startDate, endDate)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickerContainer;
