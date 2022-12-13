import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";

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
      <Head>
        <title>All Events</title>
        <meta name="description" content="모든 이벤트 입니다." key="my" />
      </Head>
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
