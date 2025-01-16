import { Group } from "@/types/types";

export async function getGroups() {
    try {
        const res = await fetch("http://localhost:1337/api/user-groups");
        const groups = await res.json();
        return groups.data as Group[];
    } catch (error) {
        console.log(error);
        return [];
    }
}
