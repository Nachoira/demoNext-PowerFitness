'use server'
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export async function crearPago() {
  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: "Suplemento Gym - Prueba Real",
            quantity: 1,
            unit_price: 150, // <--- USÁ 150 PARA QUE EL BANCO NO TE REBOTE EL PAGO
            currency_id: 'ARS'
          }
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/success`,
          failure: `${process.env.NEXT_PUBLIC_URL}/cart`,
          pending: `${process.env.NEXT_PUBLIC_URL}/`
        },
        auto_return: 'approved',
      }
    });

    // Este es el link a la ventana azul de Mercado Pago
    return result.init_point;

  } catch (error) {
    console.error("Error en MP:", error);
    return null;
  }
}