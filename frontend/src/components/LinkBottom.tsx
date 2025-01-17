"use client";
import React from "react";
import useCartStore from "@/store/CartStore";

interface LinkBottomProps {
  label: string;
  url: string;
}

export default function LinkBottom({ label, url }: LinkBottomProps) {
  const cart = useCartStore((state) => state.items);
  console.log(cart);
  if (cart.length === 0) {
    return null;
  }
  return (
    <a className="link-bottom" href={url}>
      {label}
    </a>
  );
}
