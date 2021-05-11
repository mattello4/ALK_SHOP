export const checkdate = (value1) => {
  if (typeof value1 === "string") {
    var today = new Date(new Date().toString().substring(0, 15));
    var value1 = new Date(value1);
    return today > value1;
  }
  return true;
};
