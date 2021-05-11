export const outofdate = (value1, value2) => {
  if (typeof value1 === "string" && typeof value2 === "string") {
    var value1 = new Date(value1);
    var value2 = new Date(value2);
    return value2 > value1;
  }
  return true;
};
