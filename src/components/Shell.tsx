// Shell.tsx
// Propósito: Isla React que envuelve Navbar + main. Mantiene el estado de categoría
// activa y decide qué renderizar en el body: Hero (children Astro) cuando no hay
// selección, o <Catalog/> cuando se elige una. Habilita scroll vertical solo en modo
// catálogo; en Hero conserva el layout viewport-bound original (sin scroll).
import { useState, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Catalog } from "@/components/Catalog";
import { AuthModal } from "@/components/AuthModal";
import type { Category } from "@/lib/products";

type Selection = Category | "todo" | null;

// Etiquetas visibles en el navbar. El orden define el orden visual.
const NAV_ITEMS: { key: Exclude<Selection, null>; label: string }[] = [
  { key: "ninas", label: "niñas" },
  { key: "ninos", label: "niños" },
  { key: "bebes", label: "bebés" },
  { key: "todo", label: "todo" },
];

interface ShellProps {
  children: ReactNode; // contenido por defecto (Hero) cuando no hay categoría seleccionada
}

export function Shell({ children }: ShellProps) {
  // Estado central: null = mostrar Hero; valor = mostrar Catalog filtrado.
  const [selection, setSelection] = useState<Selection>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const showCatalog = selection !== null;

  // Handler único para botones de categoría: aplica selección y cierra menú móvil.
  const select = (key: Exclude<Selection, null>) => {
    setSelection(key);
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <>
      {/* ===================== NAVBAR ===================== */}
      <nav className="shrink-0 w-full px-3 pt-3 sm:px-6 sm:pt-6 z-50">
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-[var(--radius-pill)] border border-white/50 bg-white/40 px-4 py-2 sm:px-8 sm:py-3 shadow-[var(--shadow-subtle)] backdrop-blur-md">
          {/* Logo: clic = volver al Hero (selection = null) */}
          <button
            type="button"
            onClick={() => setSelection(null)}
            className="font-[family-name:var(--font-title)] text-xl sm:text-2xl font-bold"
          >
            nube<span className="text-brand-blue/80">colores</span>
          </button>

          {/* Enlaces desktop */}
          <ul className="hidden md:flex gap-8 text-sm font-medium lowercase tracking-wider">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => select(item.key)}
                  className={cn(
                    "transition-opacity hover:opacity-70",
                    selection === item.key && "text-brand-pink"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Acciones desktop */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative flex items-center">
              <input
                type="search"
                placeholder="Buscar..."
                className={cn(
                  "absolute right-10 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-sm outline-none transition-all duration-200 focus:border-brand-pink",
                  searchOpen ? "w-44 opacity-100 pointer-events-auto" : "w-0 opacity-0 pointer-events-none"
                )}
              />
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/40"
                aria-label="Buscar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/40"
              aria-label="Carrito"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
            <button
              onClick={() => setAuthOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/40"
              aria-label="Iniciar sesión"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </button>
          </div>

          {/* Hamburguesa mobile (controlada por React, no <details>) */}
          <div ref={menuRef} className="md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/40"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>

            {/* Panel móvil animado: opacity + translate + scale, transición 200ms */}
            <div
              className={cn(
                "absolute right-2 top-[calc(100%+0.5rem)] w-60 origin-top-right rounded-3xl border border-white/50 bg-white/70 p-4 shadow-[var(--shadow-float)] backdrop-blur-xl transition duration-200 ease-out",
                menuOpen
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
              )}
            >
              <ul className="flex flex-col gap-3 text-sm font-medium lowercase tracking-wider">
                {NAV_ITEMS.map((item) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => select(item.key)}
                      className={cn(
                        "block w-full text-left py-1",
                        selection === item.key && "text-brand-pink"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center gap-2 border-t border-black/10 pt-3">
                <button
                  type="button"
                  onClick={() => setSearchOpen((v) => !v)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white"
                  aria-label="Buscar"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </button>
                <input
                  type="search"
                  placeholder="Buscar..."
                  className={cn(
                    "rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-sm outline-none transition-all duration-200 focus:border-brand-pink",
                    searchOpen ? "block w-full opacity-100" : "hidden w-0 opacity-0"
                  )}
                />
                <button
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white"
                  aria-label="Carrito"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </button>
                <button
                  onClick={() => { setAuthOpen(true); setMenuOpen(false); }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/60 transition-colors hover:bg-white"
                  aria-label="Iniciar sesión"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de autenticación: controlado por authOpen */}
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />

      {/* ===================== MAIN =====================
          Hero  → flex column sin scroll (viewport-bound, igual que el diseño original).
          Catalog → overflow-y-auto: el footer queda anclado abajo y la lista se desplaza dentro del main. */}
      <main
        className={cn(
          "flex-1 min-h-0",
          showCatalog ? "overflow-y-auto" : "flex flex-col overflow-hidden"
        )}
      >
        {showCatalog ? <Catalog category={selection!} /> : children}
      </main>
    </>
  );
}
