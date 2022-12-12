import { useRouter } from "next/router";
import {
  getEventById,
  getAllEvents,
  getEventPath,
} from "../../helpers/api-util.js";
import EventSummary from "../../components/events/event-detail/event-summary";
import EventLogistics from "../../components/events/event-detail/event-logistics";
import EvenContent from "../../components/events/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

export default function EventDetailPage(props: any) {
  const { data } = useQuery({
    queryKey: ["featuredEvents"],
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
  await queryClient.prefetchQuery(["featuredEvents"], () =>
    getEventById(eventId)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      eventId: eventId,
    },
  };
}
