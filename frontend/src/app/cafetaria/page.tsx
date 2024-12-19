"use client";
import LinkBottom from "@/components/LinkBottom";
import { ProductCard } from "@/components/ProductCard";
import "@/css/cafetaria.css";
import { getDrinks } from "@/graphql/drinks";
import { Drink } from "@/types/types";
import { request } from "graphql-request";
import { useEffect, useState } from "react";
import useCartStore from "@/store/CartStore";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Cafetaria() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const cart = useCartStore((state) => state.items);

  useEffect(() => {
    async function fetchDrinks() {
      const response: { drinks: Drink[] } = await request(
        `${baseUrl}/graphql`,
        getDrinks
      );

      setDrinks(response.drinks);
    }

    fetchDrinks();
  });

  return (
    <div className="cafetaria">
      <main className="cafetaria__main">
        <h1 className="cafetaria__title">Onze dranken</h1>
        <div className="cafetaria__products-grid">
          {drinks.length > 0 ? (
            drinks.map((drink, index) => (
              <ProductCard key={index} drink={drink} />
            ))
          ) : (
            <p>Geen dranken beschikbaar momenteel</p>
          )}
        </div>
      </main>
      {cart.length > 0 && (
        <LinkBottom label="Bekijk winkelmandje" url="/cart" />
      )}
    </div>
  );
}
