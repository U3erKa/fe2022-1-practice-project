import { useEffect, useState } from 'react';
import { getEventProgress } from 'utils/functions';
import styles from '../styles/EventListItems.module.sass';

export default function Event({ id, name, date, notify, createdAt }) {
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
