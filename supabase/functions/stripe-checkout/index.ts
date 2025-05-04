import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Precizní Weby',
    version: '1.0.0',
  },
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

function corsResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    const { price_id, success_url, cancel_url, mode, customer_info } = await req.json();

    if (!price_id || !success_url || !cancel_url || !mode || !customer_info) {
      return corsResponse({ error: 'Missing required parameters' }, 400);
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode,
      success_url,
      cancel_url,
      locale: 'cs',
      customer_creation: 'always',
      customer_email: customer_info.email,
      payment_intent_data: {
        metadata: {
          customer_name: customer_info.name,
          customer_email: customer_info.email,
          customer_phone: customer_info.phone || '',
          customer_note: customer_info.note || '',
        },
      },
      metadata: {
        customer_name: customer_info.name,
        customer_email: customer_info.email,
        customer_phone: customer_info.phone || '',
        customer_note: customer_info.note || '',
      },
      phone_number_collection: {
        enabled: true,
      },
      custom_text: {
        submit: {
          message: 'Budeme Vás kontaktovat do 24 hodin pro zahájení práce na projektu.',
        },
      },
    });

    return corsResponse({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error: any) {
    console.error('Stripe error:', error);
    return corsResponse({ 
      error: error.message || 'Internal server error'
    }, 500);
  }
});