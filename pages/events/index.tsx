import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

export default function AllEventsPage() {
  const { data } = useQuery({
    queryKey: ["allEvents"],
    queryFn: getAllEvents,
  });

  const router = useRouter();

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={data} />
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["allEvents"], getAllEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
