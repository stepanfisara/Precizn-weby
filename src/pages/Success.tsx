import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl border border-gray-700/50 backdrop-blur-sm text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Platba byla úspěšná!</h1>
        <p className="text-gray-400 mb-6">
          Děkujeme za vaši objednávku. Brzy začneme pracovat na vašem projektu.
        </p>
        <p className="text-sm text-gray-500">
          Přesměrování na hlavní stránku za {countdown} sekund...
        </p>
      </div>
    </div>
  );
}