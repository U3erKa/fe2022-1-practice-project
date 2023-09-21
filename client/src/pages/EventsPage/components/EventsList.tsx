import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { EventListItems } from '..';
import styles from '../styles/EventsList.module.sass';

export default function EventsList({ isPast = false, events }) {
  return (
    <article className={styles.container}>
      <section className={styles.headingContainer}>
        <h1 className={styles.heading}>
          {isPast ? 'Past checks' : 'Live upcoming checks'}
        </h1>
        <p className={styles.textContainer}>
          <span>Remaining time</span>
          <FontAwesomeIcon icon={faClock} className={styles.pending} />
        </p>
      </section>
      <EventListItems events={events} />
    </article>
  );
}
