import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
import Calendar from 'dayjs/plugin/calendar';

dayjs.extend(relativeTime);
dayjs.extend(Calendar);
dayjs.extend(updateLocale);
dayjs().calendar();

const dateFormatter = (date: string, isRelativeTime = true): string => {
  const config: {
    relativeTime?: Record<string, unknown>;
    calendar?: Record<string, unknown>;
  } = {
    relativeTime: {},
    calendar: {},
  };
  if (isRelativeTime) {
    config.relativeTime = {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    };
    delete config.calendar;
  } else {
    config.calendar = {
      lastDay: '[Yesterday,] h:mm A',
      sameDay: 'h:mm A',
      nextDay: '[Tomorrow,] h:mm A',
      lastWeek: '[last] dddd[,] h:mm A',
      nextWeek: '[Next] dddd[,] h:mm A',
      sameElse: 'D/M/YYYY',
    };
    delete config.relativeTime;
  }
  dayjs.updateLocale('en', {
    ...config,
  });

  return isRelativeTime ? dayjs(date).fromNow() : dayjs(date).calendar();
};

export default dateFormatter;