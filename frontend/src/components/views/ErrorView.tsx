// import icon
import { CgDanger } from "react-icons/cg";

// import the CSS
import "./views.css";

// declare the types of the props
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
