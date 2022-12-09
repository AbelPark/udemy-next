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
    data.push({ params: { id: item.id } });
  }
  return data;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
