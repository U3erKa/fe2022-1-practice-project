import { Footer, Header } from 'components/general';
import { CreateEvent, EventsList } from '.';

export default function EventsPage() {
  return (
    <>
      <Header />
      <EventsList />
      <CreateEvent />
      <EventsList isPast={true} />
      <Footer />
    </>
  );
}
