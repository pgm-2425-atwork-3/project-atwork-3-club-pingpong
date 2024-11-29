"use client";

import React, { FormEvent, useActionState } from "react";
import LoginButton from "./LoginButton"; // Adjust the path as necessary
import { authenticate } from "@/lib/loginActions";

export default function LoginForm() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);

    return (
        <form action={dispatch} className="space-y-4">
            <h1 className="text-center font-bold text-xl">Sign in</h1>
            <div>
                <input
                    name="email"
                    type="email"
                    required
                    id="email"
                    className="mt-1 block w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center text-gray drop-shadow-lg"
                    placeholder="Email"
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
                />
            </div>
            {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <LoginButton />
        </form>
    );
}
