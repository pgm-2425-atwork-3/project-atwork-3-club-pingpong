import React from "react";

// import icon
import { Atom } from "react-loading-indicators";

// import the CSS
import "./views.css";

export default function LoadingView() {
  return (
    <div className="loading">
      <Atom color="#F94D1D" size="large" text="aan het laden" textColor="" />
    </div>
  );
}
