"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

type Item = { key: string; name: string; price: number; regularPrice: number | null };

export default function ProductPricesManager() {
  const [items, setItems] = useState<Record<string, Item> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/product-prices")
      .then((r) => r.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const update = (key: string, field: "price" | "regularPrice", value: string) => {
    setItems((prev) => prev && ({
      ...prev,
      [key]: { ...prev[key], [field]: value === "" ? (field === "regularPrice" ? null : 0) : Number(value) },
    }));
  };

  const handleSave = async () => {
    if (!items) return;
    setSaving(true);
    try {
      const res = await fetch("/api/product-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");
      alert("Precios de muebles actualizados");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border mt-8">
      <div className="flex items-center justify-between border-b pb-2 mb-1">
        <h2 className="text-xl font-bold text-midgard-navy">Estante, Escritorio y Sillas</h2>
        <button
          onClick={handleSave}
          disabled={saving || !items}
          className="bg-midgard-navy text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-midgard-steel disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Guardar
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Si pones un &quot;precio anterior&quot; mayor al precio, se muestra tachado con el % de descuento. Déjalo vacío si no hay promoción.
      </p>

      {!items ? (
        <div className="flex justify-center py-4"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {Object.values(items).map((it) => (
            <div key={it.key} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end p-3 border rounded-lg">
              <p className="font-semibold text-midgard-navy">{it.name}</p>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Precio (MXN)</label>
                <input type="number" min={0} value={it.price} onChange={(e) => update(it.key, "price", e.target.value)} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Precio anterior / tachado (opcional)</label>
                <input type="number" min={0} value={it.regularPrice ?? ""} placeholder="Sin promoción" onChange={(e) => update(it.key, "regularPrice", e.target.value)} className="w-full border p-2 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
