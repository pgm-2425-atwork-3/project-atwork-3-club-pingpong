"use client";
import ListItem from "@/components/ListItem";
import "@/css/list-item.css";
import { getGroups } from "@/actions/getGroups";
import { Group } from "@/types/types";
import { useEffect, useState } from "react";

export default function Games() {
    const [groups, setGroups] = useState<Group[]>([]); // Initializing as an empty array

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const fetchedGroups = await getGroups(); // Fetching groups
                setGroups(fetchedGroups); // Set the fetched data directly
                console.log("Fetched groups:", fetchedGroups);
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };
        fetchGroups();
    }, []);

    return (
        <div className="list">
            <h1 className="text-xl font-bold text-main">
                Welke groep wil je bekijken?
            </h1>
            {groups.map((group) => (
                <ListItem
                    key={group.id}
                    title={group.name}
                    link={`/games/${group.documentId}`}
                    label=""
                />
            ))}
        </div>
    );
}
