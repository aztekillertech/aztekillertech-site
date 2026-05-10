import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Quote, Phone, Mail, ArrowLeft, FileSearch, Lock, UserCheck, Shield, CheckCircle, Wrench, Settings, Monitor, HardDrive, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import TrustSection from '@/components/TrustSection.jsx';
import SocialMediaSection from '@/components/SocialMediaSection.jsx';
import ProductCardsSection from '@/components/ProductCardsSection.jsx';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentView, setCurrentView] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappUrl = "https://wa.me/5214561175410?text=Hola,%20necesito%20asistencia%20urgente.%20Perdí%20acceso%20a%20mi%20cuenta%20y%20quiero%20recuperarla%20lo%20antes%20posible.";

  useEffect(() => {
    const path = location.pathname;
    if (path === '/servicio/proteccion-digital') {
      setCurrentView('service');
      setSelectedService('proteccion-digital');
    } else if (path === '/servicio/reparacion-equipos') {
      setCurrentView('service');
      setSelectedService('reparacion-equipos');
    } else if (path === '/servicio/seguridad-software') {
      setCurrentView('service');
      setSelectedService('seguridad-software');
    } else if (path === '/servicio/dispositivos-moviles') {
      setCurrentView('service');
      setSelectedService('dispositivos-moviles');
    } else {
      setCurrentView('home');
      setSelectedService(null);
    }
  }, [location]);

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedService(null);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success('Mensaje enviado. Te contactaremos pronto.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const testimonials = [
    {
      quote: 'Javier es una persona sumamente empática y te responde las 24 horas del día para tranquilizarte, además de que está al pendiente de tu bienestar emocional, algo que muy pocos profesionales hacen. ¡Tal cual, un excelente profesional y un gran ser humano! Me ayudó con mi problema y mi familia lo adora.',
      name: 'Dana Padron',
      role: 'Creadora de Contenido UGC'
    },
    {
      quote: 'Profesional muy humano, además contesta muy rápido; así le escribas o llames a las 4 a.m., estará al pendiente de ti, dándote tranquilidad para tu estabilidad emocional y, sobre todo, te muestra resultados. Mi familia y yo estamos súper agradecidas.',
      name: 'Estela García',
      role: 'Pensionada'
    },
    {
      quote: 'Excelente servicio y excelente persona, no solo te ayuda con cualquier cosa que necesites, si no que también te enseña para que no vuelvas a caer en lo mismo. 100% recomendado con un servicio excepcional.',
      name: 'Zeniff',
      role: 'Profesional independiente'
    }
  ];

  const renderServiceDetail = () => {
    if (selectedService === 'proteccion-digital') {
      return (
        <div className="min-h-screen bg-background">
          <section className="py-12 sm:py-20 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Button
                onClick={handleBackToHome}
                variant="outline"
                className="mb-6 sm:mb-8 border-primary text-primary hover:bg-primary/10 transition-all duration-200 mobile-button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div className="text-center">
                <FileSearch className="w-16 h-16 sm:w-20 sm:h-20 text-primary mx-auto mb-4 sm:mb-6" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6" style={{ letterSpacing: '-0.02em' }}>
                  Protección digital
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                  Servicios especializados en eliminación de contenido íntimo sin consentimiento y protección de privacidad digital
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                <Card className="p-6 sm:p-8 border-border hover:shadow-lg transition-all duration-300 bg-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileSearch className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-3">Eliminación de contenido íntimo sin consentimiento</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                        Servicio especializado en la eliminación de contenido íntimo o personal publicado sin consentimiento. Se trabaja con total discreción y profesionalismo para proteger la privacidad del cliente.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 sm:p-8 border-border hover:shadow-lg transition-all duration-300 bg-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-3">Protección de cuentas</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Fortalecimiento de seguridad en redes sociales, correos electrónicos y cuentas en línea contra accesos no autorizados y amenazas digitales.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </div>
      );
    }
    
    return null;
  };

  if (currentView === 'service') {
    return (
      <>
        <Helmet>
          <title>{`${selectedService} - AztekillerTech`}</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <FloatingWhatsAppButton />
          {renderServiceDetail()}
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>AztekillerTech - Ciberseguridad y Soporte Técnico</title>
        <meta name="description" content="Protegemos tu privacidad y recuperamos tu tranquilidad. Especialistas en ciberseguridad, protección de datos y soporte técnico." />
      </Helmet>

      <div className="min-h-screen bg-transparent">
        <Header />
        <FloatingWhatsAppButton />

        {/* ── HERO SECTION — NeonMorphic style ── */}
        <section
          className="relative flex items-center"
          style={{ minHeight: '100vh' }}
        >
          {/* Guardian background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.28,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <source src="/videos/guardian.mp4" type="video/mp4" />
          </video>

          {/* Atmospheric overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Main purple glow — behind guardian */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 68% 85% at 74% 52%, rgba(140,0,210,0.34) 0%, rgba(90,0,160,0.14) 45%, transparent 70%)'
            }} />
            {/* Crimson glow from pyramid */}
            <div className="absolute" style={{
              right: '10%', bottom: '5%',
              width: '45%', height: '45%',
              background: 'radial-gradient(ellipse at center, rgba(200,30,60,0.22) 0%, transparent 65%)',
              filter: 'blur(30px)'
            }} />
            {/* Left edge vignette */}
            <div className="absolute inset-y-0 left-0 w-1/3" style={{
              background: 'linear-gradient(to right, rgba(0,0,5,0.6) 0%, transparent 100%)'
            }} />
          </div>

          {/* Decorative dots — left */}
          <div className="absolute left-4 hidden lg:flex flex-col gap-5" style={{ top: '38%', zIndex: 5 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(168,85,247,0.45)' }} />
            ))}
          </div>
          {/* Decorative dots — mid right */}
          <div className="absolute hidden xl:flex flex-col gap-5" style={{ right: '42%', top: '20%', zIndex: 5 }}>
            {[0,1].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(168,85,247,0.28)' }} />
            ))}
          </div>

          {/* ── GUARDIAN — right half desktop, hidden on mobile (shown below) ── */}
          <div
            className="absolute hidden md:flex items-center justify-center"
            style={{ right: 0, top: 0, bottom: 0, width: '56%', zIndex: 2 }}
          >
            {/* Purple glow disc */}
            <div className="absolute" style={{
              width: '82%', height: '82%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(130,0,200,0.52) 0%, rgba(80,0,150,0.24) 38%, transparent 68%)',
              filter: 'blur(28px)'
            }} />
            {/* Crimson accent glow */}
            <div className="absolute" style={{
              width: '55%', height: '40%',
              bottom: '8%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,30,60,0.32) 0%, transparent 65%)',
              filter: 'blur(22px)'
            }} />

            <motion.img
              initial={{ opacity: 0, scale: 0.86, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
              src="/guardian.png"
              alt="AztekillerTech Guardian"
              style={{
                position: 'relative',
                zIndex: 3,
                maxHeight: '88vh',
                maxWidth: '96%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 45px rgba(168,85,247,0.80)) drop-shadow(0 0 90px rgba(123,44,191,0.52)) drop-shadow(0 0 140px rgba(200,75,158,0.28))'
              }}
            />
          </div>

          {/* ── FLOATING STAT CARDS ── */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="absolute hidden xl:block"
            style={{ right: '3%', top: '23%', zIndex: 15 }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.045)',
              border: '1px solid rgba(168,85,247,0.32)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '14px 22px',
              minWidth: '185px'
            }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.48)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                Confidencialidad
              </div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#A855F7', lineHeight: 1 }}>100%</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="absolute hidden xl:block"
            style={{ right: '27%', bottom: '19%', zIndex: 15 }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.045)',
              border: '1px solid rgba(168,85,247,0.32)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '14px 22px',
              minWidth: '185px'
            }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.48)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                Clientes protegidos
              </div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#A855F7', lineHeight: 1 }}>500+</div>
            </div>
          </motion.div>

          {/* ── LEFT CONTENT ── */}
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" style={{ zIndex: 10 }}>
            <div className="w-full lg:max-w-[48%]">

              {/* Small tracked label — "MARKETPLACE FOR" style */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: 'clamp(0.6rem, 1.1vw, 0.85rem)',
                  letterSpacing: '0.35em',
                  color: 'rgba(255,255,255,0.38)',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginBottom: '0.85rem'
                }}
              >
                CIBERSEGURIDAD PARA
              </motion.p>

              {/* HUGE headline — "CREATORS" style */}
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
              >
                <h1
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: 'clamp(2.1rem, 7vw, 7.2rem)',
                    fontWeight: 900,
                    lineHeight: 0.92,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    marginBottom: '1.4rem',
                    color: 'white'
                  }}
                >
                  AZTEKILLER
                  <br />
                  <span style={{
                    backgroundImage: 'linear-gradient(90deg, #A855F7 15%, #EC4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>TECH</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{
                  color: 'rgba(255,255,255,0.52)',
                  fontSize: '1rem',
                  lineHeight: 1.78,
                  maxWidth: '400px',
                  marginBottom: '2.4rem'
                }}
              >
                Protegemos tu privacidad y recuperamos tu tranquilidad. Servicios de ciberseguridad y soporte técnico experto con total confidencialidad.
              </motion.p>

              {/* Buttons — outlined pill style like NeonMorphic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.4rem', marginBottom: '3.2rem' }}
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.9rem 2.2rem',
                    borderRadius: '999px',
                    border: '2px solid #A855F7',
                    background: 'rgba(168,85,247,0.10)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    fontFamily: 'Orbitron, sans-serif',
                    letterSpacing: '0.03em',
                    textDecoration: 'none',
                    boxShadow: '0 0 22px rgba(168,85,247,0.30)'
                  }}
                >
                  Recupera tu cuenta
                </a>
                <Link
                  to="/servicios"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(255,255,255,0.65)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                >
                  Ver servicios <span style={{ fontSize: '1.15rem' }}>→</span>
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                style={{ display: 'flex', alignItems: 'center', gap: '2.8rem' }}
              >
                {[
                  { value: '500+', label: 'Clientes' },
                  { value: '24/7', label: 'Soporte' },
                  { value: '100%', label: 'Confidencial' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                      fontWeight: 900,
                      color: 'white',
                      lineHeight: 1
                    }}>{stat.value}</div>
                    <div style={{
                      fontSize: '0.65rem',
                      color: 'rgba(255,255,255,0.36)',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginTop: '5px'
                    }}>{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Guardian — mobile only, shown below content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="md:hidden mt-8 flex justify-center items-center"
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute',
                width: '75%', height: '75%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(130,0,200,0.48) 0%, rgba(80,0,150,0.22) 40%, transparent 70%)',
                filter: 'blur(24px)'
              }} />
              <img
                src="/guardian.png"
                alt="AztekillerTech Guardian"
                loading="eager"
                style={{
                  position: 'relative',
                  zIndex: 3,
                  maxWidth: 'min(90vw, 380px)',
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 0 32px rgba(168,85,247,0.80)) drop-shadow(0 0 65px rgba(123,44,191,0.50))'
                }}
              />
            </motion.div>
          </div>
        </section>

        <TrustSection />
        
        <ProductCardsSection />

        <section className="py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Lo que dicen nuestros clientes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experiencias reales de personas que recuperaron su tranquilidad.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full flex flex-col border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                    <Quote className="w-10 h-10 text-primary/20 mb-6" />
                    <p className="text-foreground leading-relaxed mb-8 flex-grow">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SocialMediaSection />

        <section id="contacto" className="py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Contáctanos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estamos listos para ayudarte. Escríbenos y te responderemos a la brevedad.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8 border-border bg-card shadow-sm">
                  <h3 className="text-2xl font-bold mb-6 text-foreground">Envíanos un mensaje</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Nombre completo</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2 bg-background border-border focus:border-primary mobile-input text-foreground"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-foreground">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2 bg-background border-border focus:border-primary mobile-input text-foreground"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-foreground">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="mt-2 bg-background border-border focus:border-primary resize-none mobile-input text-foreground"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-accent transition-all duration-300 active:scale-95 mobile-button font-bold"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                    </Button>
                  </form>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <Card className="p-8 border-border bg-card shadow-sm">
                  <h3 className="text-xl font-bold mb-6 text-foreground">Contacto directo</h3>
                  <div className="space-y-6">
                    <a 
                      href="tel:+524561175410" 
                      className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target p-3 rounded-lg hover:bg-muted/50"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Teléfono</p>
                        <p className="text-sm">+52 456 117 5410</p>
                      </div>
                    </a>
                    <a 
                      href="mailto:info@aztekillertech.net" 
                      className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target p-3 rounded-lg hover:bg-muted/50"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <p className="text-sm">info@aztekillertech.net</p>
                      </div>
                    </a>
                  </div>
                </Card>

                <Card className="p-8 border-border bg-muted/30 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Horario de atención</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="flex justify-between border-b border-border/50 pb-2"><span>Lunes a Viernes:</span> <span className="font-medium text-foreground">9:00 AM - 8:00 PM</span></p>
                    <p className="flex justify-between border-b border-border/50 pb-2"><span>Sábados:</span> <span className="font-medium text-foreground">10:00 AM - 6:00 PM</span></p>
                    <p className="flex justify-between"><span>Domingos:</span> <span className="font-medium text-foreground">Emergencias</span></p>
                  </div>
                  <p className="text-sm mt-6 text-primary font-semibold bg-primary/10 p-3 rounded-lg text-center">
                    Casos urgentes atendidos 24/7 vía WhatsApp
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;