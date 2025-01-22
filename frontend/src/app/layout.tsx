import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/navigation/Navigation";
import "@/css/main.css";
import Header from "@/components/header/Header";

export const metadata = {
    title: "Club Ping Pong",
    description: "Club Ping Pong",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="container">
                    <Header />
                    <Toaster position="top-center" reverseOrder={false} />
                    {children}
                </div>
                <Navigation />
            </body>
        </html>
    );
}
