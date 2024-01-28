'use client';

import { fork } from 'radash';
import { useForceUpdate } from 'hooks';
import { useSelector } from 'hooks';
import { CreateEvent, EventsList } from 'components/events';
import { Footer, Header, OnlyAuthorizedUser } from 'components/general';
import { getRemainingTime } from 'utils/functions';

export default function EventsPage() {
  const events = useSelector(({ events }) => events.events);
  const forceUpdate = useForceUpdate();

  const currentDate = Date.now();
  const [pastEvents, upcomingEvents] = fork(events, ({ date }) => {
    const plannedDate = Date.parse(date);
    const timeframe = plannedDate - currentDate;
    const eventIsPast = getRemainingTime(timeframe) === '0s';

    return eventIsPast;
  });

  return (
    <OnlyAuthorizedUser>
      <Header />
      <EventsList events={upcomingEvents} />
      <CreateEvent forceUpdate={forceUpdate} />
      <EventsList isPast events={pastEvents} />
      <Footer />
    </OnlyAuthorizedUser>
  );
}
