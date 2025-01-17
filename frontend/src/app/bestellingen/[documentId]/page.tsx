import React from "react";
import { GetOrderById } from "@/graphql/orders";
import { request } from "graphql-request";
import { Order } from "@/types/types";

// import the views

export default async function OrderDetail({ params }: { params: any }) {
  const documentId = (await params).documentId;
  async function fetchOrder() {
    try {
      const response = await request(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
        GetOrderById,
        { documentId }
      );

      return response as { order: Order };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  const order = await fetchOrder();
  console.log(order);

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
