"use client";
import "@/css/list-item.css";
import { getGroups } from "@/actions/getGroups";
import { Group } from "@/types/types";
import { useEffect, useState } from "react";

export default function Games() {
    const [groups, setGroups] = useState<Group[]>([]);
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const fetchedGroups = await getGroups();
                setGroups(fetchedGroups);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {groups.map((group) => (
                    <div
                        key={group.id}
                        className="card bg-main p-4 rounded shadow-md hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-lg font-semibold text-white">
                            {group.name}
                        </h2>
                        <a
                            href={`/games/${group.id}`}
                            className="text-sm text-white hover:underline mt-2 block"
                        >
                            Bekijk groep
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
