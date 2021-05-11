export const yearahead = (value1, value2) => {
  if (typeof value1 === "string" && typeof value2 === "string") {
    var value1 = new Date(value1);
    var value2 = new Date(value2);
    var year = 365;
    var diff = (value2 - value1) / 1000;
    diff = Math.abs(Math.floor(diff));
    var days = Math.floor(diff / (24 * 60 * 60));
    return days > year;
  }
  return true;
};
