import React from "react";
import "./button.css";

interface ButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} className={`main-btn ${props.className}`}>
      {props.label}
    </button>
  );
};
