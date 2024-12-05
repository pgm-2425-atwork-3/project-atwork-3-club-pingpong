import { getProducts } from "@/actions/products";
import LinkBottom from "@/components/LinkBottom";
import { ProductCard } from "@/components/ProductCard";
import "@/css/cafetaria.css";

export default async function Cafetaria() {
    const products = (await getProducts()) || [];
    console.log(products);
    return (
        <div className="cafetaria">
            <main className="cafetaria__main">
                <h1 className="cafetaria__title">Our Products</h1>
                <div className="cafetaria__products-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
            <LinkBottom label="Bekijk winkelmandje" url="/cart" />
        </div>
    );
}
