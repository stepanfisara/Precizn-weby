import { STRIPE_PRODUCTS, StripePlan } from '../stripe-config';

interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  note?: string;
}

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription', customerInfo: CustomerInfo) {
  try {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`,
        mode,
        customer_info: customerInfo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Chyba při vytváření platební relace');
    }

    const data = await response.json();
    if (!data.url) {
      throw new Error('Chybí URL pro přesměrování na platební bránu');
    }

    return data.url;
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
}

export async function redirectToCheckout(plan: StripePlan, customerInfo: CustomerInfo) {
  const product = STRIPE_PRODUCTS[plan];

  if (!product) {
    throw new Error('Neplatný plán');
  }

  try {
    const url = await createCheckoutSession(product.priceId, product.mode, customerInfo);
    window.location.href = url;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
}