'use server'
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export async function verificarPin (pinQueIngresaUsuario) {
  const claveCorrecta = process.env.ADMIN_PIN;

  if (pinQueIngresaUsuario===claveCorrecta){
    return true;
  }
    else {
           return  false;
    }
  }



export async function getPaymentLink(carrito) {
  const preference = new Preference(client);
  
  // Mapeamos los productos del carrito
  const items = carrito.map(p => ({
    title: p.nombre,
    quantity: 1,
    unit_price: Number(p.precio),
    currency_id: 'ARS',
  }));

  try {
    const result = await preference.create({
      body: {
        items: items,
        back_urls: {
          // USAMOS TU URL REAL DE VERCEL
          success: 'https://demo-next-power-fitness-uktw.vercel.app',
          failure: 'https://demo-next-power-fitness-uktw.vercel.app',
          pending: 'https://demo-next-power-fitness-uktw.vercel.app',
        },
        auto_return: 'approved',
      }
    });
    return result.init_point; 
  } catch (error) {
    console.error("Error Mercado Pago:", error);
    return null;
  }
}