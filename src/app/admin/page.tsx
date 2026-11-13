"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, ArrowLeft, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import PhrasesManager from "@/components/admin/PhrasesManager";
import ProductPricesManager from "@/components/admin/ProductPricesManager";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New Coupon Form
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    target: 'general'
  });
  const [savingCoupon, setSavingCoupon] = useState(false);

  const fetchPrices = async () => {
    try {
      const res = await fetch('/api/prices');
      const json = await res.json();
      setData(json);
      
      const resCoupons = await fetch('/api/coupons');
      const jsonCoupons = await resCoupons.json();
      setCoupons(jsonCoupons);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Precios actualizados exitosamente');
    } catch (e) {
      alert('Error guardando precios');
    } finally {
      setSaving(false);
    }
  };

  const updateModelPrice = (name: string, price: number) => {
    setData((prev: any) => ({
      ...prev,
      models: prev.models.map((m: any) => m.name === name ? { ...m, basePrice: price } : m)
    }));
  };

  const updateAccessoryPrice = (key: string, field: 'unitPrice' | 'packPrice', value: number) => {
    setData((prev: any) => ({
      ...prev,
      accessories: prev.accessories.map((a: any) => a.key === key ? { ...a, [field]: value } : a)
    }));
  };


  const handleAddCoupon = async () => {
    if (!newCoupon.code || newCoupon.discountValue <= 0) return alert('Datos inválidos');
    setSavingCoupon(true);
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoupon)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al guardar');
      }
      const savedCoupon = await res.json();
      setCoupons([savedCoupon, ...coupons]);
      setNewCoupon({ code: '', discountType: 'percentage', discountValue: 0, target: 'general' });
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSavingCoupon(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar este cupón?')) return;
    try {
      const res = await fetch('/api/coupons?id=' + id, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      setCoupons(coupons.filter(c => c.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center">Error cargando base de datos</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-sm text-midgard-navy flex items-center gap-1 mb-2 hover:underline">
              <ArrowLeft className="w-4 h-4" /> Volver al Inicio
            </Link>
            <h1 className="text-3xl font-bold text-midgard-navy">Panel Administrativo</h1>
            <p className="text-gray-500">Configuración global de precios y variables (Sincronizado con Base de Datos)</p>
          </div>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-midgard-navy text-white px-6 py-3 rounded-lg font-bold hover:bg-midgard-steel transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
            Guardar Cambios
          </button>
        </div>

        <div className="grid gap-8">
          {/* MODELOS */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold text-midgard-navy mb-4 border-b pb-2">Mesas (Precio Base)</h2>
            <div className="space-y-4">
              {data.models.map((model: any) => (
                <div key={model.name} className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">{model.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">$</span>
                    <input 
                      type="number" 
                      value={model.basePrice} 
                      onChange={(e) => updateModelPrice(model.name, Number(e.target.value))}
                      className="border p-2 rounded-lg w-32 text-right focus:outline-midgard-navy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ACCESORIOS */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold text-midgard-navy mb-4 border-b pb-2">Accesorios</h2>
            <div className="space-y-4">
              {data.accessories.map((acc: any) => (
                <div key={acc.key} className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b last:border-0">
                  <span className="font-semibold text-gray-700 w-1/3">{acc.name}</span>
                  
                  <div className="flex items-center gap-6 mt-2 md:mt-0 w-2/3 justify-end">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 uppercase">Unidad</span>
                      <span className="text-gray-400">$</span>
                      <input 
                        type="number" 
                        value={acc.unitPrice} 
                        onChange={(e) => updateAccessoryPrice(acc.key, 'unitPrice', Number(e.target.value))}
                        className="border p-2 rounded-lg w-28 text-right focus:outline-midgard-navy"
                      />
                    </div>

                    {acc.packPrice !== null && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 uppercase">Pack 6</span>
                        <span className="text-gray-400">$</span>
                        <input 
                          type="number" 
                          value={acc.packPrice} 
                          onChange={(e) => updateAccessoryPrice(acc.key, 'packPrice', Number(e.target.value))}
                          className="border p-2 rounded-lg w-28 text-right focus:outline-midgard-navy bg-gray-50"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CUPONES */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border mt-8">
            <h2 className="text-xl font-bold text-midgard-navy mb-4 border-b pb-2">Cupones de Descuento</h2>
            
            {/* Formulario nuevo cupón */}
            <div className="bg-gray-50 p-4 rounded-lg border mb-6">
              <h3 className="font-semibold text-sm mb-3">Agregar Nuevo Cupón</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Código</label>
                  <input type="text" placeholder="EJ: JUEGA2026" value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Tipo</label>
                  <select value={newCoupon.discountType} onChange={e => setNewCoupon({...newCoupon, discountType: e.target.value})} className="w-full border p-2 rounded bg-white">
                    <option value="percentage">Porcentaje (%)</option>
                    <option value="fixed">Monto Fijo ($)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Descuento</label>
                  <input type="number" value={newCoupon.discountValue || ''} onChange={e => setNewCoupon({...newCoupon, discountValue: Number(e.target.value)})} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Aplica a</label>
                  <select value={newCoupon.target} onChange={e => setNewCoupon({...newCoupon, target: e.target.value})} className="w-full border p-2 rounded bg-white">
                    <option value="general">Todo el Carrito</option>
                    <option value="table_only">Solo Mesa (Sin accs)</option>
                    <option value="desk_only">Solo Escritorio</option>
                    <option value="shelf_only">Solo Estante</option>
                  </select>
                </div>
                <div>
                  <button onClick={handleAddCoupon} disabled={savingCoupon} className="w-full bg-midgard-navy text-white p-2 rounded font-semibold flex items-center justify-center gap-2 hover:bg-midgard-steel">
                    {savingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Agregar
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Cupones */}
            <div className="space-y-3">
              {coupons.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No hay cupones activos</p>
              ) : (
                coupons.map((coupon: any) => (
                  <div key={coupon.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div>
                      <span className="font-bold text-lg text-midgard-navy">{coupon.code}</span>
                      <div className="text-xs text-gray-500 mt-1">
                        {coupon.discountType === 'percentage' ? `-${coupon.discountValue}%` : `-${coupon.discountValue}`} • Aplica a: {coupon.target === 'general' ? 'Todo' : coupon.target === 'table_only' ? 'Mesa' : coupon.target === 'desk_only' ? 'Escritorio' : 'Estante'}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteCoupon(coupon.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          <ProductPricesManager />

          <PhrasesManager />

        </div>
      </div>
    </div>
  );
}
