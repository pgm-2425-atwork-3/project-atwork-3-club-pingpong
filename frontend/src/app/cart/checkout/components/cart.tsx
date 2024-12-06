"use client";
import React, { useState } from "react";
import useCartStore from "@/store/CartStore";
import { useRouter } from "next/router";
import { Order, OrderItem } from "@/types/types";
import { gql, request } from "graphql-request";
import { getOrders, createOrder } from "@/graphql/orders";

// Import the CSS
import "@/css/checkout.css";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Cart({ user: { documentId } }) {
  // const router = useRouter();

  async function fetchOrders() {
    const response: { orders: Order[] } = await request(
      `${baseUrl}/graphql`,
      getOrders
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
          documentId: product.documentId,
        },
        drink_id: {
          documentId: product.documentId,
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
    <>
      <div className="checkout__summary">
        <h2 className="checkout__summary-title">Bestelling overzicht</h2>
        <div className="checkout__summary-details">
          {products.map((product, index) => (
            <div key={index} className="checkout__summary-item">
              <span className="checkout__summary-item-name">
                {product.name}
              </span>
              <span className="checkout__summary-item-quantity">
                x{product.quantity}
              </span>
              <span className="checkout__summary-item-price">
                €{product.unit_price}
              </span>
            </div>
          ))}
        </div>
        <div className="checkout__summary-total">
          <span>Total:</span>
          <span>
            €
            {products
              .reduce(
                (total, product) =>
                  total + product.unit_price * product.quantity,
                0
              )
              .toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
}
