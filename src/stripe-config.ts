import { z } from 'zod';

const StripePlanSchema = z.enum(['BASIC', 'BUSINESS', 'PREMIUM', 'ESHOP']);
export type StripePlan = z.infer<typeof StripePlanSchema>;

export const STRIPE_PRODUCTS = {
  BASIC: {
    id: 'prod_SFHBhzoRMgp5YE',
    priceId: 'price_1RL5PgLdqEyJy5U9k2uOjrTB',
    name: 'Basic Plán',
    description: 'Záloha pro plán Basic',
    fullPrice: 5699,
    deposit: 35,
    mode: 'payment' as const
  },
  BUSINESS: {
    id: 'prod_SFHCqODLyAyKGQ',
    priceId: 'price_1RKmdxLdqEyJy5U94dCzTkIz',
    name: 'Business Plán', 
    description: 'Záloha pro plán Business',
    fullPrice: 8999,
    deposit: 3000,
    mode: 'payment' as const
  },
  PREMIUM: {
    id: 'prod_SFHC8hfUsbO609',
    priceId: 'price_1RKmeNLdqEyJy5U9bSuC9cSA',
    name: 'Premium Plán',
    description: 'Záloha pro plán Premium',
    fullPrice: 14999,
    deposit: 5000,
    mode: 'payment' as const
  },
  ESHOP: {
    id: 'prod_SFHDeuYtmJSjij',
    priceId: 'price_1RKmeaLdqEyJy5U9v8Mc3kYw',
    name: 'E-shop',
    description: 'Záloha pro E-shop',
    fullPrice: 17500,
    deposit: 6000,
    mode: 'payment' as const
  }
} as const;