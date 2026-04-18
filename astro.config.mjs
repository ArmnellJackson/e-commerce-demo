// @ts-check
// astro.config.mjs
// Propósito: Integrar Tailwind CSS v4 vía plugin de Vite y React para islas interactivas (shadcn/ui).
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
