// @ts-check
// astro.config.mjs
// Propósito: Integrar Tailwind CSS v4 vía plugin de Vite para procesamiento CSS-first.
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
