import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/navigation/Navigation";
import "@/css/main.css";
import { getServerSession } from "next-auth";
import Header from "@/components/header/Header";

const Roboto = localFont({
  src: "./fonts/Roboto.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

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
        <Header />
        <div className="container">
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </div>
        <Navigation />
      </body>
    </html>
  );
}
