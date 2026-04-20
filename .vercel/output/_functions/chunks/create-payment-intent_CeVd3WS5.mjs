import Stripe from 'stripe';

const prerender = false;
const stripe = new Stripe("sk_test_51TO8WNL3NuVLPvLg7d9X46JygCSFE2RwtCp22aBrwuw6oXaWBrqrgolFVBNDXu5iPxg4dq7x5BLDIrIsfHhvXPKo00zhwLzHdo");
const POST = async ({ request }) => {
  try {
    const { amount } = await request.json();
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return new Response(JSON.stringify({ error: "Monto inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      // Stripe trabaja en centavos/céntimos: S/ 45.90 → 4590
      amount: Math.round(amount * 100),
      currency: "pen",
      automatic_payment_methods: { enabled: true }
    });
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
