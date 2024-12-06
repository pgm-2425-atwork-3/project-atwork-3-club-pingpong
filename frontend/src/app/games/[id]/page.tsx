"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGroupById } from "@/actions/getGroups";
import { Group } from "@/types/types";

export default function GroupDetail() {
    const { id } = useParams();
    const [group, setGroup] = useState<Group | null>(null);

    useEffect(() => {
        if (id) {
            const fetchGroup = async () => {
                try {
                    const fetchedGroup = await getGroupById(id);
                    console.log("Fetched group:", fetchedGroup);
                    setGroup(fetchedGroup.data);
                } catch (error) {
                    console.error("Error fetching group:", error);
                }
            };
            fetchGroup();
        }
    }, [id]);

    if (!group) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-xl font-bold text-main">
                Speeldata {group.name}
            </h1>
        </div>
    );
}
