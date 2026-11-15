import type { Category, Product, ProductDetail } from "./types";

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchApi<T>(path: string, seconds: number): Promise<T> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: seconds },
      });
      if (res.ok) return (await res.json()) as T;
    } catch {
      // this address failed, so try the next one
    }
  }
  throw new Error("API request failed: " + path);
}

export function getCategories() {
  return fetchApi<Category[]>("/categories", 3600);
}

export function getProducts(category?: string) {
  const path = category ? `/products?category=${category}` : "/products";
  return fetchApi<Product[]>(path, 600);
}

export function getProduct(id: number | string) {
  return fetchApi<ProductDetail>(`/products/${id}`, 600);
}
