export const getTomorrow = () => {
  const date = new Date();

  const oneMoreDay = new Date(date);

  const tomorrow =
    oneMoreDay.getFullYear() +
    '-' +
    (oneMoreDay.getMonth() + 1) +
    '-' +
    oneMoreDay.getDate();

  return tomorrow;
};
