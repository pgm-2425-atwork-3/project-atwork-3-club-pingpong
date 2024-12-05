"use client";
import { signIn } from "next-auth/react";
export async function authenticate(_currentState: unknown, formData: FormData) {
    try {
        const formDataObj: { [key: string]: string } = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value.toString();
        });
        console.log("Form Data being passed to signIn:", formDataObj); // Check form data

        await signIn("credentials", {
            identifier: formDataObj.email, // Set identifier as email
            password: formDataObj.password,
            callbackUrl: "/",
        });
    } catch (error) {
        if (error) {
            return "Something went wrong.";
        }
    }
}

// export async function authenticateThirdParty(method: "github" | "google") {
//     console.log("Authenticating with", method);
//     try {
//         await signIn(method, { callbackUrl: "/" });
//     } catch (error) {
//         if (error) {
//             console.error("Error:", error);
//             return "Something went wrong.";
//         }
//     }
// }
