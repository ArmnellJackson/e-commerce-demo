// PaymentDialog.tsx
// Propósito: Dialog para registrar una tarjeta de débito/crédito y procesar el pago.
// Formatea el número de tarjeta en grupos de 4, detecta Visa/Mastercard,
// y oculta el CVV con toggle de visibilidad.
import { useState } from "react";
import { Eye, EyeOff, CreditCard, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

// Detecta red de la tarjeta por primeros dígitos
function detectNetwork(num: string): "visa" | "mastercard" | null {
  const raw = num.replace(/\s/g, "");
  if (/^4/.test(raw)) return "visa";
  if (/^5[1-5]/.test(raw)) return "mastercard";
  return null;
}

// Formatea número de tarjeta en grupos de 4: "1234 5678 9012 3456"
function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

// Formatea expiración MM/AA
function formatExpiry(value: string): string {
  const raw = value.replace(/\D/g, "").slice(0, 4);
  if (raw.length >= 3) return `${raw.slice(0, 2)}/${raw.slice(2)}`;
  return raw;
}

// Badge SVG inline para Visa / Mastercard
function NetworkBadge({ network }: { network: "visa" | "mastercard" | null }) {
  if (!network) return null;
  if (network === "visa") {
    return (
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black italic tracking-tight text-blue-700 select-none">
        VISA
      </span>
    );
  }
  return (
    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5 select-none">
      <span className="h-4 w-4 rounded-full bg-red-500 opacity-90" />
      <span className="-ml-2 h-4 w-4 rounded-full bg-yellow-400 opacity-90" />
    </span>
  );
}

export function PaymentDialog({ open, onOpenChange, total }: PaymentDialogProps) {
  const [fields, setFields] = useState({
    cardNumber: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [showCvv, setShowCvv] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const network = detectNetwork(fields.cardNumber);

  const set = (key: keyof typeof fields) => (val: string) =>
    setFields((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar con pasarela de pago real
    setSubmitted(true);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) setSubmitted(false); // reinicia al cerrar
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="w-full max-w-sm rounded-3xl border border-white/50 bg-white/90 backdrop-blur-xl shadow-[var(--shadow-float)] p-6 sm:p-8"
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="font-[family-name:var(--font-title)] text-xl text-center">
            {submitted ? (
              <>pago <span className="text-brand-blue/80">confirmado</span></>
            ) : (
              <>datos de <span className="text-brand-blue/80">pago</span></>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Vista de éxito */}
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink/20 text-brand-pink">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm text-black/60">
              Tu pago de <span className="font-semibold text-brand-pink">S/ {total.toFixed(2)}</span> fue procesado correctamente.
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
          <>
            {/* Tarjeta visual preview */}
            <div className="mb-5 h-32 w-full rounded-2xl bg-gradient-to-br from-brand-pink/60 via-brand-blue/40 to-[#cab6e1]/60 p-4 shadow-[var(--shadow-float)] backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <CreditCard size={22} className="text-white/80" />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  {network ?? "tarjeta"}
                </span>
              </div>
              <div>
                <p className="font-mono text-base tracking-widest text-white drop-shadow">
                  {fields.cardNumber || "•••• •••• •••• ••••"}
                </p>
                <div className="mt-1 flex items-end justify-between">
                  <p className="text-xs text-white/70 uppercase truncate max-w-[60%]">
                    {fields.holder || "NOMBRE TITULAR"}
                  </p>
                  <p className="text-xs text-white/70">{fields.expiry || "MM/AA"}</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Número de tarjeta */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pay-number">Número de tarjeta</Label>
                <div className="relative">
                  <Input
                    id="pay-number"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={fields.cardNumber}
                    onChange={(e) => set("cardNumber")(formatCardNumber(e.target.value))}
                    maxLength={19}
                    required
                    className="pr-12"
                  />
                  <NetworkBadge network={network} />
                </div>
              </div>

              {/* Nombre del titular */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pay-holder">Nombre del titular</Label>
                <Input
                  id="pay-holder"
                  placeholder="Como aparece en la tarjeta"
                  value={fields.holder}
                  onChange={(e) => set("holder")(e.target.value.toUpperCase())}
                  required
                />
              </div>

              {/* Expiración + CVV en fila */}
              <div className="flex gap-3">
                <div className="flex flex-1 flex-col gap-1.5">
                  <Label htmlFor="pay-expiry">Vencimiento</Label>
                  <Input
                    id="pay-expiry"
                    inputMode="numeric"
                    placeholder="MM/AA"
                    value={fields.expiry}
                    onChange={(e) => set("expiry")(formatExpiry(e.target.value))}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="flex w-28 flex-col gap-1.5">
                  <Label htmlFor="pay-cvv" className="flex items-center gap-1">
                    CVV
                    <Lock size={11} className="text-black/30" />
                  </Label>
                  <div className="relative">
                    <Input
                      id="pay-cvv"
                      inputMode="numeric"
                      placeholder="•••"
                      type={showCvv ? "text" : "password"}
                      value={fields.cvv}
                      onChange={(e) => set("cvv")(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      maxLength={4}
                      required
                      className="pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCvv((v) => !v)}
                      aria-label={showCvv ? "Ocultar CVV" : "Mostrar CVV"}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 transition-colors"
                    >
                      {showCvv ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Total + botón pagar */}
              <div className="mt-1 flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-black/50">Total a pagar</span>
                  <span className="font-bold text-brand-pink text-base">S/ {total.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-pink py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                >
                  Pagar ahora
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
