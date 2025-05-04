"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: corsHeaders,
            body: '',
        };
    }
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
    try {
        const { price_id, success_url, cancel_url, mode, customer_info } = JSON.parse(event.body || '{}');
        if (!price_id || !success_url || !cancel_url || !mode || !customer_info) {
            return {
                statusCode: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Missing required parameters' }),
            };
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
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
        return {
            statusCode: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: session.url }),
        };
    }
    catch (error) {
        console.error('Stripe error:', error);
        return {
            statusCode: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: error.message || 'Internal server error' }),
        };
    }
};
exports.handler = handler;
