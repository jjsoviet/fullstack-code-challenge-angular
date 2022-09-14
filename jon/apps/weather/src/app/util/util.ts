import * as dayjs from 'dayjs';

import { Day } from '../models/day.model';

export const generateRunningHours = (
  initialDay: Day,
  nextDay: Day,
  interval = 3,
  count = 8
) => {
  let result = [];

  const currentHour = `${dayjs().get('hour')}:00:00`;

  const initialHours = Object.keys(initialDay.hourly);

  const remainder = initialHours
    .slice(initialHours.indexOf(currentHour), initialHours.length)
    .filter((res, index) => index % interval === interval - 1);

  result = remainder.map((key: string) => ({ [key]: initialDay.hourly[key] }));

  if (remainder.length < count) {
    const nextHours = Object.keys(nextDay.hourly);

    const additional = nextHours
      .filter((res, index) => index % interval === interval - 1)
      .slice(0, count - remainder.length);

    result = [
      ...result,
      ...additional.map((key: string) => ({ [key]: nextDay.hourly[key] })),
    ];
  }

  return result;
};
