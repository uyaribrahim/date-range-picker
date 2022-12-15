export function countDaysInMonth(year: number, month: number) {
  // Increment the month value because it should be between 1 and 12, as it is currently between 0 and 11.
  let date = new Date(year, month + 1, 0);

  return date.getDate();
}
