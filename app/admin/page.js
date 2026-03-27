'use client'
import { useState } from 'react'
import { verificarPin } from '../actions'

export default function AdminPanel() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  
  // ESTADO PARA MANEJAR LOS PRODUCTOS EN VIVO
  const [productos, setProductos] = useState([
    { id: 1, n: 'Whey Protein Isolate', p: 1000 },
    { id: 2, n: 'Creatina Monohidrato', p: 32000 },
    { id: 3, n: 'BCAA Aminoácidos', p: 28000 }
  ])

  // ESTADOS PARA EL FORMULARIO
  const [mostrarForm, setMostrarForm] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoPrecio, setNuevoPrecio] = useState('')

  // CÓDIGO LOGIN USANDO LA ACCIÓN DEL SERVIDOR
  const manejarLogin = async () => {
    setLoading(true)
    const esValido = await verificarPin(pass)
    if (esValido) {
      setAuth(true)
    } else {
      alert('PIN INCORRECTO')
      setPass('')
    }
    setLoading(false)
  }

  const agregarProducto = () => {
    if (!nuevoNombre || !nuevoPrecio) return alert("Completá todos los campos")
    
    const nuevo = {
      id: Date.now(),
      n: nuevoNombre,
      p: Number(nuevoPrecio)
    }

    setProductos([nuevo, ...productos])
    setNuevoNombre('')
    setNuevoPrecio('')
    setMostrarForm(false)
  }

  const eliminarProducto = (id) => {
    if(confirm("¿Seguro querés eliminarlo?")) {
      setProductos(productos.filter(p => p.id !== id))
    }
  }

  // PANTALLA DE LOGIN
  if (!auth) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-black mb-8 italic uppercase tracking-tighter">
          Acceso Staff <span className="text-red-600">Power Fitness</span>
        </h1>
        <input 
          type="password" 
          placeholder="PIN DE SEGURIDAD" 
          className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl mb-4 w-full max-w-xs text-center font-bold focus:border-red-600 outline-none transition-all"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && manejarLogin()}
        />
        <button 
          onClick={manejarLogin}
          disabled={loading}
          className="bg-white text-black w-full max-w-xs py-4 rounded-2xl font-black uppercase italic text-xs hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
        >
          {loading ? 'VERIFICANDO...' : 'ENTRAR AL EDITOR'}
        </button>
      </div>
    )
  }

  // PANEL DE CONTROL
  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans max-w-lg mx-auto">
      <div className="flex justify-between items-end mb-8 pt-4">
        <h1 className="text-2xl font-black italic uppercase leading-none text-red-600">Editor de Stock</h1>
        <button onClick={() => window.location.href = '/'} className="text-[10px] font-bold uppercase text-zinc-500 underline">Salir</button>
      </div>

      {mostrarForm ? (
        <div className="bg-zinc-900 p-6 rounded-3xl mb-8 border-2 border-red-600 animate-in fade-in zoom-in duration-200 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
          <h2 className="text-xs font-black uppercase mb-4">Nuevo Producto</h2>
          <input 
            type="text" 
            placeholder="Nombre del producto" 
            className="w-full bg-black p-4 rounded-xl mb-3 border border-zinc-800 text-sm font-bold"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Precio ($)" 
            className="w-full bg-black p-4 rounded-xl mb-4 border border-zinc-800 text-sm font-bold"
            value={nuevoPrecio}
            onChange={(e) => setNuevoPrecio(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={agregarProducto} className="flex-1 bg-green-600 py-3 rounded-xl font-black uppercase italic text-[10px]">Guardar</button>
            <button onClick={() => setMostrarForm(false)} className="flex-1 bg-zinc-800 py-3 rounded-xl font-black uppercase italic text-[10px]">Cancelar</button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setMostrarForm(true)}
          className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase italic text-xs mb-8 active:scale-95 transition-all shadow-lg shadow-red-600/20"
        >
          + Cargar Nuevo Producto
        </button>
      )}

      <div className="space-y-3">
        {productos.map((item) => (
          <div key={item.id} className="bg-zinc-950 border border-zinc-900 p-5 rounded-3xl flex justify-between items-center shadow-xl">
            <div className="flex flex-col">
              <span className="text-sm font-black uppercase italic mb-1">{item.n}</span>
              <span className="text-lg font-black text-red-600">${item.p.toLocaleString('es-AR')}</span>
            </div>
            <button 
              onClick={() => eliminarProducto(item.id)}
              className="bg-zinc-900 hover:bg-red-600 text-white px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-colors border border-zinc-800"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}