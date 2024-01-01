'use client';

import { useRouter } from 'next/router';
import { fork } from 'radash';
import { useForceUpdate } from 'hooks';
import { useSelector } from 'hooks';
import { CreateEvent, EventsList } from 'components/events';
import { Footer, Header } from 'components/general';
import { PAGE } from 'constants/general';
import { getRemainingTime } from 'utils/functions';

export default function EventsPage() {
  const { events, user } = useSelector(({ events, userStore }) => {
    const { data: user } = userStore;
    return { events: events.events, user };
  });
  const router = useRouter();
  const forceUpdate = useForceUpdate();

  if (!user) {
    router.replace(PAGE.HOME);
    return null;
  }

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
