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
                    setEvent(fetchedEvent.data);
                } catch (error) {
                    console.error("Error fetching event:", error);
                }
            };

            const loadUser = async () => {
                try {
                    const fetchedUser = await getUserForProfile();
                    setUser(fetchedUser); // Save the entire user object
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

    const checkExistingSignup = async () => {
        if (user && event) {
            try {
                const response = await fetch(
                    `http://localhost:1337/api/event-signups?filters[userId][$eq]=${user.id}&filters[eventId][$eq]=${event.id}&populate=*`
                );
                const data = await response.json();
                if (data.data && data.data.length > 0) {
                    setMessage("You have already signed up for this event.");
                } else {
                    setMessage(""); // Clear the message if not signed up
                }
            } catch (error) {
                console.error("Error checking signup:", error);
                setMessage("An error occurred. Please try again.");
            }
        }
    };

    const handleSignup = async () => {
        if (!signupStatus) {
            setMessage("Please select a signup option.");
            return;
        }

        if (!user || !user.id) {
            setMessage("User information is missing. Please log in again.");
            return;
        }

        await checkExistingSignup(); // Ensure status is checked before submitting again

        if (message === "You have already signed up for this event.") {
            return; // Prevent further submission if already signed up
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

    useEffect(() => {
        // Check if the user is already signed up whenever the user or event state changes
        checkExistingSignup();
    }, [user, event]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold text-main">
                {event.home_team.team_name} vs {event.opponent_team.team_name}
            </h1>
            <p className="text-gray">{event.description}</p>

            {message && <p className="mt-3">{message}</p>}

            <div className="mt-5">
                <h2>Kom jij mee deelnemen?</h2>

                <div>
                    <label>
                        <input
                            type="radio"
                            name="signup"
                            value="aanwezig"
                            onChange={(e) => setSignupStatus(e.target.value)}
                            className="mr-2 accent-main"
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
                            className="mr-2 accent-main"
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
                            className="mr-2 accent-main"
                        />
                        Reserve
                    </label>
                </div>
                <button
                    className="w-fit py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm text-white bg-main hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main font-bold drop-shadow-xl"
                    onClick={handleSignup}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
