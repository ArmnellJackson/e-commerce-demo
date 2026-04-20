// products.ts
// Propósito: Catálogo MOCK de imágenes por categoría. Centraliza las rutas
// servidas desde /public para que <Catalog/> y otras vistas las consuman sin acoplarse al filesystem.

export type Category = "ninas" | "ninos" | "bebes";

export interface Product {
  src: string;
  alt: string;
  name: string;
  price: number;
  category: Category;
}

// Generador interno: construye los paths siguiendo la convención de archivos en /public.
const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

const NAMES_NINAS = [
  "Vestido flores", "Conjunto casual", "Set verano", "Falda plisada",
  "Blusa bordada", "Pijama lunares", "Overol denim", "Jumpsuit festivo",
];
const NAMES_NINOS = [
  "Polo rayas", "Short deportivo", "Conjunto cargo", "Camisa oxford",
  "Set surf", "Pijama estrellas", "Bermuda lino", "Chaleco acolchado",
];
const NAMES_BEBES = [
  "Body algodón", "Pelele suave", "Set 3 piezas", "Mameluco polar",
  "Pijama franela", "Conjunto knit", "Body manga larga", "Set regalo",
];

export const products: Product[] = [
  ...range(8).map((i) => ({
    src: `/girl/ropaniñas${i}.jpg`,
    alt: `Conjunto de niña ${i}`,
    name: NAMES_NINAS[i - 1],
    price: parseFloat((34 + i * 2.5).toFixed(2)),
    category: "ninas" as const,
  })),
  ...range(8).map((i) => ({
    src: `/boys/RopaNiños${i}.png`,
    alt: `Conjunto de niño ${i}`,
    name: NAMES_NINOS[i - 1],
    price: parseFloat((29 + i * 2).toFixed(2)),
    category: "ninos" as const,
  })),
  ...range(8).map((i) => ({
    src: `/bebes/ropabebes${i}.jpg`,
    alt: `Conjunto de bebé ${i}`,
    name: NAMES_BEBES[i - 1],
    price: parseFloat((21 + i * 2).toFixed(2)),
    category: "bebes" as const,
  })),
];

// Filtro por categoría. 'todo' devuelve la lista completa.
export function filterByCategory(category: Category | "todo"): Product[] {
  return category === "todo" ? products : products.filter((p) => p.category === category);
}
