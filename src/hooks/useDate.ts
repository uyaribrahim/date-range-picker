import { useState } from 'react';
import {
  MS_PER_DAY,
  quicRangeUtils,
  todayTimestamp
} from '../components/DateRangePicker/quick-range-utils';
import { months } from '../constants/months';
import { currMonth, currYear } from '../constants/today';

export type DateState = {
  month: number;
  year: number;
};

const useDate = (ranges: {startDate: Date; endDate: Date}) => {
  const [date, setDate] = useState<DateState>({
    month: currMonth,
    year: currYear
  });
  const [startDate, setStartDate] = useState<number>(
    ranges.startDate.setHours(0, 0, 0, 0)
  );
  const [endDate, setEndDate] = useState<number | undefined>(
    ranges.endDate.setHours(0, 0, 0, 0)
  );
  const [selectedQuickRange, setSelectedQuickRange] = useState<string>('');

  const [isSelectingStartDate, setIsSelectingStartDate] =
    useState<boolean>(true);

  const month = date.month;
  const year = date.year;

  const onSelectQuickRange = (range: string) => {
    setSelectedQuickRange(range);

    let startTimestamp = 0,
      endTimestamp = 0;

    switch (range) {
      case 'today':
        startTimestamp = endTimestamp = todayTimestamp;
        break;
      case 'yesterday':
        startTimestamp = endTimestamp = todayTimestamp - MS_PER_DAY;
        break;
      case 'this_week':
        startTimestamp = quicRangeUtils.getStartOfWeek();
        endTimestamp = quicRangeUtils.getEndOfWeek();
        break;
      case 'last_seven_days':
        startTimestamp = quicRangeUtils.getStartOfLastSevenDays();
        endTimestamp = quicRangeUtils.getEndOfLastSevenDays();
        break;
      case 'this_month':
        startTimestamp = quicRangeUtils.getStartOfMonth();
        endTimestamp = quicRangeUtils.getEndOfMonth();
        break;
      case 'last_month':
        startTimestamp = quicRangeUtils.getStartOfLastMonth();
        endTimestamp = quicRangeUtils.getEndOfLastMonth();
        break;
      default:
        console.log(range);
        break;
    }

    setStartDate(startTimestamp);
    setEndDate(endTimestamp);
    setDate({
      month: new Date(endTimestamp).getMonth(),
      year: new Date(endTimestamp).getFullYear()
    });
  };

  const onClickPrevMonth = () => {
    let prevMonthIndex = month - 1;
    let prevYear = year;
    if (prevMonthIndex < 0) {
      prevMonthIndex = 11;
      prevYear--;
    }
    setDate({month: prevMonthIndex, year: prevYear});
  };

  const onClickNextMonth = () => {
    let nextMonthIndex = month + 1;
    let nextYear = year;
    if (nextMonthIndex > 11) {
      nextMonthIndex = 0;
      nextYear++;
    }
    setDate({month: nextMonthIndex, year: nextYear});
  };

  const onSelectYear = (year: number) => {
    setDate(prevState => ({...prevState, year: year}));
  };

  const onSelectMonth = (month: string) => {
    let index = months['en'].findIndex(el => {
      return el == month;
    });
    setDate(prevState => ({...prevState, month: index}));
  };

  const onClickDay = (timestamp: number) => {
    setSelectedQuickRange('');

    if (isSelectingStartDate) {
      setStartDate(timestamp);
      setEndDate(timestamp);
      setIsSelectingStartDate(false);
      return;
    }

    setIsSelectingStartDate(true);
    if (timestamp < startDate) {
      setEndDate(startDate);
      setStartDate(timestamp);
      return;
    }

    setEndDate(timestamp);
  };

  return {
    date,
    setDate,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onClickDay,
    selectedQuickRange,
    onSelectQuickRange,
    onClickPrevMonth,
    onClickNextMonth,
    onSelectYear,
    onSelectMonth,
    isSelectingStartDate,
    setIsSelectingStartDate
  };
};

export default useDate;
