import React from "react";

// import icon
import { GiShoppingCart } from "react-icons/gi";

// import the CSS
import "./views.css";

// declare the types of the props
interface EmptyViewProps {
  text: string;
}

export default function EmptyView({ text }: EmptyViewProps) {
  return (
    <div className="notification-view">
      <p className="notification-view__text">{text}</p>
      <GiShoppingCart className="notification-view__icon" />
    </div>
  );
}
