"use client";
import React, { useState, useEffect } from "react";
import ListItem from "@/components/listItem";
import { useParams } from "next/navigation";
import { GetOrderById } from "@/graphql/orders";
import { request } from "graphql-request";
import { Order } from "@/types/types";

// import the views
import LoadingView from "@/components/views/LoadingView";
import ErrorView from "@/components/views/ErrorView";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await request(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
          GetOrderById,
          { id }
        );

        const data = response as { order: Order };
        setOrder(data.order);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (isLoading) {
    setTimeout(() => {
      return <LoadingView />;
    }, 1000);
  }

  if (error) {
    return <ErrorView text="Er is iets fout gegaan" />;
  }

  return (
    <>
      {order ? (
        <div>
          <h1>Order</h1>
        </div>
      ) : (
        <div>Order not found</div>
      )}
    </>
  );
}
