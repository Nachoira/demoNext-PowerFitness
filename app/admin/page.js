'use client'
import { useState } from 'react'

export default function AdminPanel() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')

  if (!auth) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-xl font-black mb-8 italic uppercase tracking-tighter text-red-600 text-center">
          SISTEMA DE GESTIÓN<br/><span className="text-white text-sm">POWER FITNESS</span>
        </h1>
        <input 
          type="password" 
          placeholder="PIN DE SEGURIDAD" 
          className="bg-zinc-900 border-2 border-zinc-800 p-5 rounded-2xl mb-4 w-full max-w-xs text-center font-bold"
          onChange={(e) => setPass(e.target.value)}
        />
        <button 
          onClick={() => pass === '1234' ? setAuth(true) : alert('PIN INCORRECTO')}
          className="bg-white text-black w-full max-w-xs py-4 rounded-2xl font-black uppercase italic text-xs hover:bg-zinc-200 transition-all"
        >
          ENTRAR AL EDITOR
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans max-w-lg mx-auto">
      {/* CABECERA SIMPLE */}
      <div className="flex justify-between items-end mb-8 pt-4">
        <h1 className="text-2xl font-black italic uppercase leading-none">Editor de Productos</h1>
        <button onClick={() => window.location.href = '/'} className="text-[10px] font-bold uppercase text-zinc-500 underline">Salir</button>
      </div>

      {/* BOTÓN AGREGAR (PRINCIPAL) */}
      <button className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase italic text-xs mb-8 shadow-lg shadow-red-600/20">
        + Cargar Nuevo Producto
      </button>

      {/* LISTA DE EDICIÓN */}
      <div className="space-y-3">
        {[
          { id: 1, n: 'Whey Protein Isolate', p: 45000 },
          { id: 2, n: 'Creatina Monohidrato', p: 32000 },
          { id: 3, n: 'BCAA Aminoácidos', p: 28000 }
        ].map((item) => (
          <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl flex justify-between items-center group">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Nombre</span>
              <span className="text-sm font-black uppercase italic mb-2">{item.n}</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Precio</span>
              <span className="text-lg font-black text-white">${item.p.toLocaleString('es-AR')}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <button className="bg-zinc-800 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-colors">
                Editar
              </button>
              <button className="bg-zinc-800 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-[8px] text-zinc-800 font-black uppercase tracking-widest">
        POWER FITNESS v1.0 - SIN BASE DE DATOS ACTIVA
      </p>
    </div>
  )
}