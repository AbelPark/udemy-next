import { useRouter } from "next/router";
import {
  getEventById,
  getAllEvents,
  getEventPath,
} from "../../helpers/api-util.js";
import EventSummary from "../../components/events/event-detail/event-summary";
import EventLogistics from "../../components/events/event-detail/event-logistics";
import EvenContent from "../../components/events/event-detail/event-content";
import Comments from "../../components/input/comments";
import ErrorAlert from "../../components/ui/error-alert";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head.js";

export default function EventDetailPage(props: any) {
  const { data } = useQuery({
    queryKey: ["selectedEvent"],
    queryFn: () => getEventById(props.eventId),
  });

  if (!data) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>
      <EventSummary title={data.title} />
      <EventLogistics
        date={data.date}
        address={data.location}
        image={data.image}
        imageAlt={data.title}
      />
      <EvenContent>
        <p>{data.description}</p>
      </EvenContent>
      <Comments eventId={props.eventId} />
    </>
  );
}
export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events?.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const eventId = context.params.eventId;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["selectedEvent"], () =>
    getEventById(eventId)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      eventId: eventId,
    },
  };
}