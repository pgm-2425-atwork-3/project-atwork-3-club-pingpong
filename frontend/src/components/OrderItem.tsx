import React from "react";
import { Order } from "@/types/types";

export default function OrderItem({ order }: { order: Order }) {
  console.log(order);
  return (
    <div className="order-item">
      <p className="order-item__id">Order ID: {order.documentId}</p>
      <ul className="order-item__list">
        {order.order_items.map((item) => (
          <li key={item.documentId} className="order-item__list-item">
            <p className="order-item__item-id">Item ID: {item.documentId}</p>
            <p className="order-item__drink">Drink: {item.drink.name}</p>
            <p className="order-item__quantity">Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
      <p className="order-item__payment-method">
        Payment Method: {order.paymentMethod}
      </p>
      <p className="order-item__total">Total: {order.total}</p>
    </div>
  );
}
