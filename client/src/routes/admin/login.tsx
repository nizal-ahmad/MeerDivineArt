import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import { api } from "@/services/api";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.login({ email, password });
      if (res.success) {
        toast.success("Admin authentication successful!");
        setTimeout(() => {
          navigate({ to: "/admin" });
        }, 300);
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Access restricted.");
      toast.error("Login failed. Check your admin password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige/40 px-4 py-12 font-sans">
      <Toaster position="top-right" richColors />
      <div className="w-full max-w-md border border-gold/30 bg-ivory p-8 shadow-[var(--shadow-lift)] sm:p-10">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sand/60 text-brown">
            <Lock className="h-5 w-5 text-burnt" strokeWidth={1.5} />
          </span>
          <h1 className="mt-4 font-display text-3xl text-brown">Admin Portal</h1>
          <p className="mt-1 text-xs text-brown/60 uppercase tracking-[0.2em]">
            Meer Divine Art Studio
          </p>
        </div>

        {error ? (
          <div className="mt-6 flex items-center gap-2 border border-burnt/40 bg-burnt/10 p-3 text-xs text-burnt">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
              Admin Email
            </label>
            <div className="relative mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@meerdivineart.com"
                className="w-full border border-gold/40 bg-card pl-10 pr-4 py-3 text-sm text-brown outline-none transition-colors placeholder:text-brown/30 focus:border-gold"
              />
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-brown/40" />
            </div>
          </div>

          <div>
            <label className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-burnt">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border border-gold/40 bg-card pl-10 pr-4 py-3 text-sm text-brown outline-none transition-colors placeholder:text-brown/30 focus:border-gold"
              />
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-brown/40" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brown py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burnt disabled:opacity-50"
          >
            {loading ? "Authenticating…" : "Login to Admin Dashboard"}
          </button>
        </form>

        <div className="mt-8 border-t border-gold/20 pt-6 text-center text-xs text-brown/50">
          Single Admin System • Secured with JWT
        </div>
      </div>
    </div>
  );
}
