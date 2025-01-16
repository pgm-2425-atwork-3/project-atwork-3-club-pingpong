"use client";
import { useEffect, useState } from "react";
import {
    getEventById,
    signUpForEvent,
    getEventSignUps,
} from "@/actions/getEvents";
import { Event } from "@/types/types";

export default function EventDetail({
    params,
}: {
    params: { documentId: string };
}) {
    const [event, setEvent] = useState<Event | null>(null);
    const [signUps, setSignUps] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userStatus, setUserStatus] = useState<string>("");

    const documentId = params.documentId;

    useEffect(() => {
        if (!documentId) return;

        const fetchDetails = async () => {
            try {
                // Fetch event details
                const eventDetails = await getEventById(documentId);
                setEvent(eventDetails);

                // Fetch event signups
                const signUpsData = await getEventSignUps(documentId);
                setSignUps(signUpsData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching details:", error);
                setError("Failed to fetch event details or sign-ups.");
                setLoading(false);
            }
        };

        fetchDetails();
    }, [documentId]); // Re-run the effect when documentId changes

    const handleSignUp = async () => {
        if (!userStatus) {
            alert("Please select a status before signing up.");
            return;
        }

        try {
            const success = await signUpForEvent(documentId, userStatus);
            if (success) {
                alert(`You have successfully signed up as ${userStatus}!`);
                // Refresh sign-ups after successful registration
                const updatedSignUps = await getEventSignUps(documentId);
                setSignUps(updatedSignUps);
            } else {
                alert("Failed to sign up.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    if (loading) {
        return <p>Loading event details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!event) {
        return <p>No event found.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-main">{event.title}</h1>
            <div className="mt-4">
                <p className="text-lg text-white">Location: {event.location}</p>
                <p className="text-sm text-gray-300">
                    Date: {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                    {event.description}
                </p>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold text-main">
                    Choose your status:
                </h2>
                <div className="flex space-x-4 mt-2">
                    <button
                        className={`p-2 rounded ${
                            userStatus === "deelnemen"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                        onClick={() => setUserStatus("deelnemen")}
                    >
                        Deelnemen
                    </button>
                    <button
                        className={`p-2 rounded ${
                            userStatus === "reserve"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                        }`}
                        onClick={() => setUserStatus("reserve")}
                    >
                        Reserve
                    </button>
                    <button
                        className={`p-2 rounded ${
                            userStatus === "niet_deelnemen"
                                ? "bg-red-500"
                                : "bg-gray-500"
                        }`}
                        onClick={() => setUserStatus("niet_deelnemen")}
                    >
                        Niet Deelnemen
                    </button>
                </div>
            </div>

            <button
                className="mt-4 bg-blue-500 text-white p-2 rounded"
                onClick={handleSignUp}
            >
                Confirm Registration
            </button>

            <div className="mt-6">
                <h2 className="text-xl font-bold text-main">
                    Users Signed Up:
                </h2>
                <ul className="list-disc pl-5">
                    {signUps.length > 0 ? (
                        signUps.map((signUp) => (
                            <li
                                key={signUp.documentId}
                                className="text-sm text-gray-300"
                            >
                                {signUp.userId[0]?.username || "Unknown User"} -{" "}
                                {signUp.choice || "No status"}
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
