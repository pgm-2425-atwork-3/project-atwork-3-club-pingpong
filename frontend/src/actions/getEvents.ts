import { Event } from "@/types/types";

export async function getEvents() {
    try {
        const res = await fetch("http://localhost:1337/api/events?populate=*");
        const events = await res.json();
        console.log(events.data);
        return events.data as Event[];
    } catch (error) {
        console.log(error);
        return [];
    }
}
