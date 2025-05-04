import { useState } from 'react';
import { X as Close } from 'lucide-react';
import { StripePlan } from '../stripe-config';
import { redirectToCheckout } from '../lib/stripe';

interface CheckoutFormProps {
  plan: StripePlan;
  onClose: () => void;
}

export default function CheckoutForm({ plan, onClose }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    note: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await redirectToCheckout(plan, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        note: formData.note
      });
    } catch (err: any) {
      setError(err.message || 'Došlo k chybě při zpracování platby');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <Close className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Kontaktní údaje</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Jméno a příjmení *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Jan Novák"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="jan@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="+420 123 456 789"
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-1">
              Poznámka
            </label>
            <textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
              rows={3}
              placeholder="Další požadavky nebo poznámky k objednávce..."
            />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Zpracování...
              </div>
            ) : (
              'Pokračovat k platbě'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}