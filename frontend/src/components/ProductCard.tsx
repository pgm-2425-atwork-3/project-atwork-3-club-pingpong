"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/types";
import useCartStore from "@/store/CartStore";

export function ProductCard({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);
    return (
        <div className="product-card">
            <div className="product-card__content">
                <h2 className="product-card__title">{product.title}</h2>
                <p className="product-card__price">{product.unit_price}</p>
                <Button
                    onClick={() => addToCart(product)}
                    className="product-card__button"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
