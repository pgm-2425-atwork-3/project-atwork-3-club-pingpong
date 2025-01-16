"use client";
import React, { useEffect, useState } from "react";

// Import the Order type
import { Order } from "@/types/types";

// Import the GraphQL query
import { getUncompletedOrders } from "@/graphql/orders";
import { request } from "graphql-request";

// Import the OrderItem component
import OrderItem from "@/components/OrderItem";

// Import the CSS and views
import "@/css/bestellingen.css";
import EmptyView from "@/components/views/EmptyView";
import LoadingView from "@/components/views/LoadingView";
import ErrorView from "@/components/views/ErrorView";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await request(
          `${baseUrl}/graphql`,
          getUncompletedOrders,
          {
            filters: {
              isCompleted: {
                eq: false,
              },
            },
          }
        );

        const data = response as { orders: Order[] };
        setOrders(data.orders);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
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

  if (isLoading) {
    setTimeout(() => {
      return <LoadingView />;
    }, 1000);
  }

  if (error) {
    return <ErrorView text="Er is iets fout gegaan" />;
  }

  if (orders.length === 0) {
    return <EmptyView text="Geen openstaande bestellingen" />;
  }
  return (
    <div className="orders">
      {filteredUsers.map((username) => (
        <div key={username} className="orders__user">
          <h2 className="orders__username">{username}</h2>
          <hr className="orders__separator" />
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
