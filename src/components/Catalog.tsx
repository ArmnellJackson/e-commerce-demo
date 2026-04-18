// Catalog.tsx
// Propósito: Grid responsivo de <ProductCard/> filtrado por categoría.
// Recibe la categoría activa desde el Shell y delega la fuente de datos a lib/products.
import { ProductCard } from "@/components/ProductCard";
import { filterByCategory, type Category } from "@/lib/products";

interface CatalogProps {
  category: Category | "todo";
}

export function Catalog({ category }: CatalogProps) {
  const items = filterByCategory(category);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Grid mobile-first: 2 cols → 3 sm → 4 lg, gap fluido */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {items.map((p) => (
          <ProductCard key={p.src} src={p.src} alt={p.alt} />
        ))}
      </div>
    </section>
  );
}
