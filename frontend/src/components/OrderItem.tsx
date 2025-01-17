"use client";
import React from "react";
import { Order } from "@/types/types";
import { completeOrder } from "@/graphql/orders";
import { request } from "graphql-request";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OrderItem({ order }: { order: Order }) {
  const router = useRouter();

  const handleCompleteOrder = async (documentId: string) => {
    try {
      await request(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
        completeOrder,
        {
          documentId,
          data: {
            isCompleted: true,
          },
        }
      );
      toast.success("Bestelling is afgerond");
      setTimeout(() => {
        router.push("bestellingen");
      }, 1000);
    } catch (error) {
      toast.error("Er is iets misgegaan bij het afronden van de bestelling");
      console.log(error);
    }
  };

  const createdAt = new Date(order.dateCreated).toLocaleTimeString("nl-NL");

  return (
    <div className="order-item">
      <p className="order-item__date">Geplaatst op: {createdAt}</p>
      <ul className="order-item__list">
        {order.order_items.map((item) => (
          <li key={item.documentId} className="order-item__list-item">
            <p className="order-item__quantity">{item.quantity}x</p>
            <p className="order-item__drink">{item.drink.name}</p>
          </li>
        ))}
      </ul>
      {order.paymentMethod !== "tab" && (
        <>
          <p className="order-item__payment-method">
            Betaalwijze: {order.paymentMethod}
          </p>
          <p className="order-item__total">totaalbedrag: €{order.total}</p>
          {!order.isCompleted && (
            <button
              onClick={() => handleCompleteOrder(order.documentId)}
              className="order-item__complete"
            >
              Bestelling afronden
            </button>
          )}
        </>
      )}
    </div>
  );
}
