const dateTimeFormat = (value?: Date) => {
  const date = value ? value : new Date();

  // Extract the year, month, and day values
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if necessary
  const day = ('0' + date.getDate()).slice(-2); // Add leading zero if necessary

  // Extract the hour and minute values
  const hour = ('0' + date.getHours()).slice(-2); // Add leading zero if necessary
  const minute = ('0' + date.getMinutes()).slice(-2); // Add leading zero if necessary

  // Combine the values into a string with the desired format
  const datetime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;

  return datetime;
};

export default dateTimeFormat;
