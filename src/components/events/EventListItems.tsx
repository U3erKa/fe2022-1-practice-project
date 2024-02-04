import { useSelector } from 'hooks';
import type { GetEventsResponse } from 'api/rest/eventController';
import { Spinner } from 'components/general';
import { Event } from '.';
import styles from './styles/EventListItems.module.scss';

export type Props = {
  readonly events: GetEventsResponse;
};

const EVENTS: [] = [];

const EventListItems = ({ events = EVENTS }: Props) => {
  const isFetching = useSelector(({ events }) => events.isFetching);

  if (isFetching) return <Spinner />;

  if (!events.length)
    return <section>No events here yet. Feel Free to create one!</section>;

  return (
    <article className={styles.container}>
      {events.map((event) => (
        <Event key={event.id} {...event} />
      ))}
    </article>
  );
};

export default EventListItems;
