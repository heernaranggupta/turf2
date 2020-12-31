export const convertMinsToHrsMins = (minutes) => {
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return h + ":" + m + " HOURS";
};

export const getMaxAllowedMonth = (setMaxAllowedDate) => {
  const date = new Date();
  const newDate = new Date(date.setMonth(date.getMonth() + 1));
  setMaxAllowedDate(newDate.toISOString().slice(0, 10));
};
