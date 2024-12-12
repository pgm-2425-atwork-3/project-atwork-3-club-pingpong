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
                console.log(fetchedUser);
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
            <div>
                <h1>You have no access to this page</h1>
                <p>
                    If you are a member please <a href="/login">login</a> to
                    view this page
                </p>
            </div>
        );
    }

    const userGroupName = user.user_group?.name || "No group assigned";

    return (
        <div className="p-1 flex flex-col items-center w-1/3 m-auto">
            <div className="mt-5 mb-5 text-center">
                <p className="text-xl font-bold">{user.username}</p>
                <p>{user.email}</p>
                <p>{userGroupName}</p>
            </div>
            <EditProfile />
            <button
                className="p-2 border-main border rounded w-fit mt-5"
                onClick={() => signOut()}
            >
                Sign out
            </button>
        </div>
    );
};

export default ProfilePage;
