"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/types/types";
import { getUsers } from "../../actions/getUser";
const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [editUser, setEditUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Fetch existing users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                console.log("Fetched Users:", usersData);

                if (Array.isArray(usersData)) {
                    setUsers(usersData);
                    setFilteredUsers(usersData); // Initialize filtered users
                } else {
                    console.error("Data fetched is not an array:", usersData);
                    setUsers([]);
                    setFilteredUsers([]);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setUsers([]);
                setFilteredUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Filter users by username or email
        const filtered = users.filter(
            (user) =>
                user.username.toLowerCase().includes(value) ||
                user.email.toLowerCase().includes(value)
        );
        setFilteredUsers(filtered);
    };

    // Handle input change for new user and edit form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editUser) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            setNewUser((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle user creation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            const createdUser = await response.json();
            console.log("Created User:", createdUser);

            // Update user list
            setUsers((prevUsers) => [...prevUsers, createdUser]);
            setFilteredUsers((prevUsers) => [...prevUsers, createdUser]);
            setNewUser({ username: "", email: "", password: "" }); // Reset form
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    // Handle edit functionality
    const handleEditClick = (user: User) => {
        setEditUser(user);
        setFormData({
            username: user.username || "",
            email: user.email || "",
            password: "",
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editUser) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${editUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password || undefined,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const updatedUser = await response.json();
            console.log("Updated User:", updatedUser);

            // Update users list
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editUser.id ? updatedUser : user
                )
            );
            setFilteredUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editUser.id ? updatedUser : user
                )
            );
            setIsEditModalOpen(false);
            setEditUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Search by username or email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold">Create New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
                    >
                        Create User
                    </button>
                </form>
            </div>

            {/* Display Users */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {filteredUsers.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <div className="space-y-4">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="p-4 border border-gray-300 rounded-lg"
                            >
                                <h2 className="text-xl font-semibold">
                                    {user.username}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Email: {user.email}
                                </p>
                                <button
                                    onClick={() => handleEditClick(user)}
                                    className="mt-2 text-blue-500"
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded">
                        <h2 className="text-lg font-semibold mb-4">
                            Edit User
                        </h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
