import { Drink } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  quantity: number;
  documentId: string;
  name: string;
  unit_price: number;
  drink_image: {
    url: string;
    alternativeText: string;
  };
}

interface CartSate {
  items: CartItem[];
  addToCart: (drink: Drink) => void;
  removeFromCart: (documentId: string) => void;
  updateQty: (type: "increment" | "decrement", documentId: string) => void;
}

const useCartStore = create<CartSate>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        const existingProduct = get().items.find(
          (item) => item.documentId === product.documentId
        );
        if (existingProduct) {
          set({
            items: get().items.map((item) =>
              item.documentId === product.documentId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          toast.success("Toegevoegd aan winkelmandje");
        } else {
          set({
            items: [
              ...get().items,
              {
                quantity: 1,
                documentId: product.documentId || "",
                name: product.name,
                unit_price: Number(product.unit_price),
                drink_image: {
                  url: product.drink_image.url,
                  alternativeText: product.drink_image.alternativeText,
                },
              },
            ],
          });
          toast.success("Toegevoegd aan winkelmandje");
        }
      },
      removeFromCart: (documentId) => {
        set({
          items: get().items.filter((item) => item.documentId !== documentId),
        });
        toast.success("Verwijderd uit winkelmandje");
      },
      updateQty: (type, documentId) => {
        const item = get().items.find((item) => item.documentId === documentId);
        if (!item) {
          return;
        }
        if (item.quantity === 1 && type === "decrement") {
          get().removeFromCart(documentId);
        } else {
          set({
            items: get().items.map((item) =>
              item.documentId === documentId
                ? {
                    ...item,
                    quantity:
                      type === "decrement" ? item.quantity - 1 : item.quantity + 1,
                  }
                : item
            ),
          });
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
