import { Team } from "@/types/types";

export async function getTeams() {
    try {
        const res = await fetch("http://localhost:1337/api/teams");
        const teams = await res.json();
        return teams.data as Team[];
    } catch (error) {
        console.log(error);
        return [];
    }
}
