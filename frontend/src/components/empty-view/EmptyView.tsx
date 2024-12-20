import React from "react";

// import icon
import { GiShoppingCart } from "react-icons/gi";

// import the CSS
import "./empty-view.css";

export default function EmptyView({ text }: { text: string }) {
  return (
    <div className="empty-view">
      <p className="empty-view__text">{text}</p>
      <GiShoppingCart className="empty-view__icon" />
    </div>
  );
}
