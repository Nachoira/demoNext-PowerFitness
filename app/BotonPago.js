'use client'
import { useState } from 'react';
import { crearPago } from './actions';

export default function BotonPago({ producto }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    // Si no viene un producto (por seguridad), mandamos el de prueba
    const itemData = producto ? {
      title: producto.nombre,
      quantity: 1,
      unit_price: producto.precio,
      currency_id: 'ARS'
    } : {
      title: "Suplemento Gym - Power Fitness",
      quantity: 1,
      unit_price: 150,
      currency_id: 'ARS'
    };

    const url = await crearPago([itemData]); // Lo mandamos como array

    if (url) {
      window.location.href = url;
    } else {
      alert("Error de conexión con Mercado Pago");
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className={`w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-black py-4 uppercase tracking-wider text-[11px] transition-all rounded-xl ${
        loading ? 'opacity-70 animate-pulse cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'PROCESANDO...' : 'PAGAR AHORA'}
    </button>
  );
}