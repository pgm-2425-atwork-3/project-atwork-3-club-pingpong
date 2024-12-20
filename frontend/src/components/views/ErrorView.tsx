import React from "react";
import { CgDanger } from "react-icons/cg";
import "./views.css";

type ErrorViewProps = {
  text: string;
};

export default function ErrorView({ text }: ErrorViewProps) {
  return (
    <div className="notification-view">
      <CgDanger className="notification-view__icon" />
      <p className="notification-view__text">{text}</p>
    </div>
  );
}
