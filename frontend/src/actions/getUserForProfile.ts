import { User } from "@/types/types";
import { getSession } from "next-auth/react";

export async function getUserForProfile(): Promise<User | null> {
    const session = await getSession();

    if (!session || !session.user || !session.user.id) {
        console.error("User session is invalid or missing");
        return null;
    }

    try {
        const res = await fetch(
            `http://localhost:1337/api/users/${session.user.id}?populate=*`
        );
        if (!res.ok) {
            console.error("Failed to fetch user data:", res.statusText);
            return null;
        }

        const user = await res.json();
        return user as User;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}
