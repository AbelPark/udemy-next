import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import EventList from "../components/events/event-list";
import { getFeaturedEvents, getAllEvents } from "../helpers/api-util.js";

export default function HomePage(props: any) {
  const { data } = useQuery({
    queryKey: ["featuredEvents"],
    queryFn: getFeaturedEvents,
  });

  return (
    <>
      <EventList items={data} />
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["featuredEvents"], getFeaturedEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
