// ProductCard.tsx
// Propósito: Card de producto clicable. Click en la card o en el ícono de carrito
// abre ProductDialog donde el usuario selecciona talla/cantidad antes de agregar.
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProductDialog } from "@/components/ProductDialog";
import type { Category } from "@/lib/products";

export interface ProductCardProps {
  src: string;
  alt: string;
  name: string;
  price: number;
  category: Category;
}

export function ProductCard({ src, alt, name, price, category }: ProductCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDialogOpen(true);
  };

  return (
    <>
      <Card
        className="aspect-square cursor-pointer"
        onClick={() => openDialog()}
      >
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

          {/* Botón carrito — abre dialog para seleccionar talla */}
          <button
            type="button"
            onClick={(e) => openDialog(e)}
            aria-label="Ver detalles del producto"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md transition-all duration-200 hover:scale-110 active:scale-95 md:opacity-0 md:group-hover:opacity-100"
          >
            <ShoppingCart size={16} className="text-brand-pink" />
          </button>

          {/* Título + precio — parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 transition-all duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <p className="truncate text-sm font-semibold text-white drop-shadow">{name}</p>
            <p className="text-sm font-bold text-white/90 drop-shadow">S/ {price.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        src={src}
        alt={alt}
        name={name}
        price={price}
        category={category}
      />
    </>
  );
}
