"use client";
import { getEventsById } from "@/actions/getEvent";
import { useEffect, useState } from "react";
import { Event } from "@/types/types";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
export default function EventDetail() {
    const { id } = useParams();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (id) {
            const fetchEvents = async () => {
                try {
                    const fetchedEvents = await getEventsById(id);
                    console.log(fetchedEvents.data);
                    setEvents(fetchedEvents.data);
                } catch (error) {
                    console.error("Error fetching event:", error);
                }
            };
            fetchEvents();
        }
    }, [id]);

    if (!events) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h1>{events.title}</h1>
            <p>{events.description}</p>
        </div>
    );
}
