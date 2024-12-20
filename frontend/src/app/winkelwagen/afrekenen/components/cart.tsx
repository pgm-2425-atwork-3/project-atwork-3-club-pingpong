"use client";
import React, { useState, useEffect } from "react";
import useCartStore from "@/store/CartStore";
import { useRouter } from "next/navigation";

// Import GraphQL queries
import { request } from "graphql-request";
import { createOrder, createOrderItem } from "@/graphql/orders";

// import  toast and icons
import { toast } from "react-hot-toast";
import { BsCashStack } from "react-icons/bs";
import { RiBankCard2Line } from "react-icons/ri";

// Import the CSS
import "@/css/afrekennen.css";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface User {
  id: number;
  documentId: string;
}

interface CartProps {
  user: User;
}

export default function Cart({ user }: CartProps) {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const products = useCartStore((state) => state.items);

  // State for the checkout process and payment method
  const [isComplete, setIsComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  // Calculate the total price of the cart
  useEffect(() => {
    setTotal(
      products.reduce(
        (total, product) => total + product.unit_price * product.quantity,
        0
      )
    );
  }, [products]);

  useEffect(() => {
    if (isComplete) {
      clearCart();
    }
  }, [isComplete]);

  // handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent the default form submission
    e.preventDefault();

    // Check if a payment method is selected
    if (!paymentMethod) {
      toast.error("Gelieve een betaalmethode te kiezen");
      return;
    }

    // Create an order
    const orderData = {
      data: {
        user_id: user.id,
        paymentMethod: paymentMethod,
        total: total,
        dateCreated: new Date().toISOString(),
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
        products.map((product) => {
          request(`${baseUrl}/graphql`, createOrderItem, {
            data: {
              order: orderId,
              drink: product.documentId,
              quantity: product.quantity,
            },
          });
        })
      );

      // Set the state to complete
      setIsComplete(true);
      console.log("Order created successfully");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (isComplete) {
    setTimeout(() => {
      router.push("/");
    }, 3000);

    // Render the complete message
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
    // Render the cart
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
                  €{product.unit_price * product.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="checkout__summary-total">
            <span>Total:</span>
            <span>€{total}</span>
          </div>
        </div>
        <div className="checkout__payment-method">
          <h3 className="checkout__payment-method-title">
            Kies een betaalmethode:
          </h3>
          <label className="checkout__payment-method-option">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="checkout__payment-method-input"
            />
            <span className="checkout__payment-method-label">
              Contant
              <BsCashStack />
            </span>
          </label>
          <label className="checkout__payment-method-option">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="checkout__payment-method-input"
            />
            <span className="checkout__payment-method-label">
              Online betalen
              <RiBankCard2Line />
            </span>
          </label>
        </div>
        <button className="checkout__button" onClick={handleSubmit}>
          Plaats bestelling
        </button>
      </>
    );
  }
}
