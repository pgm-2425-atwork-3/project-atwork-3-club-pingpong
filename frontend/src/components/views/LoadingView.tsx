import { Atom } from "react-loading-indicators";
import "./loading-view.css";

export default function LoadingView() {
  return (
    <div className="loading">
      <Atom color="#F94D1D" size="large" text="aan het laden" textColor="" />
    </div>
  );
}
