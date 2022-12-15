export function getStartOfMonth(year: number, month: number) {
  let date = new Date(year, month, 0);
  console.log(date.getDay());
  let index = date.getDay();
  return index == 0 ? 7 : index;
}
