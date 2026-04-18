// ProductCard.tsx
// Propósito: Wrapper sobre <Card> de shadcn que muestra exclusivamente la imagen del producto
// con relación de aspecto cuadrada y zoom sutil al hover. Reutilizable por el catálogo.
import { Card, CardContent } from "@/components/ui/card";

export interface ProductCardProps {
  src: string;
  alt: string;
}

export function ProductCard({ src, alt }: ProductCardProps) {
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
      </CardContent>
    </Card>
  );
}
