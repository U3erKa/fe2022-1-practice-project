import { fork } from 'radash';
import { useForceUpdate, useSelector } from 'hooks';
import { Footer, Header } from 'components/general';
import { CreateEvent, EventsList } from '.';
import { getRemainingTime } from 'utils/functions';

export default function EventsPage() {
  const { events } = useSelector(({ events }) => events);
  const forceUpdate = useForceUpdate();

  const currentDate = Date.now();
  const [pastEvents, upcomingEvents] = fork(events, ({ date }) => {
    const plannedDate = Date.parse(date);
    const timeframe = plannedDate - currentDate;
    const eventIsPast = getRemainingTime(timeframe) === '0s';

    return eventIsPast;
  });

  return (
    <>
      <Header />
      <EventsList events={upcomingEvents} />
      <CreateEvent forceUpdate={forceUpdate} />
      <EventsList isPast events={pastEvents} />
      <Footer />
    </>
  );
}
