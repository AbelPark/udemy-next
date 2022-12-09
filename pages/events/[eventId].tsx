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
import { useEffect, useState } from "react";

export default function EventDetailPage() {
  const [rr, setRr]: any = useState([]);

  async function kk() {
    const zz = await getAllEvents();
    setRr(zz);
    console.log(rr);
  }

  useEffect(() => {
    kk();
  }, []);

  // const router = useRouter();
  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  // if (!event) {
  //   return (
  //     <ErrorAlert>
  //       <p>No event found!</p>
  //     </ErrorAlert>
  //   );
  // }
  return (
    <>
      {/* <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EvenContent>
        <p>{event.description}</p>
      </EvenContent> */}
    </>
  );
}
// async function getPath() {
//   const paths = await getEventPath();
//   return paths;
// }

// export async function getStaticPaths() {
//   return {
//     path: await getEventPath(),
//     fallback: false,
//   };
// }

// export async function getStaticProps(context: any) {
//   console.log(context.query);
// }
