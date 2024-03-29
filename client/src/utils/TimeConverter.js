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

export function tConvert(time) {
  if (time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }

    var newTime = "";
    time.forEach((item, index) => {
      if (index !== 3) {
        newTime = newTime + item;
      }
    });
    return newTime; // return adjusted time or original string
  }
}

export const convertDate = (data) => {
  if (data) {
    var date = data;
    var dateArr = date.split("-");
    return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
  }
};
