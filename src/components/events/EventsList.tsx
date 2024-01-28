import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { GetEventsResponse } from 'api/rest/eventController';
import { EventListItems } from '.';
import styles from './styles/EventsList.module.scss';

export type Props = {
  readonly events: GetEventsResponse;
  readonly isPast?: boolean;
};

const EventsList = ({ isPast = false, events }: Props) => (
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

export default EventsList;
