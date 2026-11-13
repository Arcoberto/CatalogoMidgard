"use client";

import { useConfiguratorStore, TableFinish, StructureStyle, TableFelt, getTableCategory, getMaxAccessories } from "@/store/useConfiguratorStore";
import { Suspense, useEffect, useState } from "react";
import { Check, ChevronRight, Info, Video, RefreshCw, Table as TableIcon, Library, Monitor, Gift, Heart } from "lucide-react";
import { useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic';

const TableViewer3D = dynamic(() => import('@/components/3d/TableViewer3D').then(mod => mod.TableViewer3D), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-midgard-navy/50 font-medium animate-pulse">
      Cargando visualizador 3D...
    </div>
  ),
});

// Caja de Recursos oculta temporalmente del configurador
const SHOW_RESOURCE_BOX = false;

const FELT_TEXTURES = [
  { id: 'Rojo', name: 'Rojo', image: '/textures/rojo-tela.jpg' },
  { id: 'Tinto', name: 'Tinto', image: '/textures/tinto-tela.jpg' },
  { id: 'Naranja', name: 'Naranja', image: '/textures/naranja-tela.jpg' },
  { id: 'Amarillo', name: 'Amarillo', image: '/textures/amarillo-tela.jpg' },
  { id: 'Verde', name: 'Verde', image: '/textures/verde-tela.jpg' },
  { id: 'Verde Esmeralda', name: 'Verde Esmeralda', image: '/textures/verdeesmeralda-tela.jpg' },
  { id: 'Cyan', name: 'Cyan', image: '/textures/cyan-tela.jpg' },
  { id: 'Azul', name: 'Azul', image: '/textures/azulclaro-tela.jpg' },
  { id: 'Azul Indigo', name: 'Azul Indigo', image: '/textures/azul.jpg' },
  { id: 'Azul Metalico', name: 'Azul Metalico', image: '/textures/azulmetalico-tela.jpg' },
  { id: 'Morado', name: 'Morado', image: '/textures/morado-tela.jpg' },
  { id: 'Magenta', name: 'Magenta', image: '/textures/magenta-tela.jpg' },
  { id: 'Rosa', name: 'Rosa', image: '/textures/rosa-tela.jpg' },
  { id: 'Arena', name: 'Arena', image: '/textures/arena-tela.jpg' },
  { id: 'Gris', name: 'Gris', image: '/textures/gris-tela.jpg' },
  { id: 'Negro', name: 'Negro', image: '/textures/negro-tela.jpg' },
];

function ConfiguradorContent() {
  const [showPromocion, setShowPromocion] = useState(true);
  const [showMasPedido, setShowMasPedido] = useState(true);
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponInput) return;
    setCouponLoading(true);
    setCouponError('');
    setCouponSuccess('');
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Cupón inválido');
      }
      applyCoupon(data);
      setCouponSuccess('Cupón aplicado');
      setCouponInput('');
    } catch (e: any) {
      setCouponError(e.message);
    } finally {
      setCouponLoading(false);
    }
  };
  const searchParams = useSearchParams();
  const { 
    model, setModel, 
    sizeType, setSizeType, customLength, customWidth, setCustomDimensions,
    finish, setFinish, 
    woodTexture, setWoodTexture,
    shelfWoodTexture, setShelfWoodTexture,
    shelfFinish, setShelfFinish,
    deskWoodTexture, setDeskWoodTexture,
    deskFinish, setDeskFinish,
    structureStyle, setStructureStyle,
    isCovered, setIsCovered,
    matColor, setMatColor, 
    accessories, updateAccessory, 
    shippingState, shippingCost, setShipping,
    couponCode, couponDiscountType, couponDiscountValue, couponTarget, applyCoupon, removeCoupon,
    getSubtotal, getTotalPrice,
    activeProducts, toggleProduct, currentMenu, setCurrentMenu,
    resetConfigurator
  } = useConfiguratorStore();

  const currentCategory = getTableCategory(customLength, customWidth);
  const maxAccessories = getMaxAccessories(currentCategory);

  const handleProductClick = (prod: 'table' | 'shelf' | 'desk') => {
    if (activeProducts[prod] && currentMenu !== prod) {
      setCurrentMenu(prod);
    } else {
      toggleProduct(prod);
    }
  };

  useEffect(() => {
    const modelParam = searchParams.get('model');
    if (modelParam === 'Asgard' || modelParam === 'Midgard') {
      setModel(modelParam);
    }
  }, [searchParams, setModel]);

  useEffect(() => {
    if (model === 'Midgard' && matColor !== 'Negro' && matColor !== 'Gris') {
      setMatColor('Negro');
    }
  }, [model, matColor, setMatColor]);

  const isAsgard = model === 'Asgard';
  const [showSummary, setShowSummary] = useState(false); // solo móvil

  const acabados: TableFinish[] = ['Mate', 'Semi-Mate', 'Brillante'];
  const estructuras: StructureStyle[] = ['Un sólo tono', 'Bicolor Blanco', 'Bicolor Negro'];

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-7rem)] bg-midgard-light-gray">
      
      {/* LEFT PANEL - CONTROLS */}
      <div className="order-2 lg:order-none w-full lg:w-[450px] bg-white border-r border-midgard-light-gray flex flex-col lg:h-[calc(100vh-7rem)] lg:overflow-y-auto pb-24 lg:pb-0">
        <div className="pt-6 lg:pt-10 pb-4 lg:pb-6 px-6 border-b border-midgard-light-gray lg:sticky top-0 bg-white z-50">
          <h1 className="text-2xl font-bold text-midgard-navy">Configura tu Mesa</h1>
          <p className="text-sm text-midgard-gray">Personaliza cada detalle a tu gusto.</p>
        </div>

        <div className="p-6 space-y-10 flex-grow">
          
          {!currentMenu && (
             <div className="flex flex-col items-center justify-center h-full text-midgard-gray gap-4 opacity-50">
               <Info className="w-12 h-12" />
               <p className="text-center">Selecciona un elemento <span className="lg:hidden">en el visor de arriba</span><span className="hidden lg:inline">a la derecha</span> para configurarlo.</p>
             </div>
          )}

          {currentMenu === 'table' && (
            <>
          {/* STEP 1: MODEL */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-midgard-steel mb-4 flex items-center gap-2">
              <span className="bg-midgard-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Modelo
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {['Asgard', 'Midgard'].map((m) => (
                <button
                  key={m}
                  onClick={() => setModel(m as 'Asgard' | 'Midgard')}
                  className={`relative border-2 p-4 rounded-xl text-left transition-all ${
                      model === m ? 'border-midgard-navy bg-midgard-navy/5' : 'border-gray-200 hover:border-midgard-steel'
                    }`}
                  >
                    {showPromocion && m === 'Asgard' && (
  <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
    <Gift className="w-3 h-3" />
  </div>
)}
                  <h3 className={`font-bold ${model === m ? 'text-midgard-navy' : 'text-gray-700'}`}>{m}</h3>
                </button>
              ))}
            </div>
          </section>

          {/* STEP 2: SIZE */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-midgard-steel mb-4 flex items-center gap-2">
              <span className="bg-midgard-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Tamaño
            </h2>
            <div className="space-y-4">
              <label className={`relative flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${sizeType === 'standard' ? 'border-midgard-navy bg-midgard-navy/5' : 'border-gray-200 hover:border-midgard-steel'}`}>
                {showPromocion && isAsgard && (
  <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
    <Gift className="w-3 h-3" />
  </div>
)}
                <div>
                  <span className="font-bold block text-midgard-navy">Estándar</span>
                  <span className="text-sm text-midgard-gray">
                    {model === 'Asgard' ? '170 x 110 x 75 cm' : '170 x 100 x 75 cm'}
                  </span>
                </div>
                <input type="radio" name="sizeType" checked={sizeType === 'standard'} onChange={() => setSizeType('standard')} className="w-5 h-5 accent-midgard-navy" />
              </label>

              <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${sizeType === 'custom' ? 'border-midgard-navy bg-midgard-navy/5' : 'border-gray-200 hover:border-midgard-steel'}`}>
                <div>
                  <span className="font-bold block text-midgard-navy">Personalizado</span>
                  <span className="text-sm text-midgard-gray">Ingresa tus medidas exactas</span>
                </div>
                <input type="radio" name="sizeType" checked={sizeType === 'custom'} onChange={() => setSizeType('custom')} className="w-5 h-5 accent-midgard-navy" />
              </label>

              {sizeType === 'custom' && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-start gap-3 mt-2">
                  <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-2">Las medidas personalizadas pueden incrementar el tiempo de fabricación hasta 30 días.</p>
                    <div className="flex gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-yellow-700">Largo (cm)</label>
                        <input type="number" value={customLength} onChange={(e) => setCustomDimensions(Number(e.target.value), customWidth)} onBlur={(e) => setCustomDimensions(Math.max(90, Math.min(210, Number(e.target.value))), customWidth)} className="w-full mt-1 p-2 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-yellow-700">Ancho (cm)</label>
                        <input type="number" value={customWidth} onChange={(e) => setCustomDimensions(customLength, Number(e.target.value))} onBlur={(e) => setCustomDimensions(customLength, Math.max(90, Math.min(120, Number(e.target.value))))} className="w-full mt-1 p-2 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-100/50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                      <p className="font-bold mb-1">Guía de Tamaños y Precios:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><b>Chica</b> (hasta 120x120 cm): <b>-$2,000</b> al precio base. (Máx. 4 accesorios)</li>
                        <li><b>Estándar</b> (hasta 170x110 cm): Precio base sin modificación. (Máx. 6 accesorios)</li>
                        <li><b>Grande</b> (hasta 210x120 cm): <b>+$3,500</b> al precio base. (Máx. 8 accesorios)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* STEP 3: WOOD TEXTURE & FINISH */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-midgard-steel mb-4 flex items-center gap-2">
              <span className="bg-midgard-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
              Estética de la Madera
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Tono / Textura</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Pino', 'Roble', 'Chocolate', 'Nogal', 'Encino'].map((t) => (
                    <div key={t} className={`relative ${t === 'Nogal' ? 'z-20' : 'z-0'}`}>
                      <button
                        onClick={() => setWoodTexture(t as any)}
                        className={`w-full h-full relative py-3 px-2 rounded-xl border-2 text-[11px] font-bold uppercase transition-all overflow-hidden bg-cover bg-center text-white flex items-center justify-center ${
                          woodTexture === t 
                            ? 'border-midgard-navy ring-2 ring-midgard-navy ring-offset-1' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                        style={{ 
                          backgroundImage: `url('/textures/${t.toLowerCase()}.jpg')`,
                          textShadow: '0px 1px 3px rgba(0,0,0,0.9)'
                        }}
                      >
                        <div className={`absolute inset-0 transition-colors ${woodTexture === t ? 'bg-black/20' : 'bg-black/40 hover:bg-black/20'}`} />
                        <span className="relative z-10">{t}</span>
                        {woodTexture === t && <Check className="absolute top-1 right-1 w-3 h-3 text-white z-10 drop-shadow-md" />}
                      </button>
                      {showMasPedido && t === 'Nogal' && (
                        <div className="absolute -top-3 -right-3 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">
                          <Heart className="w-3 h-3 fill-current" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Diseño de Estructura */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Diseño de Estructura</label>
                <div className="grid grid-cols-3 gap-3">
                  {estructuras.map(est => (
                    <button
                      key={est}
                      onClick={() => setStructureStyle(est)}
                      className={`relative py-2 px-2 rounded-xl border text-[11px] font-bold uppercase transition-all ${
                        structureStyle === est 
                          ? 'border-midgard-navy bg-midgard-navy/5 text-midgard-navy' 
                          : 'border-gray-200 text-gray-600 hover:border-midgard-steel'
                      }`}
                    >
                      {showMasPedido && est === 'Bicolor Negro' && (
  <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
    <Heart className="w-3 h-3 fill-current" />
  </div>
)}
                      {est}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Acabado Final</label>
                <div className="flex flex-wrap gap-3">
                  {acabados.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFinish(f)}
                      className={`relative py-2 px-4 border-2 rounded-xl text-center text-sm font-medium capitalize transition-all ${
                        finish === f ? 'border-midgard-navy bg-midgard-navy/5 text-midgard-navy' : 'border-gray-200 text-gray-600 hover:border-midgard-steel'
                      }`}
                    >
                      {showMasPedido && f === 'Mate' && (
  <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
    <Heart className="w-3 h-3 fill-current" />
  </div>
)}
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* STEP 4: MAT COLOR & COVERS */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-midgard-steel mb-4 flex items-center gap-2">
              <span className="bg-midgard-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
              Área de Juego
            </h2>
            
            <div className="mb-6">
              <div 
                onClick={() => setIsCovered(!isCovered)}
                className="flex items-center justify-between p-3 border-2 rounded-xl cursor-pointer hover:border-midgard-steel transition-all"
              >
                <div>
                  <span className="font-bold block text-midgard-navy">Tapas de Comedor</span>
                  <span className="text-xs text-midgard-gray">Cubre el área de juego</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in pointer-events-none">
                  <input type="checkbox" checked={isCovered} readOnly className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none transition-transform" style={{ transform: isCovered ? 'translateX(100%)' : 'translateX(0)', borderColor: isCovered ? '#1B263B' : '#ccc' }}/>
                  <div className={`toggle-label block overflow-hidden h-6 rounded-full ${isCovered ? 'bg-midgard-navy' : 'bg-gray-300'}`}></div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Color del Tapete</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', width: 'max-content' }}>
                {FELT_TEXTURES.filter(felt => model === 'Asgard' || (felt.id === 'Negro' || felt.id === 'Gris')).map((felt) => (
                  <div key={felt.id} className="relative">
                  <button
                    onClick={() => setMatColor(felt.id as TableFelt)}
                    className={`relative w-16 h-16 rounded-full transition-all flex items-center justify-center border-4 overflow-hidden bg-cover bg-center ${matColor === felt.id ? 'border-midgard-navy scale-110 shadow-md' : 'border-transparent shadow-sm hover:scale-105 hover:border-gray-300'}`}
                    style={{ backgroundImage: `url(${felt.image})` }}
                    title={felt.name}
                  >
                    {matColor === felt.id && <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><Check className="w-6 h-6 text-white drop-shadow-md" /></div>}
                  </button>
                  {showMasPedido && ['Rojo', 'Verde Esmeralda', 'Azul Metalico'].includes(felt.id) && (
                    <div className="absolute -top-1 -right-1 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
                      <Heart className="w-3 h-3 fill-current" />
                    </div>
                  )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STEP 5: ACCESSORIES */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-midgard-steel mb-4 flex items-center gap-2">
              <span className="bg-midgard-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">5</span>
              Accesorios
            </h2>
            <div className="space-y-3">
              {isAsgard && (
                <label className="relative flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  {showPromocion && (
                    <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
                      <Gift className="w-3 h-3" />
                    </div>
                  )}
                  <div>
                    <span className="font-semibold block text-sm">Sistema LED</span>
                    <span className="text-xs text-[#50C878] font-semibold">Incluido sin costo</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-red-600">Gratis por el Buen Fin</span>
                  </div>
                  <input type="checkbox" checked={accessories.led} onChange={(e) => updateAccessory('led', e.target.checked)} className="w-5 h-5 accent-midgard-navy" />
                </label>
              )}

               <div className="relative flex items-center justify-between p-3 border rounded-lg">
                {showPromocion && (
                    <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
                      <Gift className="w-3 h-3" />
                    </div>
                  )}
                <div>
                  <span className="font-semibold block text-sm">Portavasos Ajustable</span>
                  <span className="text-xs text-midgard-gray">
                    {isAsgard ? 'Hasta 6 incluidos. Extra: +$350 c/u (+$1,700 x 6)' : '+$350 c/u (+$1,700 paquete de 6)'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateAccessory('cupholder', Math.max(0, accessories.cupholder - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200">-</button>
                  <span className="w-4 text-center font-bold">{accessories.cupholder}</span>
                  <button onClick={() => updateAccessory('cupholder', Math.min(maxAccessories, accessories.cupholder + 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200">+</button>
                </div>
              </div>

              {/* Caja de Recursos deshabilitada temporalmente. Cambiar SHOW_RESOURCE_BOX a true para reactivarla. */}
              {SHOW_RESOURCE_BOX && (
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-semibold block text-sm">Caja de Recursos</span>
                  <span className="text-xs text-midgard-gray">+$300 c/u (+$1,400 paquete de 6)</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateAccessory('resourceBox', Math.max(0, accessories.resourceBox - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200">-</button>
                  <span className="w-4 text-center font-bold">{accessories.resourceBox}</span>
                  <button onClick={() => updateAccessory('resourceBox', Math.min(maxAccessories, accessories.resourceBox + 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200">+</button>
                </div>
              </div>
              )}

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-semibold block text-sm">Extensión Tablero individual</span>
                  <span className="text-xs text-midgard-gray">+$800 c/u (+$4,000 paquete de 6)</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateAccessory('extension', Math.max(0, accessories.extension - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200">-</button>
                  <span className="w-4 text-center font-bold">{accessories.extension}</span>
                  <button onClick={() => updateAccessory('extension', Math.min(maxAccessories, accessories.extension + 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200">+</button>
                </div>
              </div>

              <label className="relative flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                {showMasPedido && (
                <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
                  <Heart className="w-3 h-3 fill-current" />
                </div>
              )}
                <div>
                  <span className="font-semibold block text-sm">Cajón para superficies</span>
                  <span className="text-xs text-midgard-gray">+$3,000</span>
                </div>
                <input type="checkbox" checked={accessories.drawer} onChange={(e) => updateAccessory('drawer', e.target.checked)} className="w-5 h-5 accent-midgard-navy" />
              </label>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <span className="font-semibold block text-sm">Sillas (Hasta 6)</span>
                  <span className="text-xs text-midgard-gray">+$3,200 c/u (+$17,500 paquete de 6)</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateAccessory('chairs', Math.max(0, accessories.chairs - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200">-</button>
                  <span className="w-4 text-center font-bold">{accessories.chairs}</span>
                  <button onClick={() => updateAccessory('chairs', Math.min(6, accessories.chairs + 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200">+</button>
                </div>
              </div>

            </div>
          </section>
          </>)}

          {currentMenu === 'shelf' && (
            <>
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-midgard-steel mb-4 flex items-center gap-2">
                  <span className="bg-midgard-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Medida
                </h2>
                <div className="bg-gray-50 border-2 border-gray-200 p-4 rounded-xl text-midgard-navy">
                  <span className="font-bold block">40 x 100 cm</span>
                  <span className="text-sm text-midgard-gray">Altura 180 cm</span>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-midgard-steel mb-4 flex items-center gap-2">
                  <span className="bg-midgard-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Estética de la Madera
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Tono / Textura</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Pino', 'Roble', 'Chocolate', 'Nogal', 'Encino'].map((t) => (
                        <div key={t} className={`relative ${t === 'Nogal' ? 'z-20' : 'z-0'}`}>
                          <button
                            onClick={() => setShelfWoodTexture(t as any)}
                            className={`w-full h-full relative py-3 px-2 rounded-xl border-2 text-[11px] font-bold uppercase transition-all overflow-hidden bg-cover bg-center text-white flex items-center justify-center ${
                              shelfWoodTexture === t 
                                ? 'border-midgard-navy ring-2 ring-midgard-navy ring-offset-1' 
                                : 'border-transparent hover:border-gray-300'
                            }`}
                            style={{ 
                              backgroundImage: `url('/textures/${t.toLowerCase()}.jpg')`,
                              textShadow: '0px 1px 3px rgba(0,0,0,0.9)'
                            }}
                          >
                            <div className={`absolute inset-0 transition-colors ${shelfWoodTexture === t ? 'bg-black/20' : 'bg-black/40 hover:bg-black/20'}`} />
                            <span className="relative z-10">{t}</span>
                            {shelfWoodTexture === t && <Check className="absolute top-1 right-1 w-3 h-3 text-white z-10 drop-shadow-md" />}
                          </button>
                          {showMasPedido && t === 'Nogal' && (
                            <div className="absolute -top-3 -right-3 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">
                              <Heart className="w-3 h-3 fill-current" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Acabado Final</label>
                    <div className="flex flex-wrap gap-3">
                      {acabados.map((f) => (
                        <button
                          key={f}
                          onClick={() => setShelfFinish(f)}
                          className={`relative py-2 px-4 border-2 rounded-xl text-center text-sm font-medium capitalize transition-all ${
                            shelfFinish === f ? 'border-midgard-navy bg-midgard-navy/5 text-midgard-navy' : 'border-gray-200 text-gray-600 hover:border-midgard-steel'
                          }`}
                        >
                          {showMasPedido && f === 'Mate' && (
  <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
    <Heart className="w-3 h-3 fill-current" />
  </div>
)}
                      {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {currentMenu === 'desk' && (
            <>
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-midgard-steel mb-4 flex items-center gap-2">
                  <span className="bg-midgard-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Medida
                </h2>
                <div className="bg-gray-50 border-2 border-gray-200 p-4 rounded-xl text-midgard-navy">
                  <span className="font-bold block">140 x 50 cm</span>
                  <span className="text-sm text-midgard-gray">Altura elevable 70 a 120 cm</span>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-midgard-steel mb-4 flex items-center gap-2">
                  <span className="bg-midgard-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Estética de la Madera
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Tono / Textura</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Pino', 'Roble', 'Chocolate', 'Nogal', 'Encino'].map((t) => (
                        <div key={t} className={`relative ${t === 'Nogal' ? 'z-20' : 'z-0'}`}>
                          <button
                            onClick={() => setDeskWoodTexture(t as any)}
                            className={`w-full h-full relative py-3 px-2 rounded-xl border-2 text-[11px] font-bold uppercase transition-all overflow-hidden bg-cover bg-center text-white flex items-center justify-center ${
                              deskWoodTexture === t 
                                ? 'border-midgard-navy ring-2 ring-midgard-navy ring-offset-1' 
                                : 'border-transparent hover:border-gray-300'
                            }`}
                            style={{ 
                              backgroundImage: `url('/textures/${t.toLowerCase()}.jpg')`,
                              textShadow: '0px 1px 3px rgba(0,0,0,0.9)'
                            }}
                          >
                            <div className={`absolute inset-0 transition-colors ${deskWoodTexture === t ? 'bg-black/20' : 'bg-black/40 hover:bg-black/20'}`} />
                            <span className="relative z-10">{t}</span>
                            {deskWoodTexture === t && <Check className="absolute top-1 right-1 w-3 h-3 text-white z-10 drop-shadow-md" />}
                          </button>
                          {showMasPedido && t === 'Nogal' && (
                            <div className="absolute -top-3 -right-3 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">
                              <Heart className="w-3 h-3 fill-current" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Acabado Final</label>
                    <div className="flex flex-wrap gap-3">
                      {acabados.map((f) => (
                        <button
                          key={f}
                          onClick={() => setDeskFinish(f)}
                          className={`relative py-2 px-4 border-2 rounded-xl text-center text-sm font-medium capitalize transition-all ${
                            deskFinish === f ? 'border-midgard-navy bg-midgard-navy/5 text-midgard-navy' : 'border-gray-200 text-gray-600 hover:border-midgard-steel'
                          }`}
                        >
                          {showMasPedido && f === 'Mate' && (
  <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
    <Heart className="w-3 h-3 fill-current" />
  </div>
)}
                      {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

        </div>
      </div>

      {/* RIGHT PANEL - 3D CANVAS & SUMMARY */}
      <div className="order-1 lg:order-none flex-1 relative bg-gradient-to-br from-gray-100 to-gray-200 h-[58vh] min-h-[360px] lg:min-h-0 lg:h-auto">
        
        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
           <TableViewer3D />
        </div>

        {/* FLOATING PILL TAGS */}
        <div className="absolute bottom-3 left-3 lg:bottom-6 lg:left-6 z-10 flex flex-col items-start gap-2 lg:gap-3">
          {/* Promoción */}
          <button 
            onClick={() => setShowPromocion(!showPromocion)}
            className={`flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 lg:px-5 lg:py-2.5 rounded-full border border-[#50C878]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-[#50C878] font-medium text-xs tracking-wide uppercase transition-all hover:-translate-y-0.5 ${!showPromocion && 'opacity-50 grayscale'}`}
          >
            <Gift className="w-4 h-4 stroke-[1.5]" />
            <span>Promoción</span>
          </button>
          
          {/* Más pedido */}
          <button 
            onClick={() => setShowMasPedido(!showMasPedido)}
            className={`flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 lg:px-5 lg:py-2.5 rounded-full border border-[#E63946]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-[#E63946] font-medium text-xs tracking-wide uppercase transition-all hover:-translate-y-0.5 ${!showMasPedido && 'opacity-50 grayscale'}`}
          >
            <Heart className="w-4 h-4 stroke-[1.5]" />
            <span>Más pedido</span>
          </button>
        </div>

        {/* LEFT SIDE FLOATING UI - VIEW PRESETS */}
        <div className="absolute top-3 left-3 lg:top-24 lg:left-6 flex flex-col gap-2 lg:gap-3 z-10 pointer-events-none">
          <button 
            type="button"
            onClick={() => handleProductClick('table')}
            className={`pointer-events-auto backdrop-blur-md p-2 lg:p-3 rounded-2xl shadow-lg transition-all border flex flex-col items-center gap-1 w-16 lg:w-20 ${
              activeProducts.table 
                ? (currentMenu === 'table' ? 'bg-midgard-navy text-white border-midgard-navy scale-105' : 'bg-white/90 text-midgard-navy border-midgard-navy ring-2 ring-midgard-navy ring-inset hover:scale-105') 
                : 'bg-white/50 text-gray-400 border-white/50 hover:bg-white/90 hover:text-midgard-navy'
            }`}
            title="Mesa"
          >
            <TableIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Mesa</span>
          </button>
          
          <button 
            type="button"
            onClick={() => handleProductClick('shelf')}
            className={`pointer-events-auto backdrop-blur-md p-2 lg:p-3 rounded-2xl shadow-lg transition-all border flex flex-col items-center gap-1 w-16 lg:w-20 ${
              activeProducts.shelf 
                ? (currentMenu === 'shelf' ? 'bg-midgard-navy text-white border-midgard-navy scale-105' : 'bg-white/90 text-midgard-navy border-midgard-navy ring-2 ring-midgard-navy ring-inset hover:scale-105') 
                : 'bg-white/50 text-gray-400 border-white/50 hover:bg-white/90 hover:text-midgard-navy'
            }`}
            title="Estante"
          >
            <Library className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Estante</span>
          </button>
          
          <button 
            type="button"
            onClick={() => handleProductClick('desk')}
            className={`pointer-events-auto backdrop-blur-md p-2 lg:p-3 rounded-2xl shadow-lg transition-all border flex flex-col items-center gap-1 w-16 lg:w-20 ${
              activeProducts.desk 
                ? (currentMenu === 'desk' ? 'bg-midgard-navy text-white border-midgard-navy scale-105' : 'bg-white/90 text-midgard-navy border-midgard-navy ring-2 ring-midgard-navy ring-inset hover:scale-105') 
                : 'bg-white/50 text-gray-400 border-white/50 hover:bg-white/90 hover:text-midgard-navy'
            }`}
            title="Escritorio"
          >
            <Monitor className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Escritorio</span>
          </button>
        </div>

        {/* RIGHT SIDE FLOATING UI */}
        <div className={`absolute top-3 right-3 lg:top-auto lg:bottom-6 lg:right-6 flex flex-col items-end gap-3 ${showSummary ? 'z-[60]' : 'z-10'} lg:z-10`}>
          
          {/* SELECTOR DE CÁMARAS */}
          <div className="flex items-center gap-2">
            <div className="flex bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/50 p-1">
              {[
                { id: 'general', label: 'Cámara 1' },
                { id: 'frontal', label: 'Cámara 2' },
                { id: 'superior', label: 'Cámara 3' },
              ].map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => window.dispatchEvent(new CustomEvent('set-camera-view', { detail: v.id }))}
                  className="px-2.5 lg:px-3 py-1.5 lg:py-2 text-xs font-semibold text-midgard-navy rounded-full hover:bg-midgard-navy hover:text-white transition-colors"
                  title={v.id === 'general' ? 'Vista general' : v.id === 'frontal' ? 'Vista frontal' : 'Vista superior'}
                >
                  <span className="lg:hidden">Cám {i + 1}</span>
                  <span className="hidden lg:inline">{v.label}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => window.dispatchEvent(new Event('reset-camera'))}
              className="bg-white/90 backdrop-blur-md p-2 lg:p-3 rounded-full shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2 border border-white/50 text-midgard-navy"
              title="Centrar Cámara"
            >
              <Video className="w-5 h-5 hidden lg:block" />
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* SUMMARY CARD */}
          {/* Fondo oscuro del resumen en móvil */}
          {showSummary && (
            <div className="lg:hidden fixed inset-0 bg-black/40" onClick={() => setShowSummary(false)} aria-hidden="true" />
          )}
          <div className={`${showSummary ? 'block' : 'hidden'} lg:block fixed lg:static inset-x-0 bottom-0 w-full lg:w-80 bg-white lg:bg-white/90 backdrop-blur-md p-6 rounded-t-2xl lg:rounded-2xl shadow-2xl border border-white/50 max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-midgard-navy">Resumen</h3>
              <button onClick={() => setShowSummary(false)} className="lg:hidden text-midgard-gray text-2xl leading-none px-2" aria-label="Cerrar resumen">×</button>
            </div>
            
            <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-midgard-gray">Modelo</span>
              <span className="font-semibold">{model}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-midgard-gray">Acabado</span>
              <span className="font-semibold capitalize">{finish}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-midgard-gray">Tapete</span>
              <span className="font-semibold">{FELT_TEXTURES.find(c => c.id === matColor)?.name || matColor}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-midgard-navy mb-2">Calcula tu envío</label>
            <select 
              className="w-full p-2 border rounded-lg text-sm bg-white"
              onChange={(e) => {
                const val = e.target.value;
                let cost = 0;
                if (val === 'CDMX') cost = 1200;
                if (val === 'GDL') cost = 500;
                if (val === 'MTY') cost = 1500;
                if (val === 'OTRO') cost = 2000;
                setShipping(val, cost);
              }}
            >
              <option value="">Selecciona tu estado...</option>
              <option value="CDMX">Ciudad de México</option>
              <option value="GDL">Jalisco (Zona GDL)</option>
              <option value="MTY">Nuevo León (Zona MTY)</option>
              <option value="OTRO">Otro Estado</option>
            </select>
            <p className="text-xs text-midgard-gray mt-1">* El costo final será confirmado antes de fabricar.</p>
          </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-sm mb-1 text-midgard-gray">
                <span>Subtotal (Mesa y Accesorios)</span>
                <span className="font-bold text-gray-700">${getSubtotal().toLocaleString('en-US')}</span>
              </div>
            </div>
            
            {/* Cupones */}
            <div className="border-t pt-4 mb-4">
              <label className="block text-sm font-semibold text-midgard-navy mb-2">¿Tienes un cupón?</label>
              
              {!couponCode ? (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Escribe tu código" 
                    className="w-full p-2 border rounded-lg text-sm bg-white"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponInput}
                    className="bg-midgard-navy text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                  >
                    {couponLoading ? '...' : 'Aplicar'}
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-green-700 font-bold text-sm block">Cupón: {couponCode}</span>
                    <span className="text-green-600 text-xs">
                      Descuento activo ({couponDiscountType === 'percentage' ? `-${couponDiscountValue}%` : `-${couponDiscountValue}`})
                    </span>
                  </div>
                  <button onClick={removeCoupon} className="text-red-500 text-xs hover:underline font-semibold">
                    Quitar
                  </button>
                </div>
              )}
              {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-green-600 text-xs mt-1">{couponSuccess}</p>}
            </div>

                        <div className="border-t pt-4 mb-6">
              {couponCode && (
                <div className="flex justify-between text-sm mb-1 text-green-600">
                  <span>Descuento aplicado</span>
                  <span className="font-bold text-green-700">-${ (getSubtotal() - getTotalPrice()).toLocaleString('en-US') }</span>
                </div>
              )}
              {shippingCost > 0 && (
              <div className="flex justify-between text-sm mb-1 text-midgard-gray bg-gray-50 p-2 rounded-lg mt-2 border border-gray-100">
                <span>Envío (Transportes Castores)</span>
                <span className="font-bold text-gray-700">${shippingCost.toLocaleString('en-US')}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-midgard-navy mt-4 border-t pt-2">
              <span>Total Estimado</span>
              <span>${(getTotalPrice() + shippingCost).toLocaleString('en-US')} MXN</span>
            </div>
          </div>

          <button 
            onClick={() => {
              const sizeText = sizeType === 'standard' 
                ? (model === 'Asgard' ? '170 x 110 x 75 cm' : '170 x 100 x 75 cm')
                : `${customLength} x ${customWidth} x 75 cm`;
              
              const accessoriesList = [];
              if (accessories.led && isAsgard) accessoriesList.push('Sistema LED');
              if (accessories.cupholder > 0) accessoriesList.push(`${accessories.cupholder} Portavasos`);
              if (accessories.resourceBox > 0) accessoriesList.push(`${accessories.resourceBox} Cajas de Recursos`);
              if (accessories.extension > 0) accessoriesList.push(`${accessories.extension} Extensiones de Tablero individual`);
              if (accessories.drawer) accessoriesList.push('Cajón para superficies');
              const msgParts = [`¡Hola! Me interesa cotizar los siguientes muebles:\n\n`];
              
              if (activeProducts.table) {
                msgParts.push(`*--- MESA ${model} ---*\n` +
                  `- Tamaño: ${sizeText}\n` +
                  `- Tono de Madera: ${woodTexture}\n` +
                  `- Diseño de Estructura: ${structureStyle}\n` +
                  `- Acabado: ${finish}\n` +
                  `- Área de Juego: ${isCovered ? 'Con Tapas de Comedor' : `Tapete ${FELT_TEXTURES.find(c => c.id === matColor)?.name || matColor}`}\n` +
                  (accessoriesList.length > 0 ? `- Accesorios: ${accessoriesList.join(', ')}\n\n` : `\n`)
                );
              }

              if (activeProducts.shelf) {
                msgParts.push(`*--- ESTANTE ---*\n- Medida: 120 x 24 cm | Altura 180 cm\n- Tono: ${shelfWoodTexture}\n- Acabado: ${shelfFinish}\n\n`);
              }

              if (activeProducts.desk) {
                msgParts.push(`*--- ESCRITORIO ---*\n- Medida: 160 x 65 cm | Elevable 70-120 cm\n- Tono: ${deskWoodTexture}\n- Acabado: ${deskFinish}\n\n`);
              }

              if (!activeProducts.table && !activeProducts.shelf && !activeProducts.desk) {
                msgParts.push(`(No se seleccionó ningún mueble en la cotización)\n\n`);
              }

              msgParts.push(
                `*Envío:*\n${shippingState ? `${shippingState} ($${shippingCost.toLocaleString('en-US')} por Transportes Castores)` : 'Por definir'}\n\n` +
                `*Total Estimado:*\n$${(getTotalPrice() + shippingCost).toLocaleString('en-US')} MXN\n\n` +
                `Muchas gracias.`
              );
              
              const encoded = encodeURIComponent(msgParts.join(''));
              window.open(`https://wa.me/523314137429?text=${encoded}`, '_blank');
            }}
            className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-[#128C7E] transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            Enviar por WhatsApp <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {/* END RIGHT SIDE FLOATING UI */}
        </div>

        {/* BARRA INFERIOR MÓVIL: total + abrir resumen */}
        {!showSummary && (
          <button
            onClick={() => setShowSummary(true)}
            className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-midgard-navy text-white px-6 py-4 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
          >
            <span className="text-sm font-semibold uppercase tracking-wide">Ver resumen</span>
            <span className="font-bold flex items-center gap-1">
              ${(getTotalPrice() + shippingCost).toLocaleString('en-US')} MXN
              <ChevronRight className="w-4 h-4 -rotate-90" />
            </span>
          </button>
        )}

      </div>

    </div>
  );
}

export default function ConfiguradorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando configurador...</div>}>
      <ConfiguradorContent />
    </Suspense>
  );
}

