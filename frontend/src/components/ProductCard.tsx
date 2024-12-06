"use client";
import { Drink } from "@/types/types";
import useCartStore from "@/store/CartStore";

export function ProductCard({ drink }: { drink: Drink }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="product-card">
      <img
        src={drink.drink_image.url}
        alt={drink.name}
        width={300}
        height={200}
        className="product-card__image"
      />
      <div className="product-card__content">
        <h2 className="product-card__title">{drink.name}</h2>
        <p className="product-card__price">€{drink.unit_price}</p>
        <button
          onClick={() => addToCart(drink)}
          className="product-card__button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

}
