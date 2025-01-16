"use client";

import React from "react";
import { usePathname } from "next/navigation";
import "./header.css";

export default function Header() {
  const pathname = usePathname();
  let displayPath = pathname.slice(1);
  console.log(displayPath)

  if (displayPath === "") {
    displayPath = "Home";
  }

  const pathParts = displayPath.split("/");
  if (pathParts.length > 1) {
    if (!isNaN(Number(pathParts[1]))) {
      displayPath = `${pathParts[0]} - ${pathParts[1]}`;
    } else {
      displayPath = pathParts[1];
    }
  }

  return (
    <header className="header">
      <h1 className="header__title">{displayPath}</h1>
    </header>
  );
}
