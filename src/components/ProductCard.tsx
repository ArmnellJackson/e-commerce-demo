// ProductCard.tsx
// Propósito: Card de producto. Mobile: título, precio e ícono carrito siempre visibles.
// Desktop: se ocultan y reaparecen al hover junto con overlay gradiente.
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

        {/* Gradiente fondo — siempre visible mobile, hover-only desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />

        {/* Botón carrito — esquina superior derecha */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label="Agregar al carrito"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition-all duration-200 hover:scale-110 active:scale-95 md:opacity-0 md:group-hover:opacity-100"
        >
          {added ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <ShoppingCart size={16} className="text-brand-pink" />
          )}
        </button>

        {/* Título + precio — parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 transition-all duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <p className="truncate text-sm font-semibold text-white drop-shadow">{name}</p>
          <p className="text-sm font-bold text-white/90 drop-shadow">S/ {price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
