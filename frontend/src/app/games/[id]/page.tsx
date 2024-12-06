"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGroupById } from "@/actions/getGroups";
import { getEventsByGroup } from "@/actions/getEvent";
import { Group, Event } from "@/types/types";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import ListItem from "@/components/ListItem";

export default function GroupDetail() {
    const { id } = useParams();
    const [group, setGroup] = useState<Group | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

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
            <h1 className="text-xl font-bold text-main">
                Speeldata {group.name}
            </h1>
            <h2 className="text-lg">Games in this group:</h2>
            {events.length > 0 ? (
                events.map((event) => (
                    <ListItem
                        key={event.id}
                        title={event.title}
                        label="Bekijk"
                        link={`/events/${event.documentId}`}
                    />
                ))
            ) : (
                <p>No events found for this group.</p>
            )}
        </div>
    );
}
