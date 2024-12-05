"use client";
import { SessionProvider } from "next-auth/react";

const SessionProviderWrapper = ({
    children,
    session,
}: {
    children: React.ReactNode;
    session?: any; // Type this according to your session type
}) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
