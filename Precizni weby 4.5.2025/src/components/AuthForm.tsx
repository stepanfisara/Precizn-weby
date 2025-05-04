import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (type === 'signup') {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setSuccess('Registration successful! You can now log in.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl border border-gray-700/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {type === 'login' ? 'Přihlášení' : 'Registrace'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
              placeholder="Zadejte email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300 ml-1">
              Heslo
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
              placeholder="Zadejte heslo"
            />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#3B82F6]/20"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              type === 'login' ? 'Přihlásit se' : 'Registrovat se'
            )}
          </button>

          <p className="text-center text-sm text-gray-400">
            {type === 'login' ? (
              <>
                Nemáte účet?{' '}
                <a href="/signup" className="text-[#3B82F6] hover:text-[#2563EB]">
                  Zaregistrujte se
                </a>
              </>
            ) : (
              <>
                Již máte účet?{' '}
                <a href="/login" className="text-[#3B82F6] hover:text-[#2563EB]">
                  Přihlaste se
                </a>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}