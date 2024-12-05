"use client";
import React from "react";
import ListItem from "@/components/listItem";

export default function OrderDetail() {
  const dummyData = [
    { title: "Koffie", label: "Aantal 2" },
    { title: "Cola", label: "Aantal 1" },
    { title: "Pint", label: "Aantal 5" },
  ];
  return (
    <div className="list">
      {dummyData.map((game, index) => (
        <ListItem key={index} title={game.title} label={game.label} />
      ))}
    </div>
  );
}
