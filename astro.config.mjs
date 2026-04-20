// @ts-check
// astro.config.mjs
// Propósito: Integrar Tailwind CSS v4, React (islas interactivas) y Node adapter para
// habilitar rutas API server-side (ej. creación de PaymentIntent de Stripe).
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
