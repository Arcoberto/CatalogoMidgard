"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

type Phrase = { id: string; text: string };

export default function PhrasesManager() {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);
  const [newText, setNewText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/phrases")
      .then((r) => r.json())
      .then((data) => setPhrases(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!newText.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/phrases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");
      setPhrases([...phrases, data]);
      setNewText("");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta frase?")) return;
    try {
      const res = await fetch("/api/phrases?id=" + id, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      setPhrases(phrases.filter((p) => p.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border mt-8">
      <h2 className="text-xl font-bold text-midgard-navy mb-1 border-b pb-2">Carrusel de Frases (Inicio)</h2>
      <p className="text-xs text-gray-500 mb-4">
        La primera frase siempre aparece al abrir la página; las demás se muestran en orden aleatorio.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg border mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Escribe una nueva frase..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          disabled={saving || !newText.trim()}
          className="bg-midgard-navy text-white px-4 py-2 rounded font-semibold flex items-center justify-center gap-2 hover:bg-midgard-steel disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Agregar
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-4"><Loader2 className="animate-spin" /></div>
      ) : phrases.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">No hay frases. El carrusel mostrará las frases predeterminadas.</p>
      ) : (
        <ol className="space-y-2">
          {phrases.map((p, i) => (
            <li key={p.id} className="flex items-center justify-between gap-3 p-3 border rounded-lg hover:bg-gray-50">
              <span className="text-sm text-midgard-navy">
                <span className="text-gray-400 mr-2">{i + 1}.</span>
                {p.text}
                {i === 0 && <span className="ml-2 text-[10px] uppercase font-bold text-midgard-purple">Primera</span>}
              </span>
              <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors shrink-0" aria-label="Eliminar frase">
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
