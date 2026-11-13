const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

const importsTarget = `import { Save, Loader2, ArrowLeft } from "lucide-react";`;
const importsReplacement = `import { Save, Loader2, ArrowLeft, Trash2, Plus } from "lucide-react";`;
content = content.replace(importsTarget, importsReplacement);

const stateTarget = `  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);`;
const stateReplacement = `  const [data, setData] = useState<any>(null);
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
  const [savingCoupon, setSavingCoupon] = useState(false);`;
content = content.replace(stateTarget, stateReplacement);

const fetchTarget = `      const res = await fetch('/api/prices');
      const json = await res.json();
      setData(json);`;
const fetchReplacement = `      const res = await fetch('/api/prices');
      const json = await res.json();
      setData(json);
      
      const resCoupons = await fetch('/api/coupons');
      const jsonCoupons = await resCoupons.json();
      setCoupons(jsonCoupons);`;
content = content.replace(fetchTarget, fetchReplacement);

const couponsFunctions = `
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
`;

const insertFunctionsTarget = `  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;`;
content = content.replace(insertFunctionsTarget, couponsFunctions + '\n' + insertFunctionsTarget);


const uiTarget = `        </div>
      </div>
    </div>
  );
}`;

const couponsUI = `
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
                        {coupon.discountType === 'percentage' ? \`-\${coupon.discountValue}%\` : \`-\$\${coupon.discountValue}\`} • Aplica a: {coupon.target === 'general' ? 'Todo' : coupon.target === 'table_only' ? 'Mesa' : coupon.target === 'desk_only' ? 'Escritorio' : 'Estante'}
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
`;

content = content.replace(uiTarget, couponsUI + '\n' + uiTarget);

fs.writeFileSync('src/app/admin/page.tsx', content);
console.log('Done replacing admin page for coupons');
