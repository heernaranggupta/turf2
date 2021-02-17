export const getMaxAllowedMonth = () => {
  const date = new Date();
  const newDate = new Date(date.setMonth(date.getMonth() + 1));
  return newDate;
};
