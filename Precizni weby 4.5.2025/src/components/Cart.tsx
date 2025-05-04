import { ShoppingCart, X, Shield } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { redirectToCheckout } from '../lib/stripe';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { t } = useTranslation();
  const { items, removeItem, total, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    try {
      setError(null);
      setIsLoading(true);
      await redirectToCheckout(items[0].plan);
    } catch (error: any) {
      console.error('Error during checkout:', error);
      setError(error.message || 'Došlo k chybě při zpracování platby. Zkuste to prosím znovu.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-800 p-4">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6 text-[#3B82F6]" />
              <h2 className="text-lg font-semibold">{t('cart.title')}</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingCart className="h-12 w-12 mb-4" />
                <p>{t('cart.empty')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.plan}
                    className="bg-gray-800 rounded-xl p-4 flex items-start justify-between"
                  >
                    <div>
                      <h3 className="font-semibold mb-1">{t(`pricing.${item.plan.toLowerCase()}.title`)}</h3>
                      <p className="text-[#3B82F6] font-semibold">{item.price.toLocaleString()} Kč</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-400 flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-[#3B82F6]" />
                          {t('cart.deposit.consultation')}
                        </p>
                        <p className="text-sm text-gray-400 flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-[#3B82F6]" />
                          {t('cart.deposit.analysis')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.plan)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-800 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{t('cart.total')}</span>
                <span className="text-xl font-bold text-[#3B82F6]">
                  {total().toLocaleString()} Kč
                </span>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-[#3B82F6] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2563EB] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t('cart.processing')}
                  </div>
                ) : (
                  t('cart.checkout')
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}