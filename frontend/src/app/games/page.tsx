"use client";
import ListItem from "@/components/listItem";
import "@/css/list-item.css"

export default function Games() {
  const dummyGames = [
    {
      id: 1,
      title: "HSO Assenede vs Dilbeek",
      location: "HSO Assenede",
      time: "16:00",
      label: "Joined",
      link: "/games/game-1",
    },
    {
      id: 2,
      title: "HSO Assenede vs Dilbeek",
      location: "HSO Assenede",
      time: "16:00",
      label: "Signup",
      link: "/games/game-2",
    },
    {
      id: 3,
      title: "HSO Assenede vs Dilbeek",
      location: "HSO Assenede",
      time: "16:00",
      label: "Signup",
      link: "/games/game-3",
    },
  ];

  return (
    <div className="list">
      {dummyGames.map((game) => (
        <ListItem
          key={game.id}
          title={game.title}
          location={game.location}
          time={game.time}
          label={game.label}
          link={game.link}
        />
      ))}
    </div>
  );
}
