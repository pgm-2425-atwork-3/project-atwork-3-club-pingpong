"use client";

import { useRouter } from "next/navigation";

// import the state where the cart is stored
import useCartStore from "../../store/CartStore";

// import components
import { Button } from "@/components/buttons/Button";

// Import CSS
import "@/css/winkelwagen.css";
import { CartItem } from "@/components/cart-item/CartItem";

export default function Cart() {
  const router = useRouter();

  const { items } = useCartStore((state) => state);

  const subtotal = items.reduce(
    (total, item) => total += (item.unit_price * item.quantity),
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="cart">
      <main className="cart__main">
        <h1 className="cart__title">
          Uw bestelling ({items.reduce((sum, i) => sum + i.quantity, 0)})
        </h1>
        <div className="cart__content">
          <div className="cart__items">
            {items.map((item, index) => (
              <CartItem key={index} {...item} />
            ))}
          </div>
          <div className="cart__summary">
            <div className="summary">
              <h2 className="summary__title">Bestelling overzicht</h2>
              <div className="summary__item">
                <span>Subtotaal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary__item">
                <span>Tax</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="summary__total">
                <span>Totaal</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <Button
                label="Door naar betalen"
                onClick={() => router.push("/winkelwagen/afrekenen")}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
