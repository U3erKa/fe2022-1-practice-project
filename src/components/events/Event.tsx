import { useEffect, useState } from 'react';
import type { EventResponse } from 'api/rest/eventController';
import { getEventProgress } from 'utils/functions';
import styles from './styles/EventListItems.module.scss';

export default function Event({ id, name, date, createdAt }: EventResponse) {
  const [time, setTime] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-expect-error
      const { progress, time } = getEventProgress({ createdAt, date });
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
    <section className={styles.eventContainer} key={id}>
      <p className={styles.name}>{name}</p>
      <p className={styles.time}>{time}</p>
      <progress className={styles.progress} value={progress} />
    </section>
  );
}
