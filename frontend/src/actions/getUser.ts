import { User } from "@/types/types";

export async function getUser() {
    try {
        const res = await fetch("http://localhost:1337/api/users");
        const users = await res.json();
        return users.data as User[];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getUsers() {
    try {
        const res = await fetch("http://localhost:1337/api/users?populate=*");

        if (!res.ok) {
            throw new Error(`Failed to fetch users, status: ${res.status}`);
        }

        const users = await res.json();

        return Array.isArray(users) ? users : [];
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
