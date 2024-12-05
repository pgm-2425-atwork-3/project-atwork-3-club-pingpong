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
