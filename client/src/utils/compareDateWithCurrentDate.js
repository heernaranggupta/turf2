export const compareDateWithCurrentDate = (date) => {
  // Return True if passed date is larger than current date

  var currentDate = new Date().toDateString();
  currentDate = currentDate.split(" ");

  date = new Date(date).toDateString();
  date = date.split(" ");

  const MONTHS = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12,
  };

  if (date[3] === currentDate[3]) {
    if (
      MONTHS[date[1].toUpperCase()] === MONTHS[currentDate[1].toUpperCase()]
    ) {
      if (date[2] === currentDate[2]) {
        return true;
      }
      if (date[2] > currentDate[2]) {
        return true;
      }
      if (date[2] < currentDate[2]) {
        return false;
      }
    }
    if (MONTHS[date[1].toUpperCase()] > MONTHS[currentDate[1].toUpperCase()]) {
      return true;
    }
    if (MONTHS[date[1].toUpperCase()] < MONTHS[currentDate[1].toUpperCase()]) {
      return false;
    }
  }
  if (date[3] > currentDate[3]) {
    return true;
  }
  if (date[3] < currentDate[3]) {
    return false;
  }
};
