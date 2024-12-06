"use client";

import { get } from "http";
import useCartStore from "../../store/CartStore";
import "@/css/cart.css";
import Link from "next/link";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const { items, removeFromCart, updateQty } = useCartStore((state) => state);
  console.log(items)
  const subtotal = items.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="cart">
      <main className="cart__main">
        <h1 className="cart__title">
          Your Cart({items.reduce((sum, i) => sum + i.quantity, 0)})
        </h1>
        <div className="cart__content">
          <div className="cart__items">
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                {/* <img
                  src={item.drink_image.url}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="cart-item__image"
                /> */}
                <div className="cart-item__details">
                  <h2 className="cart-item__title">{item.name}</h2>
                  <p className="cart-item__price">€{item.unit_price}</p>
                  <div className="cart-item__quantity">
                    <button
                      onClick={() => updateQty("decrement", item.documentId)}
                      className="cart-item__button"
                    >
                      -
                    </button>
                    <span className="cart-item__quantity-value">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty("increment", item.documentId)}
                      className="cart-item__button"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.documentId)}
                  className="cart-item__remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart__summary">
            <div className="summary">
              <h2 className="summary__title">Order Summary</h2>
              <div className="summary__item">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary__item">
                <span>Tax</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="summary__total">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <Link
                href="cart/checkout"
                className="summary__checkout-button"
                onClick={() => console.log(items)}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
