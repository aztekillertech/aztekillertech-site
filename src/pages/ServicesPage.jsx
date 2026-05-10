import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Monitor, Globe, Bug, Users, Server, Code, Database,
  CheckCircle2, User, Building2, Lock, Eye, MessageCircle,
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

const WA = 'https://wa.me/5214561175410?text=';

const DATA = {
  personal: {
    title: 'Protección Personal',
    subtitle: 'Soluciones de ciberseguridad para individuos y profesionales independientes',
    categories: [
      {
        icon: Eye,
        accent: '#EC4899',
        name: 'Protección de Privacidad',
        featured: true,
        badge: { text: 'Ley Olimpia', color: '#EC4899' },
        items: [
          'Eliminación de contenido íntimo sin consentimiento (Ley Olimpia)',
          'Protección contra doxing y acoso digital',
          'Auditoría de privacidad en redes sociales',
          'Configuración de cuentas seguras',
          'Monitoreo de filtraciones de datos personales',
        ],
        cta: { text: 'Proteger mi Privacidad', msg: 'Hola, necesito ayuda con Protección de Privacidad (Ley Olimpia)' },
      },
      {
        icon: Lock,
        accent: '#A855F7',
        name: 'Seguridad Digital Personal',
        items: [
          'Protección y recuperación de cuentas comprometidas',
          'Prevención de hackeos personales',
          'Configuración de autenticación de dos factores (2FA/MFA)',
          'Gestión segura de contraseñas',
          'Asesoría en seguridad para dispositivos personales',
        ],
        cta: { text: 'Asegurar mis Cuentas', msg: 'Hola, quiero asegurar mis cuentas digitales' },
      },
      {
        icon: Monitor,
        accent: '#22D3EE',
        name: 'Soporte Técnico Remoto',
        items: [
          'Diagnóstico remoto de equipos (Windows, macOS, Linux)',
          'Optimización de rendimiento de computadoras',
          'Instalación y configuración de sistemas operativos',
          'Eliminación de virus y malware',
          'Migración de datos entre dispositivos',
        ],
        cta: { text: 'Solicitar Soporte', msg: 'Hola, necesito soporte técnico remoto' },
      },
      {
        icon: Globe,
        accent: '#A855F7',
        name: 'Presencia Digital Profesional',
        items: [
          'Creación de páginas web personales / portafolio',
          'Configuración de Google Business Profile',
          'Correo profesional personalizado',
          'Optimización de perfil en redes sociales',
          'Branding digital básico',
        ],
        cta: { text: 'Crear mi Presencia Digital', msg: 'Hola, me interesa crear mi presencia digital profesional' },
      },
    ],
  },
  empresarial: {
    title: 'Soluciones Empresariales',
    subtitle: 'Ciberseguridad profesional y servicios gestionados para negocios y PyMEs',
    categories: [
      {
        icon: Bug,
        accent: '#F59E0B',
        name: 'Pentesting y Auditorías de Seguridad',
        featured: true,
        badge: { text: 'Más Solicitado', color: '#F59E0B' },
        items: [
          'Pentesting de aplicaciones web (OWASP Top 10)',
          'Auditoría de infraestructura de red',
          'Evaluación de seguridad de endpoints (Windows/Mac/Linux)',
          'Análisis y gestión de vulnerabilidades',
          'Reportes ejecutivos con plan de remediación priorizado',
          'Simulación de ataques de ingeniería social',
        ],
        cta: { text: 'Solicitar Auditoría', msg: 'Hola, quiero solicitar una auditoría de seguridad / pentesting' },
      },
      {
        icon: Users,
        accent: '#A855F7',
        name: 'Consultoría de Ciberseguridad',
        items: [
          'Implementación de políticas de seguridad empresarial',
          'Capacitación de empleados en ciberseguridad',
          'Evaluación de riesgos digitales (threat modeling)',
          'Configuración de MDM empresarial (gestión de dispositivos)',
          'Cumplimiento normativo (NOM-151-SCFI, LFPDPPP)',
          'Asesoría en respuesta a incidentes',
        ],
        cta: { text: 'Agendar Consultoría', msg: 'Hola, quiero agendar una consultoría de ciberseguridad empresarial' },
      },
      {
        icon: Server,
        accent: '#22D3EE',
        name: 'Servicios Gestionados (MSP/MSSP)',
        items: [
          'Monitoreo continuo de seguridad 24/7',
          'Gestión de actualizaciones y parches de seguridad',
          'Backup automático y recuperación ante desastres',
          'Soporte técnico mensual (paquetes por horas)',
          'Configuración y gestión de VPN empresarial',
          'Implementación de firewalls (pfSense, FortiGate)',
        ],
        cta: { text: 'Ver Paquetes', msg: 'Hola, me interesan los servicios gestionados MSP/MSSP' },
      },
      {
        icon: Code,
        accent: '#EC4899',
        name: 'Desarrollo Web Corporativo',
        items: [
          'Desarrollo de páginas web empresariales seguras',
          'Tiendas en línea con WooCommerce / Shopify',
          'Integraciones de pago (Stripe, PayPal, Mercado Pago)',
          'SEO técnico y optimización de velocidad',
          'Certificados SSL/TLS y configuración HTTPS',
          'Dashboards personalizados y analytics',
        ],
        cta: { text: 'Solicitar Cotización Web', msg: 'Hola, necesito cotización para desarrollo web corporativo' },
      },
      {
        icon: Database,
        accent: '#A855F7',
        name: 'Infraestructura y Administración IT',
        items: [
          'Instalación de sistemas empresariales (Windows Server, Linux)',
          'Configuración de servidores (on-premise o cloud)',
          'Migración a la nube (AWS, Azure, Google Cloud)',
          'Implementación de sistemas MFA/2FA corporativos',
          'Gestión de licencias (Microsoft 365, Google Workspace)',
          'Venta de licencias originales de software',
        ],
        cta: { text: 'Consultar Infraestructura', msg: 'Hola, quiero consultar sobre infraestructura y administración IT' },
      },
    ],
  },
};

function CategoryCard({ cat, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = cat.icon;

  return (
    <motion.div
      className={cat.featured ? 'col-span-1 lg:col-span-2' : 'col-span-1'}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: hovered ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.032)',
        border: `1px solid ${hovered ? cat.accent + '50' : 'rgba(168,85,247,0.18)'}`,
        padding: '1.75rem',
        transition: 'all 0.28s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 16px 56px rgba(0,0,0,0.5), 0 0 40px ${cat.accent}1A`
          : '0 4px 24px rgba(0,0,0,0.22)',
      }}
    >
      {/* Top accent line on featured cards */}
      {cat.featured && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${cat.accent}CC 40%, ${cat.accent}CC 60%, transparent 100%)`,
        }} />
      )}

      {/* Corner radial glow */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0,
        width: '220px', height: '220px',
        background: `radial-gradient(circle at 0% 0%, ${cat.accent}0F, transparent 65%)`,
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* Header: icon + name + badge */}
      <div style={{
        position: 'relative',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem', marginBottom: '1.1rem', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '46px', height: '46px', flexShrink: 0,
            borderRadius: '12px',
            background: `${cat.accent}16`,
            border: `1px solid ${cat.accent}38`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: hovered ? `0 0 22px ${cat.accent}30` : `0 0 12px ${cat.accent}14`,
            transition: 'box-shadow 0.3s',
          }}>
            <Icon size={21} style={{ color: cat.accent }} />
          </div>
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.8rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'white', lineHeight: 1.3, margin: 0,
          }}>
            {cat.name}
          </h3>
        </div>
        {cat.badge && (
          <span style={{
            fontSize: '0.58rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            fontFamily: 'Orbitron, sans-serif',
            color: cat.badge.color,
            background: `${cat.badge.color}14`,
            border: `1px solid ${cat.badge.color}42`,
            borderRadius: '999px',
            padding: '0.22rem 0.75rem',
            whiteSpace: 'nowrap',
            boxShadow: `0 0 12px ${cat.badge.color}20`,
          }}>
            ★ {cat.badge.text}
          </span>
        )}
      </div>

      {/* Gradient divider */}
      <div style={{
        height: '1px', marginBottom: '1.1rem', position: 'relative',
        background: `linear-gradient(90deg, ${cat.accent}35, rgba(168,85,247,0.08) 60%, transparent)`,
      }} />

      {/* Service items */}
      <div
        className={cat.featured ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : 'flex flex-col gap-2'}
        style={{ marginBottom: '1.5rem', position: 'relative' }}
      >
        {cat.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
            padding: '0.45rem 0.65rem',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(168,85,247,0.07)',
            transition: 'background 0.2s',
          }}>
            <CheckCircle2 size={13} style={{ color: cat.accent, flexShrink: 0, marginTop: '3px' }} />
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div style={{ position: 'relative' }}>
        <a
          href={`${WA}${encodeURIComponent(cat.cta.msg)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.55rem 1.3rem',
            borderRadius: '999px',
            background: `linear-gradient(135deg, ${cat.accent}CC, ${cat.accent}75)`,
            color: 'white',
            fontSize: '0.68rem', fontWeight: 700,
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.07em', textTransform: 'uppercase',
            textDecoration: 'none',
            border: `1px solid ${cat.accent}50`,
            boxShadow: `0 4px 18px ${cat.accent}28`,
            transition: 'transform 0.18s, box-shadow 0.18s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = `0 6px 26px ${cat.accent}45`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = `0 4px 18px ${cat.accent}28`;
          }}
        >
          <MessageCircle size={13} />
          {cat.cta.text}
        </a>
      </div>
    </motion.div>
  );
}

function ServicesPage() {
  const [activeTab, setActiveTab] = useState('personal');
  const data = DATA[activeTab];

  return (
    <>
      <Helmet>
        <title>Servicios — AztekillerTech</title>
        <meta name="description" content="Ciberseguridad personal y empresarial. Protección de privacidad, pentesting, soporte técnico, desarrollo web y más." />
      </Helmet>

      <div style={{ minHeight: '100vh' }}>
        <Header />
        <FloatingWhatsAppButton />

        {/* ── Hero ── */}
        <section style={{ paddingTop: '4.5rem', paddingBottom: '2.5rem', position: 'relative' }}>
          {/* Subtle dot-grid overlay */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              radial-gradient(circle, rgba(168,85,247,0.18) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 40%, transparent 100%)',
          }} />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center" style={{ position: 'relative' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}>

              {/* Pill tag */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                background: 'rgba(168,85,247,0.10)',
                border: '1px solid rgba(168,85,247,0.30)',
                borderRadius: '999px',
                padding: '0.3rem 1rem',
                marginBottom: '1.5rem',
              }}>
                <Shield size={11} style={{ color: '#A855F7' }} />
                <span style={{
                  fontSize: '0.58rem', fontFamily: 'Orbitron, sans-serif',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#A855F7', fontWeight: 700,
                }}>
                  Servicios Profesionales
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(1.9rem, 5vw, 3.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.01em',
                color: 'white',
                marginBottom: '1rem',
                lineHeight: 1.1,
              }}>
                Soluciones de{' '}
                <span style={{
                  backgroundImage: 'linear-gradient(135deg, #A855F7 30%, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Ciberseguridad
                </span>
              </h1>

              <p style={{
                fontSize: '1.05rem', color: 'rgba(255,255,255,0.48)',
                maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.7,
              }}>
                Protección digital para personas y empresas. Elige tu categoría y explora nuestras soluciones.
              </p>

              {/* Tab switcher */}
              <div style={{
                display: 'inline-flex',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(168,85,247,0.18)',
                borderRadius: '14px',
                padding: '5px',
                gap: '4px',
              }}>
                {[
                  { key: 'personal', label: 'Personal', icon: User },
                  { key: 'empresarial', label: 'Empresarial', icon: Building2 },
                ].map(({ key, label, icon: TabIcon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.45rem',
                      padding: '0.6rem 1.75rem',
                      borderRadius: '9px',
                      border: 'none', cursor: 'pointer',
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '0.68rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      transition: 'all 0.25s ease',
                      background: activeTab === key
                        ? 'linear-gradient(135deg, rgba(168,85,247,0.75), rgba(168,85,247,0.42))'
                        : 'transparent',
                      color: activeTab === key ? 'white' : 'rgba(255,255,255,0.38)',
                      boxShadow: activeTab === key ? '0 2px 20px rgba(168,85,247,0.32)' : 'none',
                    }}
                  >
                    <TabIcon size={13} />
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Cards ── */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
              >
                {/* Section subtitle */}
                <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
                  <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)',
                    fontWeight: 800, color: 'white', marginBottom: '0.45rem',
                  }}>
                    {data.title}
                  </h2>
                  <p style={{
                    color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem',
                    maxWidth: '480px', margin: '0 auto',
                  }}>
                    {data.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {data.categories.map((cat, i) => (
                    <CategoryCard key={cat.name} cat={cat} index={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section style={{ paddingBottom: '5.5rem' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, ease: 'easeOut' }}
              style={{
                position: 'relative', overflow: 'hidden',
                background: 'rgba(255,255,255,0.034)',
                border: '1px solid rgba(168,85,247,0.22)',
                borderRadius: '24px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)',
              }}
            >
              {/* Top glow */}
              <div aria-hidden style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '420px', height: '200px',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.16), transparent 70%)',
                pointerEvents: 'none',
              }} />
              {/* Bottom glow */}
              <div aria-hidden style={{
                position: 'absolute', bottom: 0, right: 0,
                width: '250px', height: '180px',
                background: 'radial-gradient(circle at 100% 100%, rgba(236,72,153,0.10), transparent 65%)',
                pointerEvents: 'none',
              }} />

              <h2 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(1.2rem, 3vw, 1.65rem)',
                fontWeight: 900, color: 'white',
                marginBottom: '0.75rem', position: 'relative',
              }}>
                ¿Tienes dudas? Hablemos
              </h2>
              <p style={{
                color: 'rgba(255,255,255,0.46)', marginBottom: '2rem',
                fontSize: '0.95rem', lineHeight: 1.65, position: 'relative',
                maxWidth: '420px', margin: '0 auto 2rem',
              }}>
                Asesoría gratuita y sin compromiso. Nuestro equipo te ayuda a encontrar la solución ideal.
              </p>

              <a
                href={`${WA}${encodeURIComponent('Hola, me interesa conocer más sobre los servicios de AztekillerTech')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'relative',
                  display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                  padding: '0.82rem 2.2rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                  color: 'white',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 32px rgba(168,85,247,0.45)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 44px rgba(168,85,247,0.62)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 32px rgba(168,85,247,0.45)';
                }}
              >
                <MessageCircle size={15} />
                Contactar por WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default ServicesPage;
