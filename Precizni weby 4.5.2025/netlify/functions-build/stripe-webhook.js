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
const handler = async (event) => {
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
        const stripeEvent = stripe.webhooks.constructEvent(event.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
        switch (stripeEvent.type) {
            case 'checkout.session.completed': {
                const session = stripeEvent.data.object;
                // Here you can send confirmation emails, update your database, etc.
                console.log('Payment successful:', session);
                break;
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ received: true }),
        };
    }
    catch (error) {
        console.error('Webhook error:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
exports.handler = handler;
