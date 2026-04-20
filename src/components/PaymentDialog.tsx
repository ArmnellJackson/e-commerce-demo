// PaymentDialog.tsx
// Propósito: Dialog de pago con Stripe PaymentElement.
// stripePromise y stripeAppearance se exportan para que CartSheet inicialice
// Elements al abrir el carrito, reduciendo la latencia al abrir este dialog.
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Exportado — CartSheet lo usa para montar <Elements> antes de abrir el dialog
export const stripePromise = loadStripe(
  import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export const stripeAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#f472b6",
    colorBackground: "#ffffff",
    colorText: "#1a1a1a",
    colorDanger: "#ef4444",
    fontFamily: "inherit",
    borderRadius: "12px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid rgba(0,0,0,0.12)",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid #f472b6",
      boxShadow: "0 0 0 2px rgba(244,114,182,0.2)",
    },
    ".Label": {
      fontSize: "12px",
      fontWeight: "500",
      color: "rgba(0,0,0,0.6)",
    },
  },
};

// ─── Formulario interno — debe estar dentro de <Elements> (montado en CartSheet) ──
interface CheckoutFormProps {
  total: number;
  onSuccess: () => void;
}

function CheckoutForm({ total, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // 1. Validar formulario de Stripe
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Error al validar el formulario");
      setLoading(false);
      return;
    }

    // 2. Crear PaymentIntent en el servidor
    let clientSecret: string;
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error del servidor");
      clientSecret = data.clientSecret;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar el pago");
      setLoading(false);
      return;
    }

    // 3. Confirmar sin redirección externa
    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "El pago no pudo procesarse");
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Preview decorativa de tarjeta */}
      <div className="h-28 w-full rounded-2xl bg-gradient-to-br from-brand-pink/60 via-brand-blue/40 to-[#cab6e1]/60 p-4 shadow-[var(--shadow-float)] flex flex-col justify-between">
        <CreditCard size={22} className="text-white/80" />
        <div className="flex items-end justify-between">
          <p className="font-mono text-sm tracking-widest text-white/80">
            •••• •••• •••• ••••
          </p>
          <p className="text-xs text-white/70">Pago seguro</p>
        </div>
      </div>

      {/* wallets: 'never' desactiva Link, Google Pay y Apple Pay */}
      <div className="min-h-[120px]">
        <PaymentElement
          options={{
            layout: "tabs",
            wallets: { link: "never", applePay: "never", googlePay: "never" },
          }}
        />
      </div>

      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      <div className="flex flex-col gap-3 mt-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-black/50">Total a pagar</span>
          <span className="font-bold text-brand-pink text-base">
            S/ {total.toFixed(2)}
          </span>
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full rounded-full bg-brand-pink py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Procesando..." : "Pagar ahora"}
        </button>
      </div>
    </form>
  );
}

// ─── Dialog principal — Elements ya está montado arriba en CartSheet ──────────
interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export function PaymentDialog({ open, onOpenChange, total }: PaymentDialogProps) {
  const [succeeded, setSucceeded] = useState(false);

  const handleOpenChange = (next: boolean) => {
    if (!next) setSucceeded(false);
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="w-full max-w-sm rounded-3xl border border-white/50 bg-white/90 backdrop-blur-xl shadow-[var(--shadow-float)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="font-[family-name:var(--font-title)] text-xl text-center">
            {succeeded ? (
              <>pago <span className="text-brand-blue/80">confirmado</span></>
            ) : (
              <>datos de <span className="text-brand-blue/80">pago</span></>
            )}
          </DialogTitle>
        </DialogHeader>

        {succeeded ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink/20 text-brand-pink">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm text-black/60">
              Tu pago de{" "}
              <span className="font-semibold text-brand-pink">
                S/ {total.toFixed(2)}
              </span>{" "}
              fue procesado correctamente.
            </p>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-2 w-full rounded-full bg-brand-pink py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <CheckoutForm total={total} onSuccess={() => setSucceeded(true)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
