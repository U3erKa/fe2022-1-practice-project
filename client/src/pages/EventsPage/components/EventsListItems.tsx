import { useEffect, useState } from 'react';
import { type initialValues } from './CreateEvent';

export const events: (typeof initialValues & {
  id: number;
  createdAt: string;
})[] = [
  {
    id: 1,
    name: 'test event 1',
    date: '2023-07-03',
    notify: 'never',
    createdAt: '2023-07-01',
  },
  {
    id: 2,
    name: 'test event 2',
    date: '2023-07-04',
    notify: '1 day before',
    createdAt: '2023-07-01',
  },
  {
    id: 3,
    name: 'test event 3',
    date: '2023-07-05',
    notify: '1 hour before',
    createdAt: '2023-07-01',
  },
  {
    id: 4,
    name: 'test event 4',
    date: '2023-07-02',
    notify: 'never',
    createdAt: '2023-07-01',
  },
];

const getDays = (time: number) => Math.floor(time / (1000 * 60 * 60 * 24));
const getHours = (time: number) => Math.floor((time / (1000 * 60 * 60)) % 24);
const getMinutes = (time: number) => Math.floor((time / (1000 * 60)) % 60);
const getSeconds = (time: number) => Math.floor((time / 1000) % 60);

const getRemainingTime = (time: number) => {
  const days = getDays(time);
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);
  const result: string[] = [];

  if (days > 0) result.push(`${days}d`);
  if (hours > 0) result.push(`${hours}h`);
  if (minutes > 0) result.push(`${minutes}m`);
  if (seconds > 0) result.push(`${seconds}s`);
  return result.join(' ') || '0s';
};

function getEventProgress({ date, createdAt }: (typeof events)[number]) {
  const currentDate = Date.now();
  const plannedDate = Date.parse(date);
  const createdAtDate = Date.parse(createdAt);
  const createdAtTimeframe = plannedDate - createdAtDate;
  const currentDateTimeframe = plannedDate - currentDate;
  const progressValue = 1 - currentDateTimeframe / createdAtTimeframe;

  const progress = Math.min(isNaN(progressValue) ? 0 : progressValue, 1);
  const time = getRemainingTime(currentDateTimeframe);
  return { progress, time };
}

const closestEventFirst = (
  { date }: (typeof events)[number],
  { date: other }: (typeof events)[number],
) => Date.parse(date) - Date.parse(other);

function Event({ id, name, date, notify, createdAt }) {
  const [time, setTime] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      const { progress, time } = getEventProgress({ date, createdAt });
      setTime(time);
      setProgress(progress);
    }, 1000);
    if (time === '0s') clearInterval(interval);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section key={id}>
      <p>{name}</p>
      <p>{date}</p>
      <p>{time}</p>
      <progress value={progress}></progress>
    </section>
  );
}

export default function EventListItems() {
  const eventsList = events
    .sort(closestEventFirst)
    .map((event) => <Event {...event} />);
  return <article>{eventsList}</article>;
}
