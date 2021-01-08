export const ListData = (data) => {
  const entries = Object.entries(data);
  const allData = [];
  entries.forEach((entry) => {
    if (entry[1]) {
      if (entry[1].turf01) {
        entry[1].turf01.forEach((item) => {
          allData.push(item);
        });
      }
      if (entry[1].turf02) {
        entry[1].turf02.forEach((item) => {
          allData.push(item);
        });
      }
      if (entry[1].turf03) {
        entry[1].turf03.forEach((item) => {
          allData.push(item);
        });
      }
    }
  });
  return allData;
};
