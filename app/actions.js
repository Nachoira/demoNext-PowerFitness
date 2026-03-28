'use server'
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

// Función principal de pago
// Ahora acepta "items" para que puedas pagar uno solo o todo el carrito
export async function crearPago(items) {
  try {
    const preference = new Preference(client);

    // Si no vienen items (por seguridad), mandamos uno de prueba
    const itemsFinales = items && items.length > 0 ? items : [
      {
        title: "Suplemento Gym - Power Fitness",
        quantity: 1,
        unit_price: 150, 
        currency_id: 'ARS'
      }
    ];

    const result = await preference.create({
      body: {
        items: itemsFinales,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/success`,
          failure: `${process.env.NEXT_PUBLIC_URL}/cart`,
          pending: `${process.env.NEXT_PUBLIC_URL}/`
        },
        auto_return: 'approved',
      }
    });

    return result.init_point;

  } catch (error) {
    console.error("Error en MP:", error);
    return null;
  }
}

// Agregamos esta función para que el build del Admin no explote
export async function verificarPin(pin) {
  // Cambiá "1234" por el pin que quieras usar para tu panel
  return pin === ADMIN_PIN;
}

// Creamos un alias por si algún componente todavía busca 'getPaymentLink'
export const getPaymentLink = crearPago;