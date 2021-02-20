export const filterData = (receviedData) => {
  const selectedSlots = receviedData?.selectedSlots || [];

  //   const selectedSlot = {
  //     "2020-12-31": {
  //       turf01: [],
  //       turf02: [],
  //       turf03: [],
  //     },
  //   };

  let finalObj = {};
  let dateArry = [];
  selectedSlots.forEach((games) => {
    const date = games.date;
    if (finalObj[date]) {
      if (games.turfId === "turf01") {
        if (finalObj[date]["turf01"]) {
          finalObj[date]["turf01"].push(games);
        } else {
          finalObj[date]["turf01"] = [];
          finalObj[date]["turf01"].push(games);
        }
      } else if (games.turfId === "turf02") {
        if (finalObj[date]["turf02"]) {
          finalObj[date]["turf02"].push(games);
        } else {
          finalObj[date]["turf02"] = [];
          finalObj[date]["turf02"].push(games);
        }
      } else if (games.turfId === "turf03") {
        if (finalObj[date]["turf03"]) {
          finalObj[date]["turf03"].push(games);
        } else {
          finalObj[date]["turf03"] = [];
          finalObj[date]["turf03"].push(games);
        }
      }
    } else {
      dateArry.push(date);
      if (games.turfId === "turf01") {
        finalObj[date] = {
          turf01: [games],
          turf02: [],
          turf03: [],
        };
      } else if (games.turfId === "turf02") {
        finalObj[date] = {
          turf01: [],
          turf02: [games],
          turf03: [],
        };
      }
      if (games.turfId === "turf03") {
        finalObj[date] = {
          turf01: [],
          turf02: [],
          turf03: [games],
        };
      }
    }
  });
  return [finalObj, dateArry];
};
