"use client";

import LoginForm from "./components/LoginForm";

export default function Login() {
    return (
        <div className="bg-main login-page flex flex-col justify-center">
            <div className="w-full">
                <img
                    className="m-auto mb-10"
                    src="./assets/logo.png"
                    alt="HSO Assenede logo"
                />
            </div>
            <div className="p-4 rounded-md">
                <LoginForm />
            </div>
        </div>
    );
}
