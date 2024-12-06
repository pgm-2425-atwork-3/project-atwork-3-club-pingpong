import { Group } from "@/types/types";

export async function getGroups() {
    try {
        const res = await fetch(
            "http://localhost:1337/api/user-groups?populate=*"
        );
        const groups = await res.json();
        console.log(groups.data);
        return groups.data as Group[];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getGroupById = async (documentId: string) => {
    try {
        const response = await fetch(
            `http://localhost:1337/api/user-groups/${documentId}?populate=*`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch group");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching group by ID:", error);
        throw error;
    }
};
