import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Code2, Palette, Rocket, Shield, ChevronDown, Menu, X as Close, Briefcase, Store, Layout, Phone, Mail, Facebook, Instagram, Construction, Zap, FileCode } from 'lucide-react';
import ContactForm from './components/ContactForm';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import Success from './pages/Success';
import CheckoutForm from './components/CheckoutForm';
import { StripePlan } from './stripe-config';

function MainContent() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState<StripePlan | null>(null);

  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setNavVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    const path = window.location.pathname;
    const pathToSection: { [key: string]: string } = {
      '/': 'home',
      '/navrhy': 'portfolio',
      '/sluzby': 'services',
      '/cenik': 'pricing',
      '/kontakt': 'contact',
      '/faq': 'faq'
    };

    const sectionId = pathToSection[path] || 'home';
    setCurrentSection(sectionId);

    if (sectionId !== 'home') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }, 100);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getMetaData = () => {
    const baseUrl = 'https://precizniweby.cz';
    const sections = {
      home: {
        title: 'Precizní Weby - Tvoříme weby, co prodávají',
        description: 'Vytváříme prémiové webové stránky, které překonávají očekávání. Profesionální webové řešení pro firmy a podnikatele.',
        path: '/'
      },
      services: {
        title: 'Naše služby | Precizní Weby',
        description: 'Nabízíme profesionální vývoj webových stránek, moderní design a optimalizaci pro vyhledávače. Kompletní webová řešení pro váš business.',
        path: '/sluzby'
      },
      portfolio: {
        title: 'Návrhy a realizace | Precizní Weby',
        description: 'Prohlédněte si naše úspěšné projekty. Tvoříme weby pro firmy, e-shopy i osobní prezentace.',
        path: '/navrhy'
      },
      pricing: {
        title: 'Ceník služeb | Precizní Weby',
        description: 'Transparentní ceník našich služeb. Nabízíme různé balíčky pro různé potřeby a rozpočty.',
        path: '/cenik'
      },
      contact: {
        title: 'Kontakt | Precizní Weby',
        description: 'Kontaktujte nás pro nezávaznou konzultaci. Pomůžeme vám s realizací vašeho webového projektu.',
        path: '/kontakt'
      },
      faq: {
        title: 'Časté dotazy | Precizní Weby',
        description: 'Odpovědi na nejčastější dotazy ohledně tvorby webových stránek, cen a procesu realizace.',
        path: '/faq'
      }
    };

    return sections[currentSection as keyof typeof sections] || sections.home;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      
      const sectionToPath: { [key: string]: string } = {
        'portfolio': '/navrhy',
        'services': '/sluzby',
        'pricing': '/cenik',
        'contact': '/kontakt',
        'faq': '/faq'
      };

      const newPath = sectionToPath[id] || '/';
      window.history.pushState({}, '', newPath);
      setCurrentSection(id);
    }
  };

  const metaData = getMetaData();

  const navItems = [
    { name: t('nav.services'), id: 'services' },
    { name: t('nav.portfolio'), id: 'portfolio' },
    { name: t('nav.pricing'), id: 'pricing' },
    { name: t('nav.faq'), id: 'faq' },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: t('portfolio.items.construction.title'),
      category: 'zednici',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070',
      description: t('portfolio.items.construction.description'),
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
      previousWork: {
        title: t('portfolio.items.construction.previousWork.title'),
        url: 'https://stavebninybivals.cz/',
        description: t('portfolio.items.construction.previousWork.description')
      }
    },
    {
      id: 2,
      title: t('portfolio.items.business.title'),
      category: 'firemni',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070',
      description: t('portfolio.items.business.description'),
      technologies: ['React', 'Tailwind CSS', 'Framer Motion']
    },
    {
      id: 4,
      title: t('portfolio.items.eshop.title'),
      category: 'e-shop',
      image: 'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?auto=format&fit=crop&q=80&w=2070',
      description: t('portfolio.items.eshop.description'),
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Algolia']
    },
    {
      id: 5,
      title: t('portfolio.items.gastro.title'),
      category: 'firemni',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070',
      description: t('portfolio.items.gastro.description'),
      technologies: ['React', 'Styled Components', 'Firebase'],
      previousWork: {
        title: t('portfolio.items.gastro.previousWork.title'),
        url: 'https://www.bistromocart.com/',
        description: t('portfolio.items.gastro.previousWork.description')
      }
    },
    {
      id: 6,
      title: t('portfolio.items.construction2.title'),
      category: 'zednici',
      image: 'https://i.imgur.com/HhRFib9.jpeg',
      description: t('portfolio.items.construction2.description'),
      technologies: ['React', 'Tailwind CSS', 'Next.js'],
      previousWork: {
        title: t('portfolio.items.construction2.previousWork.title'),
        url: 'https://stavebninybivals.cz/',
        description: t('portfolio.items.construction2.previousWork.description')
      }
    },
    {
      id: 7,
      title: t('portfolio.items.electrical.title'),
      category: 'elektrikari',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2069',
      description: t('portfolio.items.electrical.description'),
      technologies: ['React', 'Tailwind CSS', 'Firebase']
    },
    {
      id: 8,
      title: t('portfolio.items.custom.title'),
      category: 'zakazkove',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070',
      description: t('portfolio.items.custom.description'),
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Supabase']
    }
  ];

  const filteredPortfolio = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const openLightbox = (project: any) => {
    setCurrentProject(project);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const pricingPlans = [
    {
      plan: 'BASIC' as StripePlan,
      title: t('pricing.basic.title'),
      fullPrice: 5699,
      deposit: 1500,
      icon: <Code2 className="w-12 h-12" />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
      features: [
        t('pricing.basic.features.1'),
        t('pricing.basic.features.2'),
        t('pricing.basic.features.3'),
        t('pricing.basic.features.4'),
        t('pricing.basic.features.5')
      ]
    },
    {
      plan: 'BUSINESS' as StripePlan,
      title: t('pricing.business.title'),
      fullPrice: 8999,
      deposit: 3000,
      icon: <Briefcase className="w-12 h-12" />,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2072',
      features: [
        t('pricing.business.features.1'),
        t('pricing.business.features.2'),
        t('pricing.business.features.3'),
        t('pricing.business.features.4'),
        t('pricing.business.features.5'),
        t('pricing.business.features.6')
      ]
    },
    {
      plan: 'PREMIUM' as StripePlan,
      title: t('pricing.premium.title'),
      fullPrice: 14999,
      deposit: 5000,
      icon: <Store className="w-12 h-12" />,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070',
      features: [
        t('pricing.premium.features.1'),
        t('pricing.premium.features.2'),
        t('pricing.premium.features.3'),
        t('pricing.premium.features.4'),
        t('pricing.premium.features.5'),
        t('pricing.premium.features.6')
      ]
    },
    {
      plan: 'ESHOP' as StripePlan,
      title: t('pricing.eshop.title'),
      fullPrice: 17500,
      deposit: 6500,
      icon: <Store className="w-12 h-12" />,
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=2070',
      features: [
        t('pricing.eshop.features.1'),
        t('pricing.eshop.features.2'),
        t('pricing.eshop.features.3'),
        t('pricing.eshop.features.4'),
        t('pricing.eshop.features.5'),
        t('pricing.eshop.features.6')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <link rel="canonical" href={`https://precizniweby.cz${metaData.path}`} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://precizniweby.cz${metaData.path}`} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://precizniweby.cz${metaData.path}`} />
        <meta property="twitter:title" content={metaData.title} />
        <meta property="twitter:description" content={metaData.description} />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200" />
      </Helmet>

      <nav className={`fixed w-full z-50 bg-black/90 backdrop-blur-sm transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('top')}>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-[#3B82F6]" />
                <span className="text-xl font-bold text-white">Precizní<span className="text-[#3B82F6]">Weby</span></span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-[#3B82F6] transition-colors duration-200 relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3B82F6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-[#3B82F6] text-white px-6 py-2 rounded-full font-medium hover:bg-[#2563EB] transition-all duration-200 transform hover:scale-105"
              >
                {t('nav.contact')}
              </button>
              <LanguageSwitcher />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-[#3B82F6] transition-colors duration-200"
              >
                {mobileMenuOpen ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden absolute w-full bg-black/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-64' : 'max-h-0 overflow-hidden'
          }`}
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-[#3B82F6] transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-2 text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-200"
            >
              {t('nav.contact')}
            </button>
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <header id="top" className="relative h-screen flex items-center justify-center overflow-hidden section-animate">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=2069&brightness=165"
            alt={t('hero.title')}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-delay">
            {t('hero.subtitle')}
          </p>
          <button 
            onClick={() => scrollToSection('services')}
            className="bg-[#3B82F6] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#2563EB] transition-all duration-300 transform hover:scale-105 animate-fade-in-delay-2"
          >
            {t('hero.cta')}
          </button>
        </div>
      </header>

      <div className="section-divider" />

      <section id="services" className="py-20 px-4 relative overflow-hidden section-animate delay-100">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="max-w-6xl mx-auto relative z-10" ref={setRef}>
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">{t('services.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="w-8 h-8" />,
                title: t('services.development.title'),
                desc: t('services.development.desc'),
                details: [
                  t('services.development.details.1'),
                  t('services.development.details.2'),
                  t('services.development.details.3'),
                  t('services.development.details.4'),
                ],
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072'
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: t('services.design.title'),
                desc: t('services.design.desc'),
                details: [
                  t('services.design.details.1'),
                  t('services.design.details.2'),
                  t('services.design.details.3'),
                  t('services.design.details.4'),
                ],
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2064'
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: t('services.optimization.title'),
                desc: t('services.optimization.desc'),
                details: [
                  t('services.optimization.details.1'),
                  t('services.optimization.details.2'),
                  t('services.optimization.details.3'),
                  t('services.optimization.details.4'),
                ],
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015'
              },
            ].map((service, index) => (
              <div 
                key={index} 
                className={`service-card bg-gray-900 rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="service-icon text-[#3B82F6] mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.desc}</p>
                  <ul className="space-y-3">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <Shield className="w-4 h-4 text-[#3B82F6] mr-2" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="portfolio" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 section-animate delay-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">{t('portfolio.title')}</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === 'all' 
                  ? 'bg-[#3B82F6] text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {t('portfolio.filters.all')}
            </button>
            <button 
              onClick={() => setActiveFilter('e-shop')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === 'e-shop' 
                  ? 'bg-[#3B82F6] text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Store className="w-4 h-4 inline-block mr-2" />
              {t('portfolio.filters.eshop')}
            </button>
            <button 
              onClick={() => setActiveFilter('firemni')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === 'firemni' 
                  ? 'bg-[#3B82F6] text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Briefcase className="w-4 h-4 inline-block mr-2" />
              {t('portfolio.filters.business')}
            </button>
            <button 
              onClick={() => setActiveFilter('zednici')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === 'zednici' 
                  ? 'bg-[#3B82F6] text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Construction className="w-4 h-4 inline-block mr-2" />
              
              {t('portfolio.filters.construction')}
            </button>
            <button 
              onClick={() => setActiveFilter('elektrikari')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === 'elektrikari' 
                  ? 'bg-[#3B82F6] text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Zap className="w-4 h-4 inline-block mr-2" />
              {t('portfolio.filters.electrical')}
            </button>
            <button 
              onClick={() => setActiveFilter('zakazkove')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === 'zakazkove' 
                  ? 'bg-[#3B82F6] text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <FileCode className="w-4 h-4 inline-block mr-2" />
              {t('portfolio.filters.custom')}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((project, index) => (
              <div 
                key={project.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-[#3B82F6]/20 transition-all duration-300 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openLightbox(project)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.category === 'e-shop' ? 'bg-purple-600' :
                      project.category === 'firemni' ? 'bg-blue-600' :
                      project.category === 'zednici' ? 'bg-amber-600' :
                      project.category === 'elektrikari' ? 'bg-yellow-600' :
                      'bg-green-600'
                    }`}>
                      {project.category === 'e-shop' ? t('portfolio.categories.eshop') :
                       project.category === 'firemni' ? t('portfolio.categories.business') :
                       project.category === 'zednici' ? t('portfolio.categories.construction') :
                       project.category === 'elektrikari' ? t('portfolio.categories.electrical') :
                       t('portfolio.categories.custom')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPortfolio.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">{t('portfolio.noProjects')}</p>
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 section-animate">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">{t('pricing.title')}</h2>
          
          <div className="mb-12 bg-gray-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-[#3B82F6]">{t('pricing.deposit.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Shield className="w-5 h-5 text-[#3B82F6] mr-2" />
                {t('pricing.deposit.consultation')}
              </li>
              <li className="flex items-center">
                <Shield className="w-5 h-5 text-[#3B82F6] mr-2" />
                {t('pricing.deposit.analysis')}
              </li>
              <li className="flex items-center">
                <Shield className="w-5 h-5 text-[#3B82F6] mr-2" />
                {t('pricing.deposit.design')}
              </li>
              <li className="flex items-center">
                <Shield className="w-5 h-5 text-[#3B82F6] mr-2" />
                {t('pricing.deposit.estimate')}
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-400">{t('pricing.deposit.note')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="pricing-card bg-black p-8 rounded-2xl border border-[#3B82F6] hover:border-[#2563EB] transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                <div className="relative h-48 -mx-8 -mt-8 mb-8 rounded-t-2xl overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
                  <div className="absolute bottom-4 left-8 text-[#3B82F6]">
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <div className="mb-6">
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="text-sm text-gray-400">{t('pricing.fullPriceLabel')}</p>
                      <p className="text-2xl font-bold text-white">{plan.fullPrice.toLocaleString()} Kč</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{t('pricing.depositLabel')}</p>
                      <p className="text-3xl font-bold text-[#3B82F6]">{plan.deposit.toLocaleString()} Kč</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Shield className="w-5 h-5 text-[#3B82F6] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setSelectedPlan(plan.plan)}
                  className="w-full bg-[#3B82F6] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2563EB] transition-all duration-300 transform hover:scale-105 mt-auto"
                >
                  {t('pricing.selectPlan')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="faq" className="py-20 px-4 section-animate delay-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">{t('faq.title')}</h2>
          <div className="space-y-4">
            {[
              {
                question: t('faq.q1'),
                answer: t('faq.a1')
              },
              {
                question: t('faq.q2'),
                answer: t('faq.a2')
              },
              {
                question: t('faq.q3'),
                answer: t('faq.a3')
              },
              {
                question: t('faq.q4'),
                answer: t('faq.a4')
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item bg-gray-900 rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:shadow-[#3B82F6]/20">
                <button
                  className="w-full p-6 text-left flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#3B82F6] transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-300 ${
                    openFaq === index ? 'pb-6 max-h-40' : 'max-h-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section id="contact" className="py-20 px-4 bg-gradient-to-t from-gray-900 to-black section-animate delay-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">{t('contact.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="contact-card flex items-center space-x-4 p-6 bg-gray-900 rounded-2xl">
                <div className="contact-icon bg-[#3B82F6]/20 p-4 rounded-full">
                  <Phone className="w-8 h-8 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{t('contact.phone')}</h3>
                  <a href="tel:+420734398632" className="text-gray-300 hover:text-[#3B82F6] transition-colors duration-300">
                    +420 734 398 632
                  </a>
                </div>
              </div>
              
              <div className="contact-card flex items-center space-x-4 p-6 bg-gray-900 rounded-2xl">
                <div className="contact-icon bg-[#3B82F6]/20 p-4 rounded-full">
                  <Mail className="w-8 h-8 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{t('contact.email')}</h3>
                  <a href="mailto:precizniweby@gmail.com" className="text-gray-300 hover:text-[#3B82F6] transition-colors duration-300">
                    precizniweby@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="contact-card flex items-center space-x-4 p-6 bg-gray-900 rounded-2xl">
                <div className="contact-icon bg-[#3B82F6]/20 p-4 rounded-full">
                  <Facebook className="w-8 h-8 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{t('contact.facebook')}</h3>
                  <a href="https://www.facebook.com/share/1AwguBLmZd/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#3B82F6] transition-colors duration-300">
                    {t('contact.visitFacebook')}
                  </a>
                </div>
              </div>
              
              <div className="contact-card flex items-center space-x-4 p-6 bg-gray-900 rounded-2xl">
                <div className="contact-icon bg-[#3B82F6]/20 p-4 rounded-full">
                  <Instagram className="w-8 h-8 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{t('contact.instagram')}</h3>
                  <a href="https://www.instagram.com/precizniweby?igsh=NjY4OWR4ejczeGFk&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#3B82F6] transition-colors duration-300">
                    {t('contact.followInstagram')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <ContactForm />
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">{t('contact.callToAction')}</p>
            <a 
              href="https://wa.me/420734398632"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary bg-[#3B82F6] text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#2563EB] inline-block"
            >
              {t('contact.writeUs')}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>

      {lightboxOpen && currentProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div 
            className="max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100" 
            onClick={e => e.stopPropagation()}
          >
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{currentProject.title}</h3>
              <p className="text-gray-400 mb-6">{currentProject.description}</p>
              
              {currentProject.previousWork && (
                <div className="mb-6 p-4 bg-[#3B82F6]/10 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">{currentProject.previousWork.title}</h4>
                  <p className="text-gray-400 mb-3">{currentProject.previousWork.description}</p>
                  <a 
                    href={currentProject.previousWork.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#3B82F6] hover:text-[#2563EB] transition-colors duration-300"
                  >
                    {t('portfolio.viewProject')}
                    <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
                  </a>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech: string, index: number) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-sm transform hover:scale-105 transition-transform duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPlan && (
        <CheckoutForm 
          plan={selectedPlan} 
          onClose={() => setSelectedPlan(null)} 
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;