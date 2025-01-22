import Image from "next/image";
import Card from "../components/home/Card";

export default function Home() {
    return (
        <div>
            <main>
                <div className="flex-col gap-5">
                    <Card
                        title="Cafeteria"
                        description="Visit the cafeteria for food and drinks."
                        link="/cafetaria"
                    />
                    <Card
                        title="Profile"
                        description="Manage your profile and settings."
                        link="/profile"
                    />
                    <Card
                        title="Games"
                        description="Explore fun games to play."
                        link="/games"
                    />
                    <Card
                        title="Login"
                        description="Login if you have an account"
                        link="/login"
                    />
                </div>
            </main>
        </div>
    );
}
