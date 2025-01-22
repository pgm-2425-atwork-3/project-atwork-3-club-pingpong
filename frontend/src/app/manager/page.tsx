"use client";

import { useState, useEffect } from "react";
import { getEvents, updateEventDetails } from "../../actions/getEvents";
import { getGroups } from "../../actions/getGroups"; // Import the getGroups function

const EventsManager = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        group: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [groups, setGroups] = useState([]); // State for user groups

    useEffect(() => {
        const fetchEventsAndGroups = async () => {
            const fetchedEvents = await getEvents();
            setEvents(fetchedEvents);
            setFilteredEvents(fetchedEvents);

            const fetchedGroups = await getGroups();
            setGroups(fetchedGroups); // Set groups data
        };

        fetchEventsAndGroups();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(
                events.filter((event) =>
                    event.title.toLowerCase().includes(query)
                )
            );
        }
    };

    const handleEditClick = (event) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            group: event.user_group?.documentId || "", // Preselect group if available
        });
        setIsEditing(true);
    };

    const handleCreateClick = () => {
        setIsCreating(true);
        setFormData({ title: "", description: "", group: "" });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isEditing && selectedEvent) {
            const updatedEvent = await updateEventDetails(
                selectedEvent.documentId,
                formData
            );

            if (updatedEvent) {
                setEvents((prevEvents) =>
                    prevEvents.map((event) =>
                        event.documentId === selectedEvent.documentId
                            ? updatedEvent
                            : event
                    )
                );
                setFilteredEvents((prevEvents) =>
                    prevEvents.map((event) =>
                        event.documentId === selectedEvent.documentId
                            ? updatedEvent
                            : event
                    )
                );
                setIsEditing(false);
                setSelectedEvent(null);
            } else {
                alert("Failed to update event.");
            }
        } else if (isCreating) {
            const createdEvent = await createEvent(formData);

            if (createdEvent) {
                setEvents((prevEvents) => [createdEvent, ...prevEvents]);
                setFilteredEvents((prevEvents) => [
                    createdEvent,
                    ...prevEvents,
                ]);
                setIsCreating(false);
            } else {
                alert("Failed to create event.");
            }
        }
    };

    const createEvent = async (data) => {
        try {
            const response = await fetch(
                "http://localhost:1337/api/events?populate=*",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: {
                            title: data.title,
                            description: data.description,
                            location: data.location, // Assuming you want to include location
                            eventDate: data.eventDate, // Assuming you want to include eventDate
                            user_group: data.group || null, // Directly assign group ID, not documentId
                        },
                    }),
                }
            );

            console.log("Create event response:", response);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Failed to create event, API error:", errorText);
                throw new Error("Failed to create event.");
            }

            const newEvent = await response.json();
            console.log("New event created:", newEvent);
            return newEvent.data;
        } catch (error) {
            console.error("Error creating event:", error);
            return null;
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setIsCreating(false);
        setSelectedEvent(null);
    };

    return (
        <div className="bg-background text-foreground min-h-screen py-10 px-4 md:px-16 flex">
            {/* Create Event Sidebar */}
            {isCreating && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 flex justify-end">
                    <div className="bg-white w-1/3 p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold text-darkOrange mb-4">
                            Create Event
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:ring-main focus:border-main"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:ring-main focus:border-main"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    User Group:
                                </label>
                                <select
                                    name="group"
                                    value={formData.group}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:ring-main focus:border-main"
                                >
                                    <option value="">Select a group</option>
                                    {groups.map((group) => (
                                        <option
                                            key={group.documentId}
                                            value={group.documentId}
                                        >
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-main text-white rounded-md shadow hover:bg-darkOrange transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-8 flex-1">
                <h1 className="text-3xl font-bold text-main text-center">
                    Event Manager
                </h1>

                <div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search events..."
                        className="w-full px-4 py-2 border border-gray rounded-md shadow-sm focus:ring-main focus:border-main"
                    />
                </div>

                <div className="mb-4 text-center">
                    <button
                        onClick={handleCreateClick}
                        className="px-4 py-2 bg-main text-white rounded-md shadow hover:bg-darkOrange transition-colors"
                    >
                        Create Event
                    </button>
                </div>

                <ul className="space-y-6">
                    {filteredEvents.map((event) => (
                        <li
                            key={event.id}
                            className="p-4 border border-gray rounded-lg hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-2xl font-semibold text-darkOrange">
                                {event.title}
                            </h2>
                            <p className="text-gray mt-2">
                                {event.description}
                            </p>
                            <button
                                onClick={() => handleEditClick(event)}
                                className="mt-4 px-4 py-2 bg-main text-white rounded-md shadow hover:bg-darkOrange transition-colors"
                            >
                                Edit
                            </button>

                            {/* Show the edit form underneath the event */}
                            {isEditing && selectedEvent?.id === event.id && (
                                <div className="mt-4 p-6 bg-gray-100 rounded-lg">
                                    <h2 className="text-2xl font-semibold text-darkOrange mb-4">
                                        Edit Event
                                    </h2>
                                    <form
                                        onSubmit={handleFormSubmit}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Title:
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleFormChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:ring-main focus:border-main"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description:
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleFormChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:ring-main focus:border-main"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                User Group:
                                            </label>
                                            <select
                                                name="group"
                                                value={formData.group}
                                                onChange={handleFormChange}
                                                className="mt-1 block w-full px-3 py-2 border border-gray rounded-md shadow-sm focus:ring-main focus:border-main"
                                            >
                                                <option value="">
                                                    Select a group
                                                </option>
                                                {groups.map((group) => (
                                                    <option
                                                        key={group.documentId}
                                                        value={group.documentId}
                                                    >
                                                        {group.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex space-x-4">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-main text-white rounded-md shadow hover:bg-darkOrange transition-colors"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelEdit}
                                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventsManager;
