import { getProducts } from "@/actions/products";
import LinkBottom from "@/components/LinkBottom";
import { ProductCard } from "@/components/ProductCard";
import "@/css/cafetaria.css";
import { getDrinks } from "@/graphql/drinks";
import { Drink } from "@/types";
import { request } from "graphql-request";

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default async function Cafetaria() {
  async function fetchDrinks() {
    const response: { drinks: Drink[] } = await request(
      `${baseUrl}/graphql`,
      getDrinks
    );

    return response.drinks;
  }
  const drinks = await fetchDrinks();
  console.log(drinks);
  return (
    <div className="cafetaria">
      <main className="cafetaria__main">
        <h1 className="cafetaria__title">Our Products</h1>
        <div className="cafetaria__products-grid">
          {drinks.length > 0 ? (
            drinks.map((drink, index) => (
              <ProductCard key={index} drink={drink} />
            ))
          ) : (
            <p>No drinks available at the moment.</p>
          )}
        </div>
      </main>
      <LinkBottom label="Bekijk winkelmandje" url="/cart" />
    </div>
  );
}
