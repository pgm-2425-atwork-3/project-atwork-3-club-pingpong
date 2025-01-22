"use client";
import React from "react";
import { Order } from "@/types/types";
import { completeOrder } from "@/graphql/orders";
import { request } from "graphql-request";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const TabList = ({ orders }: { orders: Order[] }) => {
  const router = useRouter();

  const handleCompleteAllOrders = async () => {
    try {
      await Promise.all(
        orders.map((order) =>
          request(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
            completeOrder,
            {
              documentId: order.documentId,
              data: {
                isPaid: true,
              },
            }
          )
        )
      );
      toast.success("Rekening gesloten");
      router.push("/bestellingen");
    } catch (error) {
      toast.error("Er is iets misgegaan bij het sluiten van de rekening");
      console.log(error);
    }
  };

  const groupedOrders = orders.reduce((acc, order) => {
    order.order_items.forEach((item) => {
      if (!acc[item.drink.name]) {
        acc[item.drink.name] = { ...item, quantity: 0 };
      }
      acc[item.drink.name].quantity += item.quantity;
    });
    return acc;
  }, {});

  const totalPrice = orders.reduce((total, order) => {
    return (
      total +
      order.order_items.reduce((orderTotal, item) => {
        return orderTotal + item.quantity * item.drink.unit_price;
      }, 0)
    );
  }, 0);

  return (
    <div className="order-item">
      {Object.keys(groupedOrders).map((drinkName) => (
        <div key={drinkName} className="order-item__list-item">
          <p className="order-item__quantity">
            {groupedOrders[drinkName].quantity}x
          </p>
          <p className="order-item__drink">{drinkName}</p>
        </div>
      ))}
      <div className="order-item__total-price">
        <p>Totaal: €{totalPrice.toFixed(2)}</p>
      </div>
      <button
        onClick={handleCompleteAllOrders}
        className="order-item__complete"
      >
        Rekening sluiten
      </button>
    </div>
  );
};

export default TabList;
