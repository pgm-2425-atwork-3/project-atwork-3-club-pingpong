import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import "@/css/main.css";

const Roboto = localFont({
    src: "./fonts/Roboto.ttf",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const metadata = {
    title: "HNO Assenede",
    description: "HNO Assenede",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${Roboto.variable} antialiased`}>
                <Toaster position="top-center" reverseOrder={false} />
                <SiteHeader />
                {children}
                <Navigation />
            </body>
        </html>
    );
}
