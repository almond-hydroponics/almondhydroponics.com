import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc, { parseToLocal: true });
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

export default dayjs;
