export function getStartOfMonth(year: number, month: number) {
  let date = new Date(year, month, 1);
  let index = date.getDay();
  return index;
}
