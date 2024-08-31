import moment from 'moment';

export const getDateTimeForSeconds = value => {
  let timeInSecond = value;
  hours = Math.floor(timeInSecond / 3600);
  timeInSecond %= 3600;
  minutes = Math.floor(timeInSecond / 60);
  seconds = timeInSecond % 60;
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  return moment(date).format('yyyy-MM-DD HH:mm:ss');
};
