import { EventListItems } from '..';


export default function EventsList() {
  return (
    <article>
      <section>
        <h2>Live upcoming checks</h2>
        <p>
          <span>Remaining time</span>
          <i className="fas fa-user-clock"></i>
        </p>
      </section>
      <EventListItems />
    </article>
  );
}
