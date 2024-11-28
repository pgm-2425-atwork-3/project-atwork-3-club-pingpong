// app/login/page.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/app/components/RegisterForm";
import { authenticate, authenticateThirdParty } from "@/lib/loginActions";

export default function Login() {
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>Register</h1>
      <div className="p-4 border border-gray-300 rounded-md">
        <RegisterForm />
      </div>
    </div>
  );
}
