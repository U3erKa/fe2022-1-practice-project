import { Footer, Header } from 'components/general';
import { CreateEvent, EventsList } from '.';

export default function EventsPage() {
  return (
    <>
      <Header />
      <h1>My Events</h1>
      <EventsList />
      <CreateEvent />
      <Footer />
    </>
  );
}
