import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util.js";

export default function HomePage(props: any) {
  return (
    <>
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {
  const res = await getFeaturedEvents();
  return {
    props: {
      events: res,
    },
  };
}
