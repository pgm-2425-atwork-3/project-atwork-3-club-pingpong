"use client";

import React, { useEffect, useState } from "react";
import { getUserForProfile } from "@/actions/getUserForProfile";
import { signOut } from "next-auth/react";

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

    if (!user) {
        return (
            <div>
                <h1>You have no access to this page</h1>
            </div>
        );
    }

    return (
        <div className="p-1">
            <p className="text-xl">{user.username}</p>
            <p>{user.email}</p>
            <button>Edit profile</button>
            <br />
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export default ProfilePage;
