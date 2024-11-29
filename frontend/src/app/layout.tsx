import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "react-hot-toast";

const Roboto = localFont({
    src: "./fonts/Roboto.ttf",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const metadata = {
    title: "Ecommerce App",
    description: "A simple ecommerce application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${Roboto.variable} `}>
                <Toaster position="top-center" reverseOrder={false} />
                <SiteHeader />
                {children}
            </body>
        </html>
    );
}
