import { Event } from "@/types/types";
import { getUserForProfile } from "./getUserForProfile"; // Import the function

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

export async function getEventByGroup(groupId: string) {
    try {
        const res = await fetch(
            `http://localhost:1337/api/events?populate=*&filters[user_group][documentId][$eq]=${groupId}`
        );
        const events = await res.json();
        console.log(events.data);
        return events.data as Event[];
    } catch (error) {
        console.error("Error fetching events by group:", error);
        return [];
    }
}

export async function getEventById(documentId: string) {
    try {
        const res = await fetch(
            `http://localhost:1337/api/events/${documentId}?populate=*`
        );
        const event = await res.json();
        console.log("Fetched event:", event.data);
        return event.data as Event;
    } catch (error) {
        console.error("Error fetching event:", error);
        return null;
    }
}

export async function signUpForEvent(
    eventId: string,
    choice: string
): Promise<boolean> {
    try {
        // Get user info
        const user = await getUserForProfile();

        if (!user) {
            console.error("User not found or not logged in.");
            return false;
        }

        const userId = user.id; // Get user ID

        // Proceed with the event signup using the obtained userId
        const res = await fetch(`http://localhost:1337/api/event-signups`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    eventId: eventId,
                    userId: userId, // Pass the userId here
                    choice: choice,
                },
            }),
        });

        if (res.ok) {
            return true;
        } else {
            throw new Error("Failed to sign up for event.");
        }
    } catch (error) {
        console.error("Error signing up:", error);
        return false;
    }
}

export async function getEventSignUps(eventDocumentId: string) {
    try {
        const url = `http://localhost:1337/api/event-signups?populate=*&filters[eventId][documentId][$eq]=${eventDocumentId}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch event signups: ${res.statusText}`);
        }

        const responseData = await res.json();
        return responseData.data || [];
    } catch (error) {
        console.error("Error fetching event signups:", error);
        return [];
    }
}
