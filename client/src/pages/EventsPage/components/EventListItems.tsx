import { useEffect, useState } from 'react';
import styles from '../styles/EventListItems.module.sass';
import type { Event as _Event } from 'types/api/event';
import { useDispatch, useSelector } from 'hooks';
import { getEvents } from 'store/slices/eventSlice';

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

function getEventProgress({ date, createdAt }: _Event) {
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const events = useSelector(({ events }) => events.events);

  if (!events?.length)
    return <section>No events here yet. Feel Free to create one!</section>;

  return (
    <article>
      {events.map((event) => (
        <Event key={event.id} {...event} />
      ))}
    </article>
  );
}
