import axios from "axios";

export async function getAllEvents() {
  try {
    const { data } = await axios.get(
      "https://udemy-next-63ab5-default-rtdb.firebaseio.com/events.json"
    );
    const events = [];
    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
    return events;
  } catch (e) {
    console.log(e);
  }
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventPath() {
  const allEvents = await getAllEvents();
  const data = [];
  for (const item in allEvents) {
    data.push({ params: { eventId: item.id } });
  }
  return data;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}