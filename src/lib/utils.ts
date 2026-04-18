// utils.ts
// Propósito: Helper `cn` estándar shadcn/ui — combina clases condicionales (clsx)
// y resuelve conflictos de Tailwind (tailwind-merge) en un único string.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
