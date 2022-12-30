import React, {FC} from 'react';
import {months} from '../../../constants/months';
import {yearList} from '../../../constants/years';

interface IMonthAndYearPickersProps {
  month: number;
  year: number;
  handleMonthPicker: (value: string) => void;
  handleYearPicker: (value: number) => void;
}
const MonthAndYearPickers: FC<IMonthAndYearPickersProps> = ({
  month,
  year,
  handleMonthPicker,
  handleYearPicker
}) => {
  return (
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
  );
};

export default MonthAndYearPickers;
