import { Footer, Header } from 'components/general';
import { CreateEvent } from '.';

export default function EventsPage() {
  return (
    <>
      <Header />
      <h1>My Events</h1>
      <CreateEvent />
      <Footer />
    </>
  );
}
