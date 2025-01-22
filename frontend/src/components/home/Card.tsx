import Link from "next/link";

export default function Card({ title, description, link }) {
    return (
        <div className="bg-main rounded-lg shadow-lg p-6 mb-6 transition-shadow duration-300 transform text-foreground">
            <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
            <p className="text-base text-gray-200 mb-6">{description}</p>
            <Link
                href={link}
                className="inline-block bg-darkOrange text-white px-4 py-2 rounded-full font-medium text-sm shadow-md transition-all duration-200 hover:shadow-lg"
            >
                Visit →
            </Link>
        </div>
    );
}
