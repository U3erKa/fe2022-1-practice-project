import { useEffect, useState } from 'react';
import { useSelector } from 'hooks';
import type { Event as _Event } from 'types/api/event';
import styles from '../styles/EventListItems.module.sass';
import { Spinner } from 'components/general';
import { getRemainingTime } from '../../../utils/functions';

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
    if (time === '0s') {
      setProgress(1);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section key={id} className={styles.eventContainer}>
      <p className={styles.name}>{name}</p>
      <p className={styles.time}>{time}</p>
      <progress className={styles.progress} value={progress}></progress>
    </section>
  );
}

export default function EventListItems({ isPast = false }) {
  const { isFetching, events } = useSelector(({ events }) => events);

  if (isFetching) return <Spinner />;

  const currentDate = Date.now();
  const filteredEvents = events.filter(({ date }) => {
    const plannedDate = Date.parse(date);
    const timeframe = plannedDate - currentDate;
    const eventIsPast = (getRemainingTime(timeframe) === '0s') === isPast;

    return eventIsPast;
  });

  if (!filteredEvents?.length)
    return <section>No events here yet. Feel Free to create one!</section>;

  return (
    <article className={styles.container}>
      {filteredEvents.map((event) => (
        <Event key={event.id} {...event} />
      ))}
    </article>
  );
}
