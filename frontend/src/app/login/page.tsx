"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";
import { authenticate, authenticateThirdParty } from "@/lib/loginActions";

export default function Login() {
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>Login</h1>
      <div className="p-4 border border-gray-300 rounded-md">

        <LoginForm />
      </div>
    </div>
  );
};


