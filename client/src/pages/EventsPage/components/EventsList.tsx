import { EventListItems } from '..';
import styles from '../styles/EventsList.module.sass';

export default function EventsList({ isPast = false }) {
  return (
    <article className={styles.container}>
      <section className={styles.headingContainer}>
        <h1 className={styles.heading}>
          {isPast ? 'Past checks' : 'Live upcoming checks'}
        </h1>
        <p className={styles.textContainer}>
          <span>Remaining time</span>
          <i className="fas fa-user-clock"></i>
        </p>
      </section>
      <EventListItems isPast={isPast} />
    </article>
  );
}
