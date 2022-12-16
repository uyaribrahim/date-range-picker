export const getDayClassName = (isCurrentMonth: boolean): string => {
  let className = 'day';
  className += isCurrentMonth ? ' day-of-current-month' : ' day-of-other-month';
  return className;
};

export const getClassForDayNumberWrapper = (
  isToday: boolean,
  isSelectedDate: boolean
): string => {
  let className = ' day-number-wrapper';
  className += isToday ? ' today' : '';
  className += isSelectedDate ? ' selected-day' : '';
  return className;
};

export const getClassNamesForSideElements = (
  position: 'left' | 'right',
  isValidDate: boolean
): string => {
  let isLeft = position === 'left';
  let className = ' side-elements';
  className += isLeft ? ' left-element' : '';
  className += isValidDate ? ' fill-side-element-bg' : '';
  return className;
};
