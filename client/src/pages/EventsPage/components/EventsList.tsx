import { useEffect } from 'react';
import { useForceUpdate } from 'hooks';
import { events } from './EventsListItems';
import { EventsListItems } from '..';

function addProgressToEvents() {
  const currentDate = Date.now();
  events.forEach((event) => {
    const { date, createdAt } = event;
    const plannedDate = new Date(date).valueOf();
    const createdAtDate = new Date(createdAt).valueOf();
    const createdAtTimeframe = plannedDate - createdAtDate;
    const currentDateTimeframe = plannedDate - currentDate;
    
    const progress = 1 - currentDateTimeframe / createdAtTimeframe;
    Object.assign(event, { progress: Math.min(progress, 1) });
  });
}

export default function EventsList() {
  useEffect(() => {
    const interval = setInterval(() => {
      addProgressToEvents();
      forceUpdate();
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const forceUpdate = useForceUpdate();

  return (
    <article>
      <section>
        <h2>Live upcoming checks</h2>
        <p>
          <span>Remaining time</span>
          <i className="fas fa-user-clock"></i>
        </p>
      </section>
      <EventsListItems />
    </article>
  );
}
