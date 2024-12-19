"use client";

import React from "react";
import { usePathname } from "next/navigation";
import "@/css/header.css";

export default function Header() {
  const pathname = usePathname();
  const displayPath = pathname.slice(1);

  return (
    <header className="header">
      <h1 className="header__title">{displayPath}</h1>
    </header>
  );
}
