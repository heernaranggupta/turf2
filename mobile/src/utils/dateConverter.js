export const dateForAPI = (date = "") => {
  // Return True if passed date is larger than current date

  let newData = "";
  if (date.length === 0) {
    newData = new Date().toDateString();
  } else {
    newData = new Date(date).toDateString();
  }
  newData = newData.split(" ");

  const MONTHS = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
  };

  return `${newData[3]}-${MONTHS[newData[1].toUpperCase()]}-${newData[2]}`;
};
