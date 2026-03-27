'use client'
import { useState } from 'react'

export default function AdminPanel() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')

  // Función de entrada simple para la demo
  const handleLogin = () => {
    if (pass === '1234') setAuth(true)
    else alert('PIN INCORRECTO')
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xs space-y-6 text-center">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            STAFF <span className="text-red-600">POWER</span>
          </h1>
          <div className="space-y-2">
            <input 
              type="password" 
              placeholder="INGRESE PIN" 
              className="bg-zinc-900 border-2 border-zinc-800 p-5 rounded-2xl w-full text-center font-bold text-xl focus:border-red-600 outline-none transition-all"
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button 
              onClick={handleLogin}
              className="bg-red-600 w-full py-4 rounded-2xl font-black uppercase italic hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
            >
              ACCEDER AL SISTEMA
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 font-sans">
      {/* HEADER DASHBOARD */}
      <header className="flex justify-between items-center mb-8 border-b border-zinc-900 pb-6">
        <div>
          <h1 className="text-2xl font-black italic uppercase leading-none">DASHBOARD</h1>
          <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Control de Inventario y Ventas</p>
        </div>
        <button onClick={() => window.location.href = '/'} className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-[10px] font-black uppercase italic">Salir</button>
      </header>

      <div className="grid gap-6">
        
        {/* MÉTRICAS RÁPIDAS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800">
            <p className="text-[9px] font-black text-zinc-500 uppercase mb-1">Ventas Hoy</p>
            <p className="text-2xl font-black italic">$142.500</p>
            <span className="text-[9px] text-green-500 font-bold">+12% vs ayer</span>
          </div>
          <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800">
            <p className="text-[9px] font-black text-zinc-500 uppercase mb-1">Pedidos Pendientes</p>
            <p className="text-2xl font-black italic text-red-600">05</p>
            <span className="text-[9px] text-zinc-600 font-bold">Por WhatsApp</span>
          </div>
        </div>

        {/* CONTROL DE STOCK VISUAL */}
        <div className="bg-zinc-950 p-6 rounded-[2.5rem] border border-zinc-900 shadow-2xl">
          <h2 className="text-xs font-black uppercase italic mb-6 text-zinc-400 tracking-widest">Estado del Stock</h2>
          
          <div className="space-y-6">
            {/* ITEM 1 */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span>Whey Protein Isolate</span>
                <span className="text-zinc-500">12 / 20</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full w-[60%] shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span>Creatina Monohidrato</span>
                <span className="text-red-500 font-bold italic">¡STOCK BAJO!</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full w-[15%] shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse"></div>
              </div>
            </div>

            {/* ITEM 3 */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span>BCAA 2:1:1</span>
                <span className="text-zinc-500">Full</span>
              </div>
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full w-[90%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ACCIONES DE ADMINISTRADOR */}
        <div className="grid grid-cols-1 gap-3">
          <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase italic text-[11px] hover:scale-[1.02] transition-transform">
            + Cargar Nuevo Producto
          </button>
          <button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-400 py-4 rounded-2xl font-black uppercase italic text-[11px]">
            Descargar Reporte Mensual
          </button>
        </div>

      </div>

      <footer className="mt-10 text-center">
        <p className="text-[8px] text-zinc-800 font-black uppercase tracking-[.5em]">Sistema de Gestión v1.0</p>
      </footer>
    </div>
  )
}