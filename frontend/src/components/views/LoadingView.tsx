import React from "react";

// import icon
import { OrbitProgress } from "react-loading-indicators";

// import the CSS
import "./views.css";

export default function LoadingView() {
  return (
    <div className="loading">
      <OrbitProgress
        color="#F94D1D"
        size="large"
        text="aan het laden"
        textColor=""
      />
    </div>
  );
}
