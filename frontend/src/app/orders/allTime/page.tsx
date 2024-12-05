"use client";
import React from "react";
import ListItem from "@/components/listItem";


export default function Orders() {
    const items = [
        { title: "Selena Gomez", label: "view", link: "orders/1" },
        { title: "Bob Marley", label: "view", link: "orders/2" },
        { title: "Jean Claude", label: "view", link: "orders/3" },
    ];

    return (
        <div>
            <h1>Kassa</h1>
            <p>Alltime kassa</p>
            <ul>
                {items.map((item, index) => (
                    <ListItem key={index} title={item.title} label={item.label} link={item.link} />
                ))}
            </ul>
        </div>
    );
}