'use client'

import React, { FormEvent, useActionState } from 'react';
import LoginButton from './LoginButton'; // Adjust the path as necessary
import {authenticate} from '@/lib/loginActions';



export default function LoginForm() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);

    return (
        <form action={dispatch} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                    name="email"
                    type="email"
                    required
                    id="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                    name="password"
                    type="password"
                    required
                    id="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <LoginButton />
        </form>
    );
}


