'use client'
import { useState } from 'react';
import BotonPago from './BotonPago';

const PRODUCTOS = [
  { id: "1", nombre: "Proteína Whey Isolate", precio: 45000, imagen: "https://images.unsplash.com/photo-1593095194472-f2c23a0740ef?w=800" },
  { id: "2", nombre: "Creatina Monohidrato", precio: 32000, imagen: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800" },
  { id: "3", nombre: "BCAA Aminoácidos", precio: 28000, imagen: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800" }
];

export default function Home() {
  const [carrito, setCarrito] = useState([]);
  const [agregadoId, setAgregadoId] = useState(null);

  // FUNCIÓN CORREGIDA: Usa el estado previo para sumar correctamente cada clic
  const agregarAlCarrito = (p) => {
    setCarrito((prev) => [...prev, p]);
    setAgregadoId(p.id);
    setTimeout(() => setAgregadoId(null), 800);
  };

  const vaciarCarrito = () => setCarrito([]);
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  const enviarWhatsApp = () => {
    const telefono = "543810000000"; // CAMBIÁ POR TU NÚMERO (Sin el +)
    
    // Agrupar por cantidad para el mensaje
    const conteo = carrito.reduce((acc, p) => {
      acc[p.nombre] = (acc[p.nombre] || 0) + 1;
      return acc;
    }, {});

    const listaTexto = Object.entries(conteo)
      .map(([nombre, cant]) => `• ${cant}x ${nombre}`)
      .join('\n');

    const mensaje = encodeURIComponent(
      `💪 *NUEVO PEDIDO - POWER FITNESS*\n\n${listaTexto}\n\n*TOTAL: $${total.toLocaleString('es-AR')}*\n\n¿Tienen stock disponible?`
    );
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-5 pb-40 font-sans">
      
      {/* HEADER STICKY */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl mb-10 flex items-center justify-between border-b border-zinc-900 pb-5 pt-4">
        <div>
          <h1 className="text-2xl font-black italic uppercase text-white tracking-tighter leading-none">
            POWER<span className="text-red-600">FITNESS</span>
          </h1>
          <p className="text-[8px] text-zinc-600 font-bold tracking-[.3em] uppercase mt-1">Store Oficial</p>
        </div>
        
        <div className="text-right">
          <p className="text-[10px] font-black text-zinc-500 uppercase">Mi Pedido ({carrito.length})</p>
          <p className="text-xl font-black text-white leading-none">
            ${total.toLocaleString('es-AR')}
          </p>
        </div>
      </header>

      {/* GRILLA DE PRODUCTOS */}
      <div className="flex flex-col gap-10 max-w-sm mx-auto">
        {PRODUCTOS.map((p) => (
          <div key={p.id} className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all" />
              <div className="absolute top-3 left-3 bg-red-600 text-white font-black px-3 py-1 text-[10px] uppercase rounded italic tracking-tighter">STOCK</div>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-xl font-bold italic uppercase text-white leading-tight">{p.nombre}</h2>
                <span className="text-xl font-black text-white whitespace-nowrap">${p.precio.toLocaleString('es-AR')}</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Botón Pago Individual */}
                <BotonPago producto={p} />
                
                {/* Botón Sumar al Carrito */}
                <button 
                  onClick={() => agregarAlCarrito(p)}
                  className={`w-full font-black py-4 rounded-xl text-[11px] uppercase transition-all active:scale-95 border flex items-center justify-center gap-2 ${
                    agregadoId === p.id 
                    ? "bg-green-600 border-green-500 text-white" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 active:bg-zinc-800"
                  }`}
                >
                  {agregadoId === p.id ? "¡Agregado!" : "+ Sumar al pedido"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER FLOTANTE WHATSAPP */}
      {carrito.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-zinc-900 border border-green-500/30 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 animate-in slide-in-from-bottom-10">
          <div className="flex justify-between items-center mb-5 border-b border-zinc-800 pb-3">
            <div>
              <p className="text-[10px] font-black text-green-500 uppercase italic">Confirmar WhatsApp</p>
              <p className="text-2xl font-black text-white">${total.toLocaleString('es-AR')}</p>
            </div>
            <button onClick={vaciarCarrito} className="text-[10px] font-bold text-zinc-600 underline uppercase">Limpiar</button>
          </div>

          <button 
            onClick={enviarWhatsApp}
            className="w-full bg-green-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 uppercase italic text-xs tracking-tighter shadow-xl active:scale-95 transition-all"
          >
            Finalizar pedido
          </button>
        </div>
      )}
    </main>
  );
}