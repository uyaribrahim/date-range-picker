import {today} from '../../constants/today';

export const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const todayTimestamp = today.setHours(0, 0, 0, 0);

const getTimestampOfDate = (
  year: number,
  monthIndex: number,
  date: number
): number => {
  return new Date(year, monthIndex, date).getTime();
};

export const quicRangeUtils = {
  getStartOfWeek: () => {
    return getTimestampOfDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
  },

  getEndOfWeek: () => {
    return getTimestampOfDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() + 6
    );
  },

  getStartOfLastSevenDays: () => {
    return getTimestampOfDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
  },

  getEndOfLastSevenDays: () => {
    return todayTimestamp - MS_PER_DAY;
  },

  getStartOfMonth: () => {
    return getTimestampOfDate(today.getFullYear(), today.getMonth(), 1);
  },

  getEndOfMonth: () => {
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getTime();
  },

  getStartOfLastMonth: () => {
    return getTimestampOfDate(today.getFullYear(), today.getMonth() - 1, 1);
  },

  getEndOfLastMonth: () => {
    return getTimestampOfDate(today.getFullYear(), today.getMonth(), 0);
  }
};
