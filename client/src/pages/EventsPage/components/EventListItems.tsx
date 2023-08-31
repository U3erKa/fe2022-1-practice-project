import { useSelector } from 'hooks';
import { Spinner } from 'components/general';
import { Event } from '..';
import styles from '../styles/EventListItems.module.sass';

export default function EventListItems({ events }) {
  const { isFetching } = useSelector(({ events }) => events);

  if (isFetching) return <Spinner />;

  if (!events?.length)
    return <section>No events here yet. Feel Free to create one!</section>;

  return (
    <article className={styles.container}>
      {events.map((event) => (
        <Event key={event.id} {...event} />
      ))}
    </article>
  );
}
