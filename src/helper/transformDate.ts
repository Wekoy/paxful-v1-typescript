const TransformDate = (date: Date) => {
  let hours: number = date.getHours();
  let minutes: number | string = date.getMinutes();
  const newFormat = hours >= 12 ? 'pm' : 'am';

  hours %= 12;
  hours = !hours ? 12 : hours;
  minutes = minutes < 10 ? `0 ${minutes}` : minutes;

  return `${hours}:${minutes} ${newFormat}`;
};

export default TransformDate;
