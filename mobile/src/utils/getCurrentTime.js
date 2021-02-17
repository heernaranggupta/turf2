export const getCurrentTime = () => {
  var time = new Date();
  const date = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: false,
  });
  return date;
};
