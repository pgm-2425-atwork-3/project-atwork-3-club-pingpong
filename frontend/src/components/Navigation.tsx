"use client";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsCalendarFill } from "react-icons/bs";
import { BsCupHotFill } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
    const pathname = usePathname();
    const isActive = (href:string) => pathname === href;

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link href="/" className={isActive('/') ? "navigation__link active" : "navigation__link"}>
            <AiFillHome className="navigation__icon" />
            <p>Home</p>
          </Link>
        </li>
        <li className="navigation__item">
          <Link href="/games" className={isActive('/games') ? "navigation__link active" : "navigation__link"}>
            <BsCalendarFill className="navigation__icon" />
            <p>Games</p>
          </Link>
        </li>
        <li className="navigation__item">
          <Link href="/cafetaria" className={isActive('/cafetaria') ? "navigation__link active" : "navigation__link"}>
            <BsCupHotFill className="navigation__icon" />
            <p>Cafetaria</p>
          </Link>
        </li>
        <li className="navigation__item">
          <Link href="/" className={isActive('/profiel') ? "navigation__link active" : "navigation__link"}>
            <BsPersonLinesFill className="navigation__icon" />
            <p>Profiel</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
