import React from "react";
import LinkBottom from "@/components/LinkBottom";
import { ProductCard } from "@/components/ProductCard";
import "@/css/cafetaria.css";
import { getDrinks } from "@/graphql/drinks";
import { Drink } from "@/types/types";
import { request } from "graphql-request";
import EmptyView from "@/components/views/EmptyView";

export default async function Cafetaria() {
  async function fetchDrinks() {
    try {
      const response: { drinks: Drink[] } = await request(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
        getDrinks
      );
      return response.drinks as Drink[];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const drinks = await fetchDrinks();

  if (!drinks || drinks.length === 0) {
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
      
      {/* {cartLength > 0 && (
        <LinkBottom label="Bekijk winkelmandje" url="/winkelwagen" />
      )} */}
      <LinkBottom label="Bekijk winkelmandje" url="/winkelwagen" />
    </div>
  );
}
