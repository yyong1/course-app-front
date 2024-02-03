const TimestampFormatter = (date: Date): string => {
  const pad = (number: number) => number.toString().padStart(2, '0');

  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  const SSS = date.getMilliseconds().toString().padStart(3, '0');

  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}.${SSS}`;
};

export default TimestampFormatter;
