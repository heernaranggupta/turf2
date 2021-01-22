export const getCurrentTime = () => {
  var time = new Date();
  const date = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
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
    parseInt(aa1[2], 10)
  );
  var d2 = new Date(
    parseInt("2001", 10),
    parseInt("01", 10) - 1,
    parseInt("01", 10),
    parseInt(aa2[0], 10),
    parseInt(aa2[1], 10),
    parseInt(aa2[2], 10)
  );
  var dd1 = d1.valueOf();
  var dd2 = d2.valueOf();

  //   if (dd1 < dd2) {
  //     alert("b is greater");
  //   } else {
  //     alert("a is greater");
  //   }
  return dd1 < dd2 ? true : false;
};

export const compareDate = (date) => {
  var x = new Date();
  var y = new Date(date);
  return y.getDate() > x.getDate() ? true : false;
};
