// CartSheet.tsx
// Propósito: Panel lateral (Sheet) del carrito de compras. Se desliza desde la derecha.
// Controlado externamente con props open/onOpenChange.
// Muestra lista de productos, cantidades, total y botón de pago.
import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Datos mock iniciales del carrito
const INITIAL_ITEMS: CartItem[] = [
  { id: 1, name: "Vestido flores niña",   price: 45.9, qty: 1, image: "/girl/ropaniñas1.jpg" },
  { id: 2, name: "Conjunto bebé celeste", price: 32.5, qty: 2, image: "/bebes/ropabebes1.jpg" },
];

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

  // Incrementa/decrementa cantidad; elimina si llega a 0
  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="flex w-full max-w-sm flex-col border-l border-white/50 bg-white/90 backdrop-blur-xl p-0"
      >
        <SheetHeader className="border-b border-black/5 px-6 py-4">
          <SheetTitle className="font-[family-name:var(--font-title)] flex items-center gap-2 text-lg">
            <ShoppingCart size={20} className="text-brand-pink" />
            mi carrito
          </SheetTitle>
        </SheetHeader>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-black/40">
              <ShoppingCart size={48} strokeWidth={1} />
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  {/* Imagen del producto */}
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-black/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Nombre + controles */}
                  <div className="flex flex-1 flex-col gap-1.5">
                    <span className="text-sm font-medium leading-tight">{item.name}</span>
                    <span className="text-xs text-brand-pink font-semibold">
                      S/ {(item.price * item.qty).toFixed(2)}
                    </span>
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5"
                        aria-label="Restar"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-4 text-center text-sm">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5"
                        aria-label="Sumar"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Eliminar */}
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="text-black/30 transition-colors hover:text-red-400"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer: total + checkout */}
        {items.length > 0 && (
          <div className="border-t border-black/5 px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-black/60">Total</span>
              <span className="text-lg text-brand-pink">S/ {total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="w-full rounded-full bg-brand-pink py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              Ir al pago
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
