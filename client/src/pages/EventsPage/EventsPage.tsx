import { Footer, Header } from 'components/general';
import { useForceUpdate } from 'hooks';
import { CreateEvent, EventsList } from '.';

export default function EventsPage() {
  const forceUpdate = useForceUpdate();
  return (
    <>
      <Header />
      <EventsList />
      <CreateEvent forceUpdate={forceUpdate} />
      <EventsList isPast={true} />
      <Footer />
    </>
  );
}
