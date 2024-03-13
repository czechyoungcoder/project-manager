export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}.${month}.${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return [formattedDate, formattedTime];
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};

export const combineDateTime = (dateValue, hoursValue, minutesValue) => {
  const [year, month, day] = dateValue.split("-").map(Number);

  const combinedDate = new Date(year, month - 1, day, hoursValue, minutesValue);

  const timestamp = combinedDate.getTime();

  return timestamp;
};
