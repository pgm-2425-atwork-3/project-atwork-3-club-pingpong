"use client";
import React, { useState, useEffect } from "react";
import useCartStore from "@/store/CartStore";
import { useRouter } from "next/navigation";
import { Order, OrderItem } from "@/types/types";
import { request } from "graphql-request";
import { getOrders, createOrder, createOrderItem } from "@/graphql/orders";

// Import the CSS
import "@/css/checkout.css";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface User {
  documentId: string;
}

interface CartProps {
  user: User;
}

export default function Cart({ user: { documentId } }: CartProps) {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);
  const products = useCartStore((state) => state.items);

  useEffect(() => {
    if (isComplete) {
      clearCart();
    }
  }, [isComplete]);

  if (isComplete) {
    setTimeout(() => {
      router.push("/");
    }, 3000);
    return (
      <div className="checkout__complete">
        <h2 className="checkout__complete-title">Bestelling geplaatst!</h2>
        <p className="checkout__complete-message">
          Bedankt voor uw bestelling. U kan uw bestelling zometeen ophalen aan
          de bar.
        </p>
        <p className="checkout__complete-message">
          U wordt zo teruggestuurd naar startpagina
        </p>
      </div>
    );
  } else {
    // handleSubmit function
    const handleSubmit = async (e: React.FormEvent) => {
      // Prevent the default form submission
      e.preventDefault();

      // Create an order
      const orderData = {
        data: {
          user_id: 1,
          paymentMethod: "Payconiq",
          total: products.reduce(
            (total, product) => total + product.unit_price * product.quantity,
            0
          ),
        },
      };

      try {
        // Send a request to create an order
        const response = await request(
          `${baseUrl}/graphql`,
          createOrder,
          orderData
        );
        console.log("Order created:", response);

        // Get the id of the created order
        const orderId = (response as { createOrder: { documentId: string } })
          .createOrder.documentId;
        console.log("Order created with id:", orderId);

        // Create order items for each product in the cart
        await Promise.all(
          products.map((product) =>
            request(`${baseUrl}/graphql`, createOrderItem, {
              data: {
                order: orderId,
                drink: product.documentId,
                quantity: product.quantity,
              },
            })
          )
        );

        // Set the state to complete
        setIsComplete(true);
        console.log("Order created successfully");
      } catch (error) {
        console.error("Error creating order:", error);
      }
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
        <button className="checkout__button" onClick={handleSubmit}>
          Checkout
        </button>
      </>
    );
  }
}
