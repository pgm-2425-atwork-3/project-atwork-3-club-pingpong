"use client";

import React, { useEffect, useState } from "react";
import { getUserForProfile } from "@/actions/getUserForProfile";
import { signOut } from "next-auth/react";
import EditButton from "@/components/buttons/EditButton";
import "@/css/list-item.css";
import EditProfile from "@/components/edit/EditProfile";

const ProfilePage = () => {
    const [user, setUser] = useState<{
        username: string;
        email: string;
    } | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const fetchedUser = await getUserForProfile();
            setUser(fetchedUser);
        };
        loadUser();
    }, []);

    console.log("User:", user);

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

    return (
        <div className="p-1 flex flex-col items-center w-1/3 m-auto ">
            <p className="text-xl">{user.username}</p>
            <p>{user.email}</p>
            <p>{user.user_group.name}</p>
            <EditProfile />
            <button
                className="p-2 border-gray border rounded w-fit"
                onClick={() => signOut()}
            >
                Sign out
            </button>
        </div>
    );
};

export default ProfilePage;
