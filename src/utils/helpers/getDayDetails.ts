import {DayDetailProps} from '../../types';
import {countDaysInMonth} from './countDaysInMonth';

type MonthStatus = -1 | 0 | 1;

export const getDayDetails = (params: DayDetailProps) => {
  // Calculate the index of the current day in the month
  let dayIndex = params.counter - params.firstDay;

  // Calculate the day of the week (0-6) for the current day
  let dayOfWeek = params.counter % 7;
  console.log('day of week', dayOfWeek);

  // Calculate the previous month and year
  let prevMonth = params.month - 1;
  let prevYear = params.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }

  // Get the number of days in the previous month
  let prevMonthNumberOfDays = countDaysInMonth(prevYear, prevMonth);

  // Calculate the date number for the current day
  // If the day index is negative, it means the day is from the previous month
  // In this case, we add the number of days from the previous month to the day index
  // Otherwise, we use the modulo operator to wrap the date number back to 1 if it exceeds the number of days in the month
  let dateNumber =
    dayIndex < 0
      ? prevMonthNumberOfDays + dayIndex
      : dayIndex % params.numberOfDays;

  // Increment the date number to get the actual date (since it is zero-based)
  dateNumber += 1;
  // Calculate the month status for the current day
  // If the day index is negative, day is from the previous month, month status is -1
  // If the day index is greater than or equal to the number of days in the month, day is from the next month, month status is 1
  // Otherwise, month status is 0, day is from the current month
  let monthStatus: MonthStatus =
    dayIndex < 0 ? -1 : dayIndex >= params.numberOfDays ? 1 : 0;

  let date = new Date(
    params.year + '-' + (params.month + 1 + monthStatus) + '-' + dateNumber
  );
  let timestamp = new Date(date).setHours(0, 0, 0, 0);

  // Return an object with the day's details

  return {
    dateNumber,
    dayOfWeek,
    monthStatus,
    timestamp
  };
};
