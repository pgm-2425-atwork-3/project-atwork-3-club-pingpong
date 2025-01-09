"use client";
import LinkBottom from "@/components/LinkBottom";
import { ProductCard } from "@/components/ProductCard";
import "@/css/cafetaria.css";
import { getDrinks } from "@/graphql/drinks";
import { Drink } from "@/types/types";
import { request } from "graphql-request";
import { useEffect, useState } from "react";
import useCartStore from "@/store/CartStore";
import EmptyView from "@/components/views/EmptyView";
import LoadingView from "@/components/views/LoadingView";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Cafetaria() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState("");
  const cart = useCartStore((state) => state.items);

  useEffect(() => {
    async function fetchDrinks() {
      try {
        const response: { drinks: Drink[] } = await request(
          `${baseUrl}/graphql`,
          getDrinks
        );
        setDrinks(response.drinks);
        setIsloading(false);
      } catch (error) {
        setError(error.message);
        setIsloading(false);
      }
    }

    fetchDrinks();
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }
  if (error) {
    return <EmptyView text="Er is iets fout gegaan" />;
  }

  if (!drinks) {
    return <EmptyView text="Geen dranken beschikbaar momenteel" />;
  }
  return (
    <div className="cafetaria">
      <main className="cafetaria__main">
        <div className="cafetaria__products-grid">
          {drinks.map((drink, index) => (
            <ProductCard key={index} drink={drink} />
          ))}
        </div>
      </main>
      {cart.length > 0 && (
        <LinkBottom label="Bekijk winkelmandje" url="/winkelwagen" />
      )}
    </div>
  );
}
