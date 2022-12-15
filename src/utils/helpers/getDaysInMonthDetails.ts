import {DaysInMonthDetails} from '../../types';
import {countDaysInMonth} from './countDaysInMonth';
import {getDayDetails} from './getDayDetails';
import {getStartOfMonth} from './getStartOfMonth';

export const getDaysInMonthDetails = (year: number, month: number) => {
  let firstDay = getStartOfMonth(year, month);
  let numberOfDays = countDaysInMonth(year, month);

  // Initialize an empty array to hold the details for each day in the month
  let daysInMonth: DaysInMonthDetails[] = [];

  // Set the number of rows to 6 (this is the maximum number of rows needed to display all the days in a month)
  let rows = 6;
  // Set the number of columns to 7 (this is the number of days in a week)
  let cols = 7;

  let currentDay: DaysInMonthDetails = {
    dateNumber: 0,
    dayOfWeek: 0,
    monthStatus: 0,
    timeStamp: 0
  };
  let counter = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Get the details for the current day
      currentDay = getDayDetails({
        counter,
        numberOfDays,
        firstDay,
        year,
        month
      });

      daysInMonth.push(currentDay);

      counter++;
    }
  }

  return daysInMonth;
};
