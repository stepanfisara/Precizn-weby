import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const { t } = useTranslation();
  const form = useRef();
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm('service_brpm6xh', 'template_j2fahae', form.current, 'KNQZfUjiIlBUqRxcf')
      .then((result) => {
        console.log(t('form.successLog'), result.text);
        setSubmitStatus('success');
        form.current.reset();
      }, (error) => {
        console.error(t('form.errorLog'), error.text);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl border border-gray-700/50 backdrop-blur-sm">
        <form ref={form} onSubmit={sendEmail} id="contact-form" className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">
              {t('form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200 placeholder:text-gray-500"
              placeholder={t('form.namePlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
              {t('form.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200 placeholder:text-gray-500"
              placeholder={t('form.emailPlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-300 ml-1">
              {t('form.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200 placeholder:text-gray-500"
              placeholder={t('form.phonePlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">
              {t('form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200 placeholder:text-gray-500 resize-none"
              placeholder={t('form.messagePlaceholder')}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#3B82F6]/20 group"
          >
            <span className="mr-2">{t('form.submit')}</span>
            <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {submitStatus === 'success' && (
            <div className="flex items-center justify-center space-x-2 text-emerald-400 bg-emerald-400/10 py-3 px-4 rounded-xl mt-4 animate-fade-in">
              <CheckCircle className="w-5 h-5" />
              <span>{t('form.successMessage')}</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center justify-center space-x-2 text-red-400 bg-red-400/10 py-3 px-4 rounded-xl mt-4 animate-fade-in">
              <XCircle className="w-5 h-5" />
              <span>{t('form.errorMessage')}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}