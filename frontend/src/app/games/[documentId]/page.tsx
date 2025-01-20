"use client";

import { useEffect, useState } from "react";
import { getEventByGroup } from "@/actions/getEvents";
import { Event } from "@/types/types";

export default function GroupDetail() {
    const [groupId, setGroupId] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        // Access the URL path directly
        const pathname = window.location.pathname;
        const parts = pathname.split("/"); // Split the URL path into segments
        const groupIdFromUrl = parts[parts.length - 1]; // The last segment will be the documentId

        console.log("Group ID from URL:", groupIdFromUrl);

        if (groupIdFromUrl) {
            setGroupId(groupIdFromUrl);
        }
    }, []); // This runs only once on component mount

    useEffect(() => {
        if (!groupId) return;

        const fetchGroupEvents = async () => {
            try {
                const fetchedEvents = await getEventByGroup(groupId);
                setEvents(fetchedEvents);
                console.log("Fetched events:", fetchedEvents);
            } catch (error) {
                console.error("Error fetching events by group:", error);
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
