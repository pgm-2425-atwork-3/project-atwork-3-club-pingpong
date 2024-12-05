"use client";
import React, { useState } from "react";
import useCartStore from "@/store/CartStore";
import { useRouter } from "next/router";
import { Order, OrderItem } from "@/types/types";
import { gql, request } from "graphql-request";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Cart() {
  // const router = useRouter();

  async function fetchOrders() {
    const query = gql`
      query Orders {
        orders {
          documentId
          paymentMethod
          user_id {
            documentId
            username
          }
          order_items {
            documentId
            quantity
            drink_id {
              name
              unit_price
              documentId
            }
          }
        }
      }
    `;
    const response: { orders: Order[] } = await request(
      `http://localhost:1337/graphql`,
      query
    );
    const orders = response.orders;
    
    return console.log(orders);
  }
  fetchOrders();

  const products = useCartStore((state) => state.items);
  console.log(products);
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Create a new order object
    const newOrder: Order = {
      user_id: 1, // Assuming the user ID is 1
      paymentMethod: "Payqonic",
      dateCreated: new Date().toISOString(),
    };
    console.log(newOrder);

    // Create a new order in the database
    // await fetch(`${baseUrl}/api/orders/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ data: newOrder }),
    // });

    // Assuming the response contains the new order ID
    // Create a new order item for each product in the cart
    products.forEach(async (product) => {
      const newOrderItem: OrderItem = {
        order_id: {
          id: id,
        },
        drink_id: {
          id: product.id,
        },
        quantity: product.quantity,
      };
      console.log(newOrderItem);

      // Create a new order item in the database
      await fetch(`${baseUrl}/api/order-items/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newOrderItem }),
      });
    });
    // router.push(`/orders/${id}`);
  };

  return (
    <div className="checkout__products">
      <form onSubmit={handleSubmit}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="checkout__product">
              <span>{product.title}</span>
              <span>{product.price}</span>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}
