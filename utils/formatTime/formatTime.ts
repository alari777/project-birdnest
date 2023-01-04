export function formatTime(dateTime: string): string {
  if (dateTime === '') return '';
  const date = new Date(dateTime);

  const dayUTC = date.getUTCDate();
  if (isNaN(dayUTC)) return '';
  const day: string = dayUTC < 10 ? `0${dayUTC}` : String(dayUTC);

  const monthUTC = date.getUTCMonth() + 1;
  const month: string = monthUTC < 10 ? `0${monthUTC}` : String(monthUTC);

  const year: string = String(date.getUTCFullYear());

  const hoursUTC = date.getUTCHours();
  const hours: string = hoursUTC < 10 ? `0${hoursUTC}` : String(hoursUTC);

  const minutesUTC = date.getUTCMinutes();
  const minutes: string =
    minutesUTC < 10 ? `0${minutesUTC}` : String(minutesUTC);

  const secondsUTC = date.getUTCSeconds();
  const seconds: string =
    secondsUTC < 10 ? `0${secondsUTC}` : String(secondsUTC);

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds} in UTC`;
}
