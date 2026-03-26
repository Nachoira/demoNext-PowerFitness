'use server'
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export async function getPaymentLink(producto) {
  const preference = new Preference(client);
  try {
    const result = await preference.create({
      body: {
        items: [{
          id: producto.id,
          title: producto.nombre,
          quantity: 1,
          unit_price: Number(producto.precio),
          currency_id: 'ARS',
        }],
        back_urls: {
          success: 'https://www.google.com.ar',
          failure: 'https://www.google.com.ar',
        },
        auto_return: 'approved',
      }
    });
    return result.init_point; 
  } catch (error) {
    console.error("Error MP:", error);
    return null;
  }
}