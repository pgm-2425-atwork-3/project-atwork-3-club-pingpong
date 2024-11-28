import React from "react";
import Link from "next/link";
import { listItem } from "@/types/types";
import "@/css/list-item.css";

const ListItem: React.FC<listItem> = ({
  title,
  location,
  time,
  label,
  link,
}) => {
  return (
    <div className="list-item">
      {link ? (
        <Link href={link} className="list-item__link">
          <div className="list-item__link-content">
            <div className="item__content">
              <h3 className="list-item__title">{title}</h3>
              {location && (
                <p className="list-item__location">
                  <strong>Locatie:</strong> {location}
                </p>
              )}
              {time && (
                <p className="list-item__time">
                  <strong>Tijd:</strong> {time}
                </p>
              )}
            </div>
            <p className="list-item__label">{label}</p>
          </div>
        </Link>
      ) : (
        <div className="item__content">
          <h3 className="list-item__title">{title}</h3>
          {location && (
            <p className="list-item__location">
              <strong>Locatie:</strong> {location}
            </p>
          )}
          {time && (
            <p className="list-item__time">
              <strong>Tijd:</strong> {time}
            </p>
          )}
          <p className="list-item__label">{label}</p>
        </div>
      )}
    </div>
  );
};

export default ListItem;
