import { isDate, parseISO } from 'date-fns';

const reviver = (key, value) => {
  if (typeof value === 'string' || value instanceof String) {
    const date = parseISO(value);
    if (isDate(date) && date !== 'Invalid Date') {
      return date;
    }
    return value;
  }
  return value;
};

export default reviver;
