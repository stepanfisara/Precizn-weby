import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const signature = event.headers['stripe-signature'];

  if (!signature) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing signature' }),
    };
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        
        // Here you can send confirmation emails, update your database, etc.
        console.log('Payment successful:', session);
        
        break;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error: any) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };