import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents, getAllEvents } from "../helpers/api-util.js";

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ["featuredEvents"],
    queryFn: getFeaturedEvents,
  });

  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you"
        />
      </Head>
      <NewsletterRegistration />
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
