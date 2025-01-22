"use client";

import React, { useState } from "react";
import LoginButton from "./LoginButton"; // Adjust the path as necessary
import { signIn } from "next-auth/react"; // Importing signIn directly

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        console.log("Result:", result);

        if (result?.error) {
            setErrorMessage(result.error);
            console.log("Error:", result.error);
        } else {
            console.log("Logged in successfully");
            window.location.href = "/";
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-center font-bold text-xl text-white">
                Sign in
            </h1>
            <div>
                <input
                    name="email"
                    type="email"
                    required
                    id="email"
                    className="mt-1 block w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center text-gray drop-shadow-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                    name="password"
                    type="password"
                    required
                    id="password"
                    className="mt-1 block w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center .drop-shadow-lg text-gray"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <LoginButton />
        </form>
    );
}
