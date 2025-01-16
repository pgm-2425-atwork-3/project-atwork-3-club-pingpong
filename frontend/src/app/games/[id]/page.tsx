"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getEvents } from "@/actions/getEvents";
import { Event } from "@/types/types";

export default function GroupDetail() {
    const [events, setEvents] = useState<Event[]>([]); // Store fetched events
    const router = useRouter();
    const { groupId } = router.query; // Get groupId from the route

    useEffect(() => {
        if (!groupId) return;

        const fetchGroupEvents = async () => {
            try {
                const fetchedEvents = await getEvents(); // Fetch all events
                const filteredEvents = fetchedEvents.filter(
                    (event) => event.user_group.documentId === groupId
                ); // Filter events by groupId
                setEvents(filteredEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchGroupEvents();
    }, [groupId]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-main">Group Detail</h1>
            <div className="mt-4">
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event.documentId}
                                className="card bg-background-primary p-4 rounded shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h2 className="text-lg font-semibold text-white">
                                    {event.title}
                                </h2>
                                <p className="text-sm text-gray-300">
                                    Location: {event.location}
                                </p>
                                <p className="text-sm text-gray-300">
                                    Date:{" "}
                                    {new Date(
                                        event.eventDate
                                    ).toLocaleDateString()}
                                </p>
                                <a
                                    href={`/events/${event.documentId}`}
                                    className="text-sm text-main hover:underline mt-2 block"
                                >
                                    View Event Details
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-400 mt-4">
                        No events found for this group.
                    </p>
                )}
            </div>
        </div>
    );
}
