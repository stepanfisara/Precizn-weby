import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { price_id, success_url, cancel_url, customer_info, mode } = JSON.parse(event.body || '{}');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode,
      line_items: [{ price: price_id, quantity: 1 }],
      success_url,
      cancel_url,
      customer_email: customer_info.email,
      metadata: {
        name: customer_info.name,
        phone: customer_info.phone,
        note: customer_info.note,
        plan: customer_info.plan
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe checkout session failed' }),
    };
  }
};
