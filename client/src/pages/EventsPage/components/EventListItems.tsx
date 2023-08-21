import { useSelector } from 'hooks';
import { Spinner } from 'components/general';
import { Event } from '..';
import { getRemainingTime } from 'utils/functions';
import styles from '../styles/EventListItems.module.sass';

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
