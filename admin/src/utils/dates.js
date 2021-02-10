export const getMaxMonth = () => {
  const date = new Date();
  const newDate = new Date(date.setMonth(date.getMonth() + 1));
  return newDate.toISOString().slice(0, 10);
};

export const getMinMonth = () => {
  const date = new Date();
  const newDate = new Date(date.setMonth(date.getMonth() - 1));
  return newDate.toISOString().slice(0, 10);
};
