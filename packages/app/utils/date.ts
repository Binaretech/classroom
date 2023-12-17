import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

export function initializeDayjsPlugins() {
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
}
