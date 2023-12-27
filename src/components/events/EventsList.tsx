import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { EventResponse } from 'api/rest/eventController';
import { EventListItems } from '.';
import styles from './styles/EventsList.module.scss';

export type Props = {
  readonly events: EventResponse[];
  readonly isPast?: boolean;
};

export default function EventsList({ isPast = false, events }: Props) {
  return (
    <article className={styles.container}>
      <section className={styles.headingContainer}>
        <h1 className={styles.heading}>
          {isPast ? 'Past checks' : 'Live upcoming checks'}
        </h1>
        <p className={styles.textContainer}>
          <span>Remaining time</span>
          <FontAwesomeIcon className={styles.pending} icon={faClock} />
        </p>
      </section>
      <EventListItems events={events} />
    </article>
  );
}
