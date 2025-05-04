import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'cs' ? 'en' : 'cs';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm font-medium uppercase">{i18n.language === 'cs' ? 'EN' : 'CS'}</span>
    </button>
  );
}

export default LanguageSwitcher;