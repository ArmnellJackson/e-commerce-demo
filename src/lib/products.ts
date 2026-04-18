// products.ts
// Propósito: Catálogo MOCK de imágenes por categoría. Centraliza las rutas
// servidas desde /public para que <Catalog/> y otras vistas las consuman sin acoplarse al filesystem.

export type Category = "ninas" | "ninos" | "bebes";

export interface Product {
  src: string;
  alt: string;
  category: Category;
}

// Generador interno: construye los paths siguiendo la convención de archivos en /public.
const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

export const products: Product[] = [
  ...range(8).map((i) => ({
    src: `/girl/ropaniñas${i}.jpg`,
    alt: `Conjunto de niña ${i}`,
    category: "ninas" as const,
  })),
  ...range(8).map((i) => ({
    src: `/boys/RopaNiños${i}.png`,
    alt: `Conjunto de niño ${i}`,
    category: "ninos" as const,
  })),
  ...range(8).map((i) => ({
    src: `/bebes/ropabebes${i}.jpg`,
    alt: `Conjunto de bebé ${i}`,
    category: "bebes" as const,
  })),
];

// Filtro por categoría. 'todo' devuelve la lista completa.
export function filterByCategory(category: Category | "todo"): Product[] {
  return category === "todo" ? products : products.filter((p) => p.category === category);
}
