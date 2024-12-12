"use client";
import { getEventsById } from "@/actions/getEvent";
import { useEffect, useState } from "react";
import { Event } from "@/types/types";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { getUserForProfile } from "@/actions/getUserForProfile";

export default function EventDetail() {
    const { id } = useParams(); // Event ID
    const [event, setEvent] = useState<Event | null>(null);
    const [user, setUser] = useState<{
        id: string;
        username: string;
        email: string;
        user_group?: { name?: string };
    } | null>(null); // Ensure 'id' is part of the user state
    const [loading, setLoading] = useState(true);
    const [signupStatus, setSignupStatus] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id) {
            const fetchEvent = async () => {
                try {
                    const fetchedEvent = await getEventsById(id);
                    console.log("fetchedEvent", fetchedEvent.data);
                    setEvent(fetchedEvent.data);
                } catch (error) {
                    console.error("Error fetching event:", error);
                }
            };

            const loadUser = async () => {
                try {
                    const fetchedUser = await getUserForProfile();
                    setUser(fetchedUser); // Save the entire user object
                    console.log("fetchedUser", fetchedUser);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };

            setLoading(true);
            Promise.all([fetchEvent(), loadUser()]).finally(() =>
                setLoading(false)
            );
        }
    }, [id]);

    const handleSignup = async () => {
        if (!signupStatus) {
            setMessage("Please select a signup option.");
            return;
        }

        if (!user || !user.id) {
            setMessage("User information is missing. Please log in again.");
            return;
        }

        try {
            const payload = {
                data: {
                    userId: user?.id,
                    reserveOption: signupStatus,
                    joinedAt: new Date().toISOString(),
                    eventId: event?.id,
                },
            };

            console.log("Payload being sent:", payload);

            const response = await fetch(
                "http://localhost:1337/api/event-signups?populate=*",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (response.ok) {
                setMessage("Successfully signed up for the event!");
            } else {
                setMessage("Failed to sign up for the event.");
            }
        } catch (error) {
            console.error("Error signing up for event:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p>{event.description}</p>

            <div className="mt-5">
                <h2>Sign up for this event:</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="signup"
                            value="aanwezig"
                            onChange={(e) => setSignupStatus(e.target.value)}
                        />
                        Aanwezig
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="signup"
                            value="niet aanwezig"
                            onChange={(e) => setSignupStatus(e.target.value)}
                        />
                        Niet aanwezig
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="signup"
                            value="reserve"
                            onChange={(e) => setSignupStatus(e.target.value)}
                        />
                        Reserve
                    </label>
                </div>
                <button
                    className="p-2 mt-3 border rounded"
                    onClick={handleSignup}
                >
                    Submit
                </button>
                {message && <p className="mt-3">{message}</p>}
            </div>
        </div>
    );
}
