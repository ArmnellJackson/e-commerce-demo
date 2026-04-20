// create-payment-intent.ts
// Propósito: Endpoint server-side que crea un PaymentIntent en Stripe y devuelve
// el clientSecret al cliente para confirmar el pago con Stripe.js.
export const prerender = false;

import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { amount } = await request.json();

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Monto inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      // Stripe trabaja en centavos/céntimos: S/ 45.90 → 4590
      amount: Math.round(amount * 100),
      currency: 'pen',
      automatic_payment_methods: { enabled: true },
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error interno';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
