"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/types/types";
import { getOrders } from "@/graphql/orders";
import { request } from "graphql-request";
import OrderItem from "@/components/OrderItem";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const response: { orders: Order[] } = await request(
        `${baseUrl}/graphql`,
        getOrders
      );

      setOrders(response.orders);
    }

    fetchOrders();
  }, []);

  const filteredUsers = [
    ...new Set(
      orders
        .filter((order) => {
          return order.user_id.username;
        })
        .flatMap((order) => order.user_id.username)
    ),
  ];

  return (
    <div className="orders">
      {filteredUsers.map((username) => (
        <div key={username} className="orders__user">
          <h2 className="orders__username">{username}</h2>
          <ul className="orders__list">
            {orders
              .filter((order) => order.user_id.username === username)
              .map((order, index) => (
                <OrderItem key={index} order={order} />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
