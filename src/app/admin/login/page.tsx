"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = "/admin";
        return;
      }
      const json = await res.json().catch(() => ({}));
      setError(json.error || "No se pudo iniciar sesión");
    } catch {
      setError("Error de conexión");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-5"
      >
        <div className="flex flex-col items-center gap-2">
          <Lock className="w-8 h-8 text-midgard-purple" />
          <h1 className="text-2xl font-bold text-midgard-navy">Panel de administración</h1>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoFocus
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-midgard-purple"
        />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="bg-midgard-navy text-white rounded-full py-3 font-semibold hover:bg-midgard-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Entrar
        </button>
      </form>
    </div>
  );
}
