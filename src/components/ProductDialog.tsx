// ProductDialog.tsx
// Propósito: Dialog de detalle de producto. Mobile: pantalla completa con imagen superior
// contenida y detalle scrollable. Desktop: layout horizontal imagen/detalle lado a lado.
import { useState } from "react";
import { ShoppingCart, Check, Star, Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Category } from "@/lib/products";

const CATEGORY_LABEL: Record<Category, string> = {
  ninas: "Niñas",
  ninos: "Niños",
  bebes: "Bebés",
};

const MOCK_SIZES: Record<Category, string[]> = {
  ninas: ["2T", "3T", "4T", "5T", "6"],
  ninos: ["2T", "3T", "4T", "5T", "6"],
  bebes: ["0-3m", "3-6m", "6-9m", "9-12m"],
};

const MOCK_DESCRIPTION =
  "Prenda de algodón orgánico suave al tacto, con diseño colorido y costuras reforzadas. Ideal para el uso diario y fácil de lavar.";

export interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
  name: string;
  price: number;
  category: Category;
}

export function ProductDialog({
  open,
  onOpenChange,
  src,
  alt,
  name,
  price,
  category,
}: ProductDialogProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const sizes = MOCK_SIZES[category];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          flex flex-col overflow-hidden p-0
          max-h-[92dvh] w-[calc(100vw-2rem)] rounded-3xl
          border border-white/50 bg-white/95 backdrop-blur-xl
          sm:max-h-[85dvh] sm:w-full sm:max-w-2xl sm:flex-row
        "
      >
        {/* ── Imagen ── */}
        {/* Mobile: max-h fija + shrink-0 evita que crezca; desktop: columna izquierda */}
        <div className="max-h-48 w-full shrink-0 overflow-hidden bg-black/5 sm:max-h-none sm:w-64 sm:self-stretch">
          <img
            src={src}
            alt={alt}
            className="h-full max-h-48 w-full object-contain sm:max-h-none sm:object-cover"
          />
        </div>

        {/* ── Detalle scrollable ── */}
        <div className="flex flex-col gap-4 overflow-y-auto p-5 sm:p-6">
          <span className="w-fit rounded-full bg-brand-pink/20 px-3 py-0.5 text-xs font-semibold text-brand-pink">
            {CATEGORY_LABEL[category]}
          </span>

          <div className="flex flex-col gap-1">
            <DialogTitle className="font-[family-name:var(--font-title)] text-xl leading-snug">
              {name}
            </DialogTitle>

            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={
                    i < 4
                      ? "fill-brand-pink text-brand-pink"
                      : "fill-black/10 text-black/10"
                  }
                />
              ))}
              <span className="ml-1.5 text-xs text-black/40">(24)</span>
            </div>
          </div>

          <p className="text-2xl font-bold text-brand-pink">
            S/ {(price * qty).toFixed(2)}
          </p>

          <DialogDescription className="text-sm leading-relaxed text-black/60">
            {MOCK_DESCRIPTION}
          </DialogDescription>

          {/* Selector de talla */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-black/50">
              Talla
            </span>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-h-[44px] min-w-[44px] rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    selectedSize === size
                      ? "border-brand-pink bg-brand-pink text-white"
                      : "border-black/15 text-black/60 hover:border-brand-pink hover:text-brand-pink"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de cantidad */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-black/50">
              Cantidad
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Restar cantidad"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-colors hover:border-brand-pink hover:text-brand-pink active:scale-95"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-base font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Sumar cantidad"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-colors hover:border-brand-pink hover:text-brand-pink active:scale-95"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Botón agregar */}
          <button
            type="button"
            onClick={handleAdd}
            className="mt-auto flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-brand-pink py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80 active:scale-95"
          >
            {added ? (
              <>
                <Check size={16} />
                ¡Agregado!
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Agregar al carrito
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
