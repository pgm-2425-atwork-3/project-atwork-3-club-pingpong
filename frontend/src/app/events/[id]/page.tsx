"use client";
import { useEffect, useState } from "react";
import {
    getEventById,
    signUpForEvent,
    getEventSignUps,
} from "@/actions/getEvents";
import { Event } from "@/types/types";

export default function EventDetail({ params }: { params: { id: string } }) {
    const [event, setEvent] = useState<Event | null>(null);
    const [signUps, setSignUps] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userStatus, setUserStatus] = useState<string>("");

    const id = params.id;

    useEffect(() => {
        if (!id) return;

        const fetchDetails = async () => {
            try {
                const eventDetails = await getEventById(id);
                setEvent(eventDetails);

                const signUpsData = await getEventSignUps(id);
                setSignUps(signUpsData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching details:", error);
                setError("Failed to fetch event details or sign-ups.");
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const handleSignUp = async () => {
        if (!userStatus) {
            alert("Please select a status before signing up.");
            return;
        }

        try {
            const success = await signUpForEvent(id, userStatus);
            if (success) {
                alert(`You have successfully signed up as ${userStatus}!`);
                // Refresh sign-ups after successful registration
                const updatedSignUps = await getEventSignUps(id);
                setSignUps(updatedSignUps);
            } else {
                alert("Failed to sign up.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    if (loading) {
        return (
            <p className="text-center text-xl font-semibold">
                Loading event details...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center text-xl font-semibold text-red-500">
                {error}
            </p>
        );
    }

    if (!event) {
        return (
            <p className="text-center text-xl font-semibold">No event found.</p>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    {event.title}
                </h1>
                <p className="mt-2 text-lg text-gray-600">{event.location}</p>
                <p className="text-sm text-gray-400">
                    Date: {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <p className="mt-4 text-sm text-gray-500">
                    {event.description}
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                    Maak een keuze:
                </h2>
                <div className="mt-4 flex justify-center space-x-6">
                    <button
                        className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                            userStatus === "deelnemen"
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-gray-800"
                        } hover:bg-green-400`}
                        onClick={() => setUserStatus("deelnemen")}
                    >
                        Deelnemen
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                            userStatus === "reserve"
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-300 text-gray-800"
                        } hover:bg-yellow-400`}
                        onClick={() => setUserStatus("reserve")}
                    >
                        Reserve
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                            userStatus === "niet_deelnemen"
                                ? "bg-red-500 text-white"
                                : "bg-gray-300 text-gray-800"
                        } hover:bg-red-400`}
                        onClick={() => setUserStatus("niet_deelnemen")}
                    >
                        Niet Deelnemen
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    className="mt-6 px-8 py-3 bg-main text-white text-lg rounded-lg shadow-md hover:bg-darkOrange transition duration-300"
                    onClick={handleSignUp}
                >
                    Registreer
                </button>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                    Users Signed Up:
                </h2>
                <ul className="mt-4 space-y-2">
                    {signUps.length > 0 ? (
                        signUps.map((signUp) => (
                            <li
                                key={signUp.documentId}
                                className="flex justify-between items-center text-sm text-gray-600"
                            >
                                <span>
                                    {signUp.userId[0]?.username ||
                                        "Unknown User"}
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs ${
                                        signUp.choice === "deelnemen"
                                            ? "bg-green-200 text-green-800"
                                            : signUp.choice === "reserve"
                                            ? "bg-yellow-200 text-yellow-800"
                                            : "bg-red-200 text-red-800"
                                    }`}
                                >
                                    {signUp.choice || "No status"}
                                </span>
                            </li>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400">
                            No users have signed up yet.
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
}
