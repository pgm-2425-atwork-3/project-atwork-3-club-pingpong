"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGroupById } from "@/actions/getGroups";
import { getEventsByGroup } from "@/actions/getEvents";
import { Group, Event } from "@/types/types";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import ListItem from "@/components/ListItem";

export default function GroupDetail() {
    const { id } = useParams();
    const [group, setGroup] = useState<Group | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    // Helper function to format the date
    const formatEventDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", options)
            .format(date)
            .replace(",", " |");
    };

    useEffect(() => {
        if (id) {
            const fetchGroupAndEvents = async () => {
                try {
                    const fetchedGroup = await getGroupById(id);
                    const fetchedEvents = await getEventsByGroup(id);
                    setGroup(fetchedGroup.data);
                    setEvents(fetchedEvents);
                } catch (error) {
                    console.error("Error fetching group and events:", error);
                }
            };
            fetchGroupAndEvents();
        }
    }, [id]);

    if (!group) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-5">
            <h1 className="text-4xl mb-10 font-bold text-main">{group.name}</h1>
            {events.length > 0 ? (
                events.map((event) => (
                    <ListItem
                        key={event.id}
                        title={event.title}
                        label="Bekijk"
                        link={`/events/${event.documentId}`}
                        location={event.location}
                        time={formatEventDate(event.eventDate)}
                    />
                ))
            ) : (
                <p>No events found for this group.</p>
            )}
        </div>
    );
}
