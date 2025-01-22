"use client";

import React, { useEffect, useState } from "react";
import { getUserForProfile } from "@/actions/getUserForProfile";
import { signOut } from "next-auth/react";
import "@/css/list-item.css";
import EditProfile from "@/components/edit/EditProfile";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const ProfilePage = () => {
    const [user, setUser] = useState<{
        username: string;
        email: string;
        user_group?: { name?: string };
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const fetchedUser = await getUserForProfile();
                setUser(fetchedUser);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
                <h1 className="text-2xl font-bold text-red-500">
                    You have no access to this page
                </h1>
                <p className="mt-2 text-gray-700">
                    If you are a member, please{" "}
                    <a href="/login" className="text-blue-500 underline">
                        login
                    </a>{" "}
                    to view this page.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50">
            <div className="w-full max-w-2xl px-4 py-8 mx-2 bg-white rounded-lg m-auto shadow-md md:px-8 lg:w-2/3">
                <div className="text-center">
                    <p className="text-2xl font-semibold text-gray-800">
                        {user.username}
                    </p>
                    <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="flex w-content flex-col items-center">
                    <div className="mt-6 ">
                        <EditProfile />
                    </div>
                    <button
                        className="px-6 py-2 mt-8 text-sm font-medium text-white bg-red-500 rounded shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                        onClick={() => signOut()}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
