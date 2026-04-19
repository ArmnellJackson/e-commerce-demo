// AuthModal.tsx
// Propósito: Modal de autenticación con dos modos (inicio de sesión / registro).
// Controlado externamente mediante props open/onOpenChange.
// Alterna entre formularios con un botón de cambio de modo.
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Mode = "login" | "register";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Campo de contraseña con toggle mostrar/ocultar
function PasswordInput({
  id,
  placeholder = "••••••••",
  value,
  onChange,
  required,
}: {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 transition-colors hover:text-black/70"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

// Formulario de inicio de sesión: email + contraseña
function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar con servicio de autenticación
    console.log("login", values);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="login-email">Correo electrónico</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="tu@correo.com"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="login-password">Contraseña</Label>
        <PasswordInput
          id="login-password"
          value={values.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-brand-pink py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
      >
        Iniciar sesión
      </button>
    </form>
  );
}

// Formulario de registro: nombre + email + contraseña + confirmar
function RegisterForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar con servicio de registro
    console.log("register", values);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="reg-name">Nombre completo</Label>
        <Input
          id="reg-name"
          type="text"
          placeholder="María García"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="reg-email">Correo electrónico</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="tu@correo.com"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="reg-password">Contraseña</Label>
        <PasswordInput
          id="reg-password"
          value={values.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="reg-confirm">Confirmar contraseña</Label>
        <PasswordInput
          id="reg-confirm"
          value={values.confirm}
          onChange={(e) => setValues((v) => ({ ...v, confirm: e.target.value }))}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-brand-pink py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
      >
        Crear cuenta
      </button>
    </form>
  );
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  // Modo activo: login por defecto; se reinicia al cerrar el modal
  const [mode, setMode] = useState<Mode>("login");

  const handleOpenChange = (next: boolean) => {
    if (!next) setMode("login"); // reinicia modo al cerrar
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-sm rounded-3xl border border-white/50 bg-white/90 backdrop-blur-xl shadow-[var(--shadow-float)] p-6 sm:p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="font-[family-name:var(--font-title)] text-xl text-center">
            {mode === "login" ? (
              <>
                bienvenido a{" "}
                <span className="text-brand-blue/80">nubecolores</span>
              </>
            ) : (
              <>
                únete a{" "}
                <span className="text-brand-blue/80">nubecolores</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Selector de modo: dos pestañas pill */}
        <div className="mb-5 flex rounded-full border border-black/10 bg-black/5 p-1">
          {(["login", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 rounded-full py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
                mode === m
                  ? "bg-white shadow text-brand-pink"
                  : "text-black/50 hover:text-black/70"
              )}
            >
              {m === "login" ? "Iniciar sesión" : "Registrarse"}
            </button>
          ))}
        </div>

        {/* Formulario activo según modo */}
        {mode === "login" ? <LoginForm /> : <RegisterForm />}

        {/* Enlace alternativo bajo el formulario */}
        <p className="mt-4 text-center text-xs text-black/50">
          {mode === "login" ? (
            <>
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-semibold text-brand-pink hover:underline"
              >
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-semibold text-brand-pink hover:underline"
              >
                Inicia sesión
              </button>
            </>
          )}
        </p>
      </DialogContent>
    </Dialog>
  );
}
