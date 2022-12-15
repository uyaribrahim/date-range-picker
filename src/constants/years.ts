const createYearList = () => {
  let years = [];
  for (let i = 2042; i >= 1973; i--) {
    years.push(i);
  }
  return years;
};

export const yearList = createYearList();
