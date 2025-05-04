import { create } from 'zustand';
import { STRIPE_PRODUCTS, StripePlan } from '../stripe-config';

interface CartItem {
  plan: StripePlan;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (plan: StripePlan) => void;
  removeItem: (plan: StripePlan) => void;
  clearCart: () => void;
  total: () => number;
  isInCart: (plan: StripePlan) => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (plan) => {
    if (!get().isInCart(plan)) {
      set((state) => ({
        items: [...state.items, { plan, price: STRIPE_PRODUCTS[plan].deposit }],
      }));
    }
  },
  removeItem: (plan) => {
    set((state) => ({
      items: state.items.filter((item) => item.plan !== plan),
    }));
  },
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, item) => sum + item.price, 0),
  isInCart: (plan) => get().items.some((item) => item.plan === plan),
}));