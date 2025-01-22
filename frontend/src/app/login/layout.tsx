import { Toaster } from "react-hot-toast";
import Navigation from "@/components/navigation/Navigation";
export default async function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="">
                    <Toaster position="top-center" reverseOrder={false} />
                    {children}
                </div>
                <Navigation />
            </body>
        </html>
    );
}
