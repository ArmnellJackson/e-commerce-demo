// ProductCard.tsx
// Propósito: Card de producto con overlay en hover (solo desktop): título, precio mock
// e ícono de carrito con feedback visual al agregar.
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface ProductCardProps {
  src: string;
  alt: string;
  name: string;
  price: number;
}

export function ProductCard({ src, alt, name, price }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Card className="aspect-square">
      <CardContent className="h-full w-full">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay solo desktop — fondo gradiente desde abajo */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition-opacity duration-300 md:block md:group-hover:opacity-100" />

        {/* Botón carrito — esquina superior derecha, solo desktop */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label="Agregar al carrito"
          className="absolute right-3 top-3 hidden h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition-all duration-200 hover:scale-110 active:scale-95 md:flex md:opacity-0 md:group-hover:opacity-100"
        >
          {added ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <ShoppingCart size={16} className="text-brand-pink" />
          )}
        </button>

        {/* Título + precio — parte inferior, solo desktop */}
        <div className="absolute bottom-0 left-0 right-0 hidden translate-y-1 px-3 pb-3 transition-transform duration-300 md:block md:group-hover:translate-y-0 md:opacity-0 md:group-hover:opacity-100">
          <p className="truncate text-sm font-semibold text-white drop-shadow">{name}</p>
          <p className="text-sm font-bold text-white/90 drop-shadow">S/ {price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
