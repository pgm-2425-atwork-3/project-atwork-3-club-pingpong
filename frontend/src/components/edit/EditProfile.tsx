import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "../../types/types";

const EditProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        bio: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const session = await getSession();
                if (!session) throw new Error("User is not authenticated");

                const token =
                    session.accessToken || localStorage.getItem("token");
                const { id } = session.user;

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch user data: ${response.statusText}`
                    );
                }

                const data = await response.json();
                setUser(data);
                setFormData({
                    name: data.username || "",
                    email: data.email || "",
                    bio: data.bio || "",
                    password: "",
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const session = await getSession();
            if (!session) throw new Error("User is not authenticated");

            const token = session.accessToken || localStorage.getItem("token");
            const { id } = session.user;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        username: formData.name,
                        email: formData.email,
                        bio: formData.bio || undefined,
                        password: formData.password || undefined,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to update profile: ${response.statusText}`
                );
            }

            const data = await response.json();
            setUser(data);
            setIsEditModalOpen(false);
            console.log("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Edit Profile
            </button>
            {isEditModalOpen && (
                <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded">
                        <h2 className="text-lg font-semibold mb-4">
                            Edit Profile
                        </h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bio" className="block mb-1">
                                    Bio
                                </label>
                                <input
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block mb-1"
                                >
                                    Password (leave blank to keep unchanged)
                                </label>
                                <input
                                    type="password"
                                    id="password"
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

export default EditProfile;
