import React from "react";

import { Button } from "../buttons/Button";
import useCartStore from "@/store/CartStore";

interface itemProps {
  name: string;
  unit_price: number;
  quantity: number;
  documentId: string;
}

export const CartItem = (item: itemProps) => {
  const { removeFromCart, updateQty } = useCartStore((state) => state);
  return (
    <div className="cart-item">
      {/* <img
                  src={item.drink_image.url}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="cart-item__image"
                /> */}
      <div className="cart-item__details">
        <h2 className="cart-item__title">{item.name}</h2>
        <p className="cart-item__price">€{item.unit_price}</p>
        <div className="cart-item__quantity">
          <button
            onClick={() => updateQty("decrement", item.documentId)}
            className="cart-item__button"
          >
            -
          </button>
          <span className="cart-item__quantity-value">{item.quantity}</span>
          <button
            onClick={() => updateQty("increment", item.documentId)}
            className="cart-item__button"
          >
            +
          </button>
        </div>
      </div>
      <Button
        label="Verwijder"
        onClick={() => removeFromCart(item.documentId)}
        className="delete-btn"
      />
    </div>
  );
};
