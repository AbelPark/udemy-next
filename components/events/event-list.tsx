import EventItem from "./event-item";
import classes from "./event-list.module.css";

export default function EventList(props: any) {
  const { items } = props;
  return (
    items && (
      <ul className={classes.list}>
        {items.map((event: any, idx: number) => (
          <EventItem
            key={idx}
            title={event.title}
            image={event.image}
            date={event.date}
            id={event.id}
            location={event.location}
          />
        ))}
      </ul>
    )
  );
}
