export const getDateFormat = () => {
  const date = new Date();

  const tempDate = new Date(date);

  const getDate =
    tempDate.getFullYear() +
    '-' +
    (tempDate.getMonth() + 1) +
    '-' +
    tempDate.setDate(date.getDate() + 1);

  console.log(getDate);

  return getDate;
};
