import { useEffect, useState } from 'react';
import { getEventProgress } from 'utils/functions';
import type { CreateEventResponse } from 'types/api/event';
import styles from '../styles/EventListItems.module.sass';

export type Props = CreateEventResponse;

export default function Event({ id, name, date, createdAt }: Props) {
  const [time, setTime] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-expect-error
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
