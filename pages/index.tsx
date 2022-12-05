import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";

export default function HomePage() {
  return (
    <>
      <EventList items={getFeaturedEvents()} />
    </>
  );
}
