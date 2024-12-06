import { Team } from "@/types/types";

export async function getEvents() {
    try {
        const res = await fetch("http://localhost:1337/api/events?populate=*");
        const events = await res.json();
        return events.data as Team[];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getEventsByGroup = async (documentId: string) => {
    try {
        const response = await fetch(
            `http://localhost:1337/api/events?populate=user_group`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }
        const events = await response.json();
        const filteredEvents = events.data.filter(
            (event: any) => event.user_group?.documentId === documentId
        );
        return filteredEvents;
    } catch (error) {
        console.error("Error fetching events by group:", error);
        throw error;
    }
};

export const getEventsById = async (documentId: string) => {
    try {
        const response = await fetch(
            `http://localhost:1337/api/events/${documentId}?populate=*`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch event");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
};
