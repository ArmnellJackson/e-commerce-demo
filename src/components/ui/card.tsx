// card.tsx
// Propósito: Primitivos Card de shadcn/ui (forwarded refs implícitos en React 19)
// adaptados al lenguaje visual del proyecto: bordes orgánicos suaves, glass y sombra flotante.
import * as React from "react";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 shadow-[var(--shadow-subtle)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-0", className)}
      {...props}
    />
  );
}

export { Card, CardContent };
