import React, { useState, useEffect, useRef } from 'react';
import { Code2, Palette, Rocket, Shield, ChevronDown, Menu, X as Close, Briefcase, Store, Layout, Phone, Mail, Facebook, Instagram, Construction, Zap, FileCode } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

function App() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [navVisible, setNavVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / scrollHeight) * 100;
      
      setScrollProgress(progress);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Naše služby', id: 'services' },
    { name: 'Návrhy', id: 'portfolio' },
    { name: 'Ceník', id: 'pricing' },
    { name: 'FAQ', id: 'faq' },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'E-shop s módou',
      category: 'e-shop',
      image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80&w=2070',
      description: 'Moderní e-shop s responzivním designem a pokročilými funkcemi pro filtrování produktů.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Stripe']
    },
    {
      id: 2,
      title: 'FIREMNÍ WEB',
      category: 'firemni',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070',
      description: 'Profesionální prezentace IT společnosti s důrazem na přehlednost a konverze.',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion']
    },
    {
      id: 4,
      title: 'E-shop s elektronikou',
      category: 'e-shop',
      image: 'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?auto=format&fit=crop&q=80&w=2070',
      description: 'Komplexní e-shop s tisíci produkty a pokročilým vyhledáváním.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Algolia']
    },
    {
      id: 5,
      title: 'Web pro Gastro',
      category: 'firemni',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070',
      description: 'Elegantní web s online rezervacemi a prezentací menu.',
      technologies: ['React', 'Styled Components', 'Firebase']
    },
    {
      id: 6,
      title: 'Web pro zedníky',
      category: 'zednici',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070',
      description: 'Profesionální webová prezentace pro stavební firmu a zednické práce.',
      technologies: ['React', 'Tailwind CSS', 'Next.js']
    },
    {
      id: 7,
      title: 'Web pro elektrikáře',
      category: 'elektrikari',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2069',
      description: 'Moderní web pro elektrikářské služby s online objednávkovým systémem.',
      technologies: ['React', 'Tailwind CSS', 'Firebase']
    },
    {
      id: 8,
      title: 'Zakázkový web',
      category: 'zakazkove',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070',
      description: 'Unikátní web na míru s vlastními funkcemi a designem podle požadavků klienta.',
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

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Fixed Navigation Header */}
      <nav className={`fixed w-full z-50 bg-black/90 backdrop-blur-sm transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('top')}>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-[#3B82F6]" />
                <span className="text-xl font-bold text-white">Precizní<span className="text-[#3B82F6]">Weby</span></span>
              </div>
            </div>

            {/* Desktop Navigation */}
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
                Kontakt
              </button>
            </div>

            {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
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
              Kontakt
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="top" className="relative h-screen flex items-center justify-center overflow-hidden section-animate">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=2069&brightness=165"
            alt="Tvoříme weby, co prodávají"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
            Tvoříme weby, co prodávají
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-delay">
            Vytváříme prémiové webové stránky, které překonávají očekávání
          </p>
          <button 
            onClick={() => scrollToSection('services')}
            className="bg-[#3B82F6] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#2563EB] transition-all duration-300 transform hover:scale-105 animate-fade-in-delay-2"
          >
            Začněte s námi
          </button>
        </div>
      </header>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Services Section */}
      <section id="services" className="py-20 px-4 relative overflow-hidden section-animate delay-100" ref={ref}>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">Naše služby</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="w-8 h-8" />,
                title: 'Vývoj webu',
                desc: 'Moderní a responzivní webové aplikace',
                details: [
                  'React & Next.js development',
                  'Progressive Web Apps (PWA)',
                  'Responzivní design pro všechna zařízení',
                  'Optimalizace výkonu a SEO',
                ],
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072'
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: 'Design',
                desc: 'Unikátní a prémiový vzhled',
                details: [
                  'UI/UX Design',
                  'Brandová identita',
                  'Prototypování',
                  'Design systémy',
                ],
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2064'
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: 'Optimalizace',
                desc: 'Maximální výkon a rychlost',
                details: [
                  'Performance audit',
                  'Core Web Vitals',
                  'SEO optimalizace',
                  'Analytika a reporting',
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

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 section-animate delay-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">Návrhy</h2>
          
          {/* Portfolio Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === 'all' 
                  ? 'bg-[#3B82F6] text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Všechny projekty
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
              E-shopy
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
              Firemní weby
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
              Weby pro zedníky
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
              Weby pro elektrikáře
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
              Zakázkové weby
            </button>
          </div>
          
          {/* Portfolio Grid */}
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
                      {project.category === 'e-shop' ? 'E-shop' :
                       project.category === 'firemni' ? 'Firemní web' :
                       project.category === 'zednici' ? 'Web pro zedníky' :
                       project.category === 'elektrikari' ? 'Web pro elektrikáře' :
                       'Zakázkový web'}
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
              <p className="text-gray-400">Žádné projekty v této kategorii</p>
            </div>
          )}
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 section-animate">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">Cenové balíčky</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Basic',
                price: 4799,
                icon: <Code2 className="w-12 h-12" />,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
                features: ['5 podstránek', 'Responzivní design', 'SEO optimalizace', 'SSL certifikát', 'Základní analytika']
              },
              {
                title: 'Business',
                price: 7999,
                icon: <Briefcase className="w-12 h-12" />,
                image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2072',
                features: ['10 podstránek', 'Pokročilé SEO', 'Analytika', 'Správa obsahu', 'E-mailový marketing', 'Sociální sítě']
              },
              {
                title: 'Premium',
                price: 15999,
                icon: <Store className="w-12 h-12" />,
                image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070',
                features: ['Neomezené podstránky', 'E-shop funkcionalita', 'Premium podpora', 'Vlastní funkce', 'Vícejazyčnost', 'API integrace']
              },
            ].map((plan, index) => (
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
                  <p className="text-3xl font-bold text-[#3B82F6]">{plan.price.toLocaleString()} Kč</p>
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
                  onClick={() => scrollToSection('contact')}
                  className="button-primary w-full bg-[#3B82F6] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2563EB] transition-all duration-300 transform hover:scale-105 mt-auto"
                >
                  Vybrat plán
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 section-animate delay-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">Časté dotazy</h2>
          <div className="space-y-4">
            {[
              {
                question: 'Jak dlouho trvá vytvoření webových stránek?',
                answer: 'Doba realizace se odvíjí od komplexnosti projektu. Běžně je to 4-8 týdnů od schválení designu po spuštění.'
              },
              {
                question: 'Jaké technologie používáte?',
                answer: 'Využíváme nejmodernější technologie jako React, Next.js, Tailwind CSS a další. Vždy volíme řešení, které nejlépe odpovídá potřebám projektu.'
              },
              {
                question: 'Poskytujete podporu po spuštění?',
                answer: 'Ano, nabízíme různé úrovně podpory od základní až po prémiovou 24/7 podporu.'
              },
              {
                question: 'Mohu web později rozšířit?',
                answer: 'Samozřejmě! Naše řešení jsou modulární a lze je kdykoliv rozšířit o další funkce.'
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item bg-gray-900 rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:shadow-[#3B82F6]/20">
                <button
                  className="w-full p-6 text-left flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#3B82F6] transform transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
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

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-t from-gray-900 to-black section-animate delay-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#3B82F6]">Kontaktujte nás</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="contact-card flex items-center space-x-4 p-6 bg-gray-900 rounded-2xl">
                <div className="contact-icon bg-[#3B82F6]/20 p-4 rounded-full">
                  <Phone className="w-8 h-8 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Telefon</h3>
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
                  <h3 className="text-xl font-semibold mb-1">Email</h3>
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
                  <h3 className="text-xl font-semibold mb-1">Facebook</h3>
                  <a href="https://www.facebook.com/share/1AwguBLmZd/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#3B82F6] transition-colors duration-300">
                    Navštivte náš Facebook
                  </a>
                </div>
              </div>
              
              <div className="contact-card flex items-center space-x-4 p-6 bg-gray-900 rounded-2xl">
                <div className="contact-icon bg-[#3B82F6]/20 p-4 rounded-full">
                  <Instagram className="w-8 h-8 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Instagram</h3>
                  <a href="https://www.instagram.com/precizniweby?igsh=NjY4OWR4ejczeGFk&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#3B82F6] transition-colors duration-300">
                    Sledujte nás na Instagramu
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">Ozvěte se nám a společně vytvoříme web, který bude prodávat!</p>
            <button 
              onClick={() => window.location.href = 'mailto:precizniweby@gmail.com'}
              className="button-primary bg-[#3B82F6] text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#2563EB]"
            >
              Napište nám
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 Precizní Weby. Všechna práva vyhrazena.</p>
        </div>
      </footer>

      {/* Project Lightbox */}
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
    </div>
  );
}

export default App;