import { Product } from "@/types/types";

export async function getProducts() {
    try {
        const res = await fetch("http://localhost:1337/api/drinks");
        const products = await res.json();
        return products.data as Product[];
    } catch (error) {
        console.log(error);
        return [];
    }
}
