'use client'
import { useState } from 'react';
import { getPaymentLink } from './actions';

export default function BotonPago({ producto }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const url = await getPaymentLink(producto);
    if (url) {
      window.location.href = url;
    } else {
      alert("Error de conexión");
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className={`w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-black py-4 uppercase tracking-wider text-[11px] transition-all rounded-xl ${loading ? 'opacity-70 animate-pulse' : ''}`}
    >
      {loading ? 'PROCESANDO...' : 'PAGAR AHORA'}
    </button>
  );
}