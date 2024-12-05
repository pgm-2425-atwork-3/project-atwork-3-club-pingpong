"use client";
import { Product } from "@/types/types";
import useCartStore from "@/store/CartStore";

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="product-card">
      <img
        src={product.images[0]}
        alt={product.title}
        width={300}
        height={200}
        className="product-card__image"
      />
      <div className="product-card__content">
        <h2 className="product-card__title">{product.title}</h2>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="product-card__button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

}
