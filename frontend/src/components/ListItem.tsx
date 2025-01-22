import React from "react";
import Link from "next/link";
import { listItem } from "@/types/types";
import { MdArrowForwardIos } from "react-icons/md";

const ListItem: React.FC<listItem> = ({
    title,
    location,
    time,
    label,
    link,
}) => {
    return (
        <div className="bg-main text-foreground rounded-lg shadow-lg p-6 mb-6 transition-transform duration-300 hover:shadow-xl">
            {link ? (
                <Link
                    href={link}
                    className="flex justify-between items-center group"
                >
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-white transition-colors duration-200">
                            {title}
                        </h3>
                        {location && (
                            <p className="text-base text-darkOrange mb-2">
                                <strong>Locatie:</strong> {location}
                            </p>
                        )}
                        {time && (
                            <p className="text-base text-darkOrange mb-4">
                                <strong>Tijd:</strong> {time}
                            </p>
                        )}
                    </div>
                    <p className="text-sm font-medium bg-darkOrange text-white px-4 py-2 rounded-full  group-hover:text-white transition-all duration-200">
                        {label}
                    </p>
                </Link>
            ) : (
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-semibold mb-2 text-white">
                            {title}
                        </h3>
                        {location && (
                            <p className="text-base text-gray-200 mb-2">
                                <strong>Locatie:</strong> {location}
                            </p>
                        )}
                        {time && (
                            <p className="text-base text-gray-200 mb-4">
                                <strong>Tijd:</strong> {time}
                            </p>
                        )}
                    </div>
                    {label ? (
                        <p className="text-sm font-medium bg-gray text-main px-4 py-2 rounded-full">
                            {label}
                        </p>
                    ) : (
                        <MdArrowForwardIos className="text-3xl text-white" />
                    )}
                </div>
            )}
        </div>
    );
};

export default ListItem;
