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

export const compareDate = (date) => {
  var x = new Date();
  var y = new Date(date);
  return y > x ? true : false;
};

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

export const compareTime = (startTime, secondTime = "") => {
  var a = secondTime.length ? secondTime : getCurrentTime();
  var b = startTime;
  var aa1 = a.split(":");
  var aa2 = b.split(":");

  var d1 = new Date(
    parseInt("2001", 10),
    parseInt("01", 10) - 1,
    parseInt("01", 10),
    parseInt(aa1[0], 10),
    parseInt(aa1[1], 10),
    parseInt(aa1[2] || 0, 10)
  );
  var d2 = new Date(
    parseInt("2001", 10),
    parseInt("01", 10) - 1,
    parseInt("01", 10),
    parseInt(aa2[0], 10),
    parseInt(aa2[1], 10),
    parseInt(aa2[2] || 0, 10)
  );
  var dd1 = d1.valueOf();
  var dd2 = d2.valueOf();

  //  dd1 is first arg
  //  dd2 is second arg
  //   if (dd1  < dd2) {
  //     alert("b is greater");
  //   } else {
  //     alert("a is greater");
  //   }
  return dd1 < dd2 ? true : false;
};
