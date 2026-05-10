import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Monitor, Globe, Bug, Users, Server, Code, Database,
  CheckCircle2, User, Building2, Lock, Eye, MessageCircle,
  X, ShieldCheck, FileText, Trash2, EyeOff, Key, AlertTriangle,
  Heart, Scale, Zap,
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
        badge: { text: 'Ley Olimpia', color: '#EC4899', clickable: true },
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

/* ─────────────────────────────────────────────────────────
   MODAL: LEY OLIMPIA
───────────────────────────────────────────────────────── */
function LeyOlimpiaModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const steps = [
    { icon: EyeOff, title: 'Confidencialidad absoluta', desc: 'Solo el especialista asignado conoce tu caso. Ningún otro miembro del equipo, ni externo, tiene acceso.' },
    { icon: Trash2, title: 'Sin copias innecesarias', desc: 'No guardamos, almacenamos ni retenemos ningún contenido sensible. Todo se elimina de forma segura al cerrar el caso.' },
    { icon: Key, title: 'Canal cifrado', desc: 'Toda comunicación contigo ocurre por canales encriptados, a tu ritmo y en completa privacidad, sin presiones.' },
    { icon: Scale, title: 'Coordinación legal', desc: 'Si decides proceder legalmente, te coordinamos con abogados especializados en violencia digital y Ley Olimpia.' },
    { icon: Zap, title: 'Respuesta de emergencia', desc: 'Si el contenido se está difundiendo activamente, activamos protocolo urgente para solicitar retiros inmediatos.' },
    { icon: Heart, title: 'Cero juicios', desc: 'Tu situación se maneja con empatía total. Jamás cuestionaremos tu historia ni emitiremos juicios de ningún tipo.' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(2,0,10,0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
          overflowY: 'auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%', maxWidth: '700px',
            background: 'rgba(20,0,40,0.96)',
            border: '1px solid rgba(236,72,153,0.35)',
            borderRadius: '24px',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(236,72,153,0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Background glow */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '500px', height: '220px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(236,72,153,0.14), transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px', cursor: 'pointer',
              color: 'rgba(255,255,255,0.6)',
              width: '34px', height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', zIndex: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(236,72,153,0.15)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div style={{ position: 'relative', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
              <div style={{
                width: '52px', height: '52px', flexShrink: 0,
                borderRadius: '14px',
                background: 'rgba(236,72,153,0.14)',
                border: '1px solid rgba(236,72,153,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 24px rgba(236,72,153,0.22)',
              }}>
                <Shield size={24} style={{ color: '#EC4899' }} />
              </div>
              <div>
                <div style={{
                  fontSize: '0.58rem', fontFamily: 'Orbitron, sans-serif',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#EC4899', fontWeight: 700, marginBottom: '0.3rem',
                }}>
                  Ley Olimpia — México
                </div>
                <h2 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                  fontWeight: 900, color: 'white', margin: 0, lineHeight: 1.2,
                }}>
                  ¿Qué es la Ley Olimpia?
                </h2>
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.68)', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1rem' }}>
              Es un marco legislativo mexicano que <strong style={{ color: 'white' }}>tipifica como delito la difusión de contenido íntimo sin consentimiento</strong>. Debe su nombre a <em>Olimpia Coral Melo</em>, quien impulsó este movimiento tras ser víctima de violencia digital.
            </p>

            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
            }}>
              {[
                'Hasta 6 años de prisión',
                'Multas económicas',
                'Aplica en +30 estados',
                'Ex parejas y terceros',
              ].map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.7rem', fontWeight: 600,
                  color: 'rgba(236,72,153,0.9)',
                  background: 'rgba(236,72,153,0.10)',
                  border: '1px solid rgba(236,72,153,0.28)',
                  borderRadius: '999px', padding: '0.22rem 0.75rem',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px', marginBottom: '1.75rem',
            background: 'linear-gradient(90deg, rgba(236,72,153,0.4), rgba(168,85,247,0.15), transparent)',
          }} />

          {/* How we handle it */}
          <div style={{ marginBottom: '1.75rem' }}>
            <p style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#EC4899', marginBottom: '1rem',
            }}>
              Cómo lo manejamos en AztekillerTech
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{
                  display: 'flex', gap: '0.75rem',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(236,72,153,0.12)',
                }}>
                  <div style={{
                    width: '34px', height: '34px', flexShrink: 0,
                    borderRadius: '9px',
                    background: 'rgba(236,72,153,0.12)',
                    border: '1px solid rgba(236,72,153,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={15} style={{ color: '#EC4899' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'white', marginBottom: '0.2rem' }}>
                      {title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <a
              href={`${WA}${encodeURIComponent('Hola, necesito ayuda con un caso de Ley Olimpia. Quiero hablar en privado.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.7rem 1.6rem',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #EC4899CC, #EC489980)',
                color: 'white',
                fontSize: '0.7rem', fontWeight: 700,
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(236,72,153,0.45)',
                boxShadow: '0 4px 22px rgba(236,72,153,0.32)',
              }}
            >
              <MessageCircle size={14} />
              Contactar en privado
            </a>
            <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.35)' }}>
              100% confidencial — sin juicios
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────
   TAB: CONFIDENCIALIDAD
───────────────────────────────────────────────────────── */
const NEVER = [
  'Guardar copias de tu contenido sensible',
  'Compartir tu caso con terceros',
  'Revelar tu identidad o datos personales',
  'Usar tu información para otros fines',
  'Juzgar o cuestionar tu situación',
  'Almacenar contraseñas después del servicio',
];

const ALWAYS = [
  'Tratarte con respeto y empatía absoluta',
  'Comunicarnos de forma discreta y segura',
  'Cifrar todas nuestras comunicaciones',
  'Eliminar todo al cerrar tu caso',
  'Estar disponibles cuando nos necesites',
  'Ofrecerte un NDA si lo solicitas',
];

const PILLARS = [
  { icon: Trash2, color: '#F87171', title: 'Cero Copias', desc: 'No retenemos archivos, credenciales ni contenido sensible. Punto.' },
  { icon: Key, color: '#22D3EE', title: 'Cifrado Total', desc: 'Comunicaciones por canales encriptados de extremo a extremo.' },
  { icon: ShieldCheck, color: '#10B981', title: 'Eliminación Segura', desc: 'Borrado verificado de todo dato al cierre de tu caso.' },
];

function PrivacidadContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28 }}
    >
      {/* Trust banner */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'rgba(16,185,129,0.05)',
        border: '1px solid rgba(16,185,129,0.22)',
        borderRadius: '20px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        marginBottom: '1.5rem',
        textAlign: 'center',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '500px', height: '200px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.14), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          background: 'rgba(16,185,129,0.10)',
          border: '1px solid rgba(16,185,129,0.28)',
          borderRadius: '999px', padding: '0.28rem 0.9rem',
          marginBottom: '1rem',
        }}>
          <ShieldCheck size={11} style={{ color: '#10B981' }} />
          <span style={{
            fontSize: '0.58rem', fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#10B981', fontWeight: 700,
          }}>
            Compromiso AztekillerTech
          </span>
        </div>
        <h2 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.1rem, 3vw, 1.65rem)',
          fontWeight: 900, color: 'white',
          marginBottom: '0.75rem', position: 'relative',
          lineHeight: 1.2,
        }}>
          Tu privacidad no es opcional —
          <span style={{
            backgroundImage: 'linear-gradient(135deg, #10B981, #22D3EE)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}> es nuestra mayor responsabilidad</span>
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: '0 auto',
          fontSize: '0.92rem', lineHeight: 1.7, position: 'relative',
        }}>
          Cada cliente que confía en nosotros nos entrega algo muy valioso: su privacidad y su tranquilidad.
          Nos tomamos eso con la seriedad más alta posible.
        </p>
      </div>

      {/* 3 pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginBottom: '1.5rem' }}>
        {PILLARS.map(({ icon: Icon, color, title, desc }) => (
          <div key={title} style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${color}22`,
            borderRadius: '16px',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            padding: '1.35rem',
            textAlign: 'center',
          }}>
            <div style={{
              width: '48px', height: '48px', margin: '0 auto 0.9rem',
              borderRadius: '12px',
              background: `${color}14`,
              border: `1px solid ${color}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 18px ${color}18`,
            }}>
              <Icon size={22} style={{ color }} />
            </div>
            <div style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '0.72rem',
              fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'white', marginBottom: '0.4rem',
            }}>
              {title}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Never / Always */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ marginBottom: '1.5rem' }}>
        {/* NEVER */}
        <div style={{
          background: 'rgba(248,113,113,0.04)',
          border: '1px solid rgba(248,113,113,0.18)',
          borderRadius: '20px',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          padding: '1.6rem', overflow: 'hidden', position: 'relative',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(248,113,113,0.6), transparent)',
          }} />
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '0.68rem',
            fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#F87171', marginBottom: '1.1rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <X size={14} />
            Lo que NUNCA haremos
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {NEVER.map((item) => (
              <div key={item} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.55rem',
                padding: '0.45rem 0.6rem',
                borderRadius: '8px',
                background: 'rgba(248,113,113,0.04)',
                border: '1px solid rgba(248,113,113,0.08)',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '16px', height: '16px', flexShrink: 0, marginTop: '2px',
                  borderRadius: '50%',
                  background: 'rgba(248,113,113,0.15)',
                  border: '1px solid rgba(248,113,113,0.35)',
                  fontSize: '0.6rem', color: '#F87171', fontWeight: 700,
                }}>
                  ✕
                </span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ALWAYS */}
        <div style={{
          background: 'rgba(16,185,129,0.04)',
          border: '1px solid rgba(16,185,129,0.18)',
          borderRadius: '20px',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          padding: '1.6rem', overflow: 'hidden', position: 'relative',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)',
          }} />
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '0.68rem',
            fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#10B981', marginBottom: '1.1rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <CheckCircle2 size={14} />
            Lo que SIEMPRE haremos
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {ALWAYS.map((item) => (
              <div key={item} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.55rem',
                padding: '0.45rem 0.6rem',
                borderRadius: '8px',
                background: 'rgba(16,185,129,0.04)',
                border: '1px solid rgba(16,185,129,0.08)',
              }}>
                <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NDA + Rights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ marginBottom: '1.5rem' }}>
        <div style={{
          background: 'rgba(168,85,247,0.04)',
          border: '1px solid rgba(168,85,247,0.20)',
          borderRadius: '20px',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          padding: '1.6rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
            <div style={{
              width: '40px', height: '40px', flexShrink: 0,
              borderRadius: '10px',
              background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.32)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FileText size={18} style={{ color: '#A855F7' }} />
            </div>
            <h3 style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem',
              fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'white', margin: 0,
            }}>
              Acuerdo de Confidencialidad (NDA)
            </h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '1rem' }}>
            Si tu caso lo requiere, firmamos un <strong style={{ color: 'white' }}>Acuerdo de No Divulgación (NDA)</strong> contigo antes de iniciar. Esto te da respaldo legal y garantiza que toda la información compartida permanece estrictamente confidencial.
          </p>
          <a
            href={`${WA}${encodeURIComponent('Hola, quiero solicitar un Acuerdo de Confidencialidad (NDA) antes de iniciar mi caso.')}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.68rem', fontWeight: 700,
              fontFamily: 'Orbitron, sans-serif',
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: '#A855F7', textDecoration: 'none',
              border: '1px solid rgba(168,85,247,0.35)',
              borderRadius: '999px', padding: '0.45rem 1rem',
              background: 'rgba(168,85,247,0.08)',
              transition: 'all 0.2s',
            }}
          >
            <MessageCircle size={12} />
            Solicitar NDA
          </a>
        </div>

        <div style={{
          background: 'rgba(34,211,238,0.04)',
          border: '1px solid rgba(34,211,238,0.18)',
          borderRadius: '20px',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          padding: '1.6rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
            <div style={{
              width: '40px', height: '40px', flexShrink: 0,
              borderRadius: '10px',
              background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Scale size={18} style={{ color: '#22D3EE' }} />
            </div>
            <h3 style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem',
              fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'white', margin: 0,
            }}>
              Tus Derechos (LFPDPPP)
            </h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
            Bajo la <strong style={{ color: 'white' }}>Ley Federal de Protección de Datos Personales</strong> tienes derecho a: <em>Acceso, Rectificación, Cancelación y Oposición (ARCO)</em> sobre tus datos en cualquier momento. Solo conservamos lo estrictamente necesario para prestarte el servicio.
          </p>
        </div>
      </div>

      {/* Special protocol - Ley Olimpia */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'rgba(236,72,153,0.05)',
        border: '1px solid rgba(236,72,153,0.25)',
        borderRadius: '20px',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        padding: '1.75rem',
        marginBottom: '1.5rem',
      }}>
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, #EC489999, transparent)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, right: 0, width: '200px', height: '200px',
          background: 'radial-gradient(circle at 100% 100%, rgba(236,72,153,0.10), transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <div style={{
            width: '42px', height: '42px', flexShrink: 0,
            borderRadius: '11px',
            background: 'rgba(236,72,153,0.14)', border: '1px solid rgba(236,72,153,0.32)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 18px rgba(236,72,153,0.20)',
          }}>
            <AlertTriangle size={20} style={{ color: '#EC4899' }} />
          </div>
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem',
            fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            color: 'white', margin: 0,
          }}>
            Protocolo Especial: Casos Sensibles
          </h3>
          <span style={{
            fontSize: '0.58rem', fontWeight: 700, fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#EC4899', background: 'rgba(236,72,153,0.12)',
            border: '1px solid rgba(236,72,153,0.30)',
            borderRadius: '999px', padding: '0.2rem 0.65rem',
          }}>
            Ley Olimpia
          </span>
        </div>
        <p style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.68, position: 'relative' }}>
          Los casos que involucran <strong style={{ color: 'white' }}>contenido íntimo sin consentimiento</strong> reciben un protocolo de máxima discreción: acceso único al especialista asignado, cero almacenamiento de material sensible, comunicación exclusivamente por canal cifrado, y coordinación directa con redes de apoyo legal especializadas en violencia digital. <strong style={{ color: '#EC4899' }}>Tu dignidad y seguridad siempre van primero.</strong>
        </p>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
          ¿Tienes dudas sobre cómo manejamos tu información?
        </p>
        <a
          href={`${WA}${encodeURIComponent('Hola, quiero saber más sobre cómo AztekillerTech protege la privacidad de sus clientes.')}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.8rem',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #10B981CC, #10B98180)',
            color: 'white',
            fontSize: '0.7rem', fontWeight: 700,
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none',
            border: '1px solid rgba(16,185,129,0.40)',
            boxShadow: '0 4px 24px rgba(16,185,129,0.28)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 34px rgba(16,185,129,0.42)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(16,185,129,0.28)'; }}
        >
          <ShieldCheck size={14} />
          Pregunta con total confianza
        </a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   CATEGORY CARD
───────────────────────────────────────────────────────── */
function CategoryCard({ cat, index, onLeyOlimpia }) {
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
        position: 'relative', overflow: 'hidden',
        borderRadius: '20px',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
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
      {cat.featured && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${cat.accent}CC 40%, ${cat.accent}CC 60%, transparent 100%)`,
        }} />
      )}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, width: '220px', height: '220px',
        background: `radial-gradient(circle at 0% 0%, ${cat.accent}0F, transparent 65%)`,
        pointerEvents: 'none', transition: 'opacity 0.3s', opacity: hovered ? 1 : 0.5,
      }} />

      {/* Header */}
      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.1rem', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '46px', height: '46px', flexShrink: 0, borderRadius: '12px',
            background: `${cat.accent}16`, border: `1px solid ${cat.accent}38`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: hovered ? `0 0 22px ${cat.accent}30` : `0 0 12px ${cat.accent}14`,
            transition: 'box-shadow 0.3s',
          }}>
            <Icon size={21} style={{ color: cat.accent }} />
          </div>
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '0.8rem', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'white', lineHeight: 1.3, margin: 0,
          }}>
            {cat.name}
          </h3>
        </div>

        {cat.badge && (
          cat.badge.clickable ? (
            <button
              onClick={onLeyOlimpia}
              title="Ver qué es la Ley Olimpia y cómo la manejamos"
              style={{
                fontSize: '0.58rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: 'Orbitron, sans-serif',
                color: cat.badge.color,
                background: `${cat.badge.color}14`,
                border: `1px solid ${cat.badge.color}42`,
                borderRadius: '999px', padding: '0.22rem 0.75rem',
                whiteSpace: 'nowrap',
                boxShadow: `0 0 12px ${cat.badge.color}20`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${cat.badge.color}28`;
                e.currentTarget.style.boxShadow = `0 0 20px ${cat.badge.color}40`;
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${cat.badge.color}14`;
                e.currentTarget.style.boxShadow = `0 0 12px ${cat.badge.color}20`;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ★ {cat.badge.text} — ¿Qué es?
            </button>
          ) : (
            <span style={{
              fontSize: '0.58rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'Orbitron, sans-serif',
              color: cat.badge.color,
              background: `${cat.badge.color}14`,
              border: `1px solid ${cat.badge.color}42`,
              borderRadius: '999px', padding: '0.22rem 0.75rem',
              whiteSpace: 'nowrap',
              boxShadow: `0 0 12px ${cat.badge.color}20`,
            }}>
              ★ {cat.badge.text}
            </span>
          )
        )}
      </div>

      <div style={{
        height: '1px', marginBottom: '1.1rem',
        background: `linear-gradient(90deg, ${cat.accent}35, rgba(168,85,247,0.08) 60%, transparent)`,
      }} />

      <div
        className={cat.featured ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : 'flex flex-col gap-2'}
        style={{ marginBottom: '1.5rem', position: 'relative' }}
      >
        {cat.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
            padding: '0.45rem 0.65rem', borderRadius: '8px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(168,85,247,0.07)',
          }}>
            <CheckCircle2 size={13} style={{ color: cat.accent, flexShrink: 0, marginTop: '3px' }} />
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative' }}>
        <a
          href={`${WA}${encodeURIComponent(cat.cta.msg)}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.55rem 1.3rem', borderRadius: '999px',
            background: `linear-gradient(135deg, ${cat.accent}CC, ${cat.accent}75)`,
            color: 'white', fontSize: '0.68rem', fontWeight: 700,
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.07em', textTransform: 'uppercase',
            textDecoration: 'none',
            border: `1px solid ${cat.accent}50`,
            boxShadow: `0 4px 18px ${cat.accent}28`,
            transition: 'transform 0.18s, box-shadow 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 6px 26px ${cat.accent}45`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 18px ${cat.accent}28`; }}
        >
          <MessageCircle size={13} />
          {cat.cta.text}
        </a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
const TABS = [
  { key: 'personal', label: 'Personal', icon: User },
  { key: 'empresarial', label: 'Empresarial', icon: Building2 },
  { key: 'privacidad', label: 'Confidencialidad', icon: ShieldCheck },
];

function ServicesPage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showLeyModal, setShowLeyModal] = useState(false);
  const data = DATA[activeTab];

  return (
    <>
      <Helmet>
        <title>Servicios — AztekillerTech</title>
        <meta name="description" content="Ciberseguridad personal y empresarial. Protección de privacidad, pentesting, soporte técnico, desarrollo web y más." />
      </Helmet>

      {showLeyModal && <LeyOlimpiaModal onClose={() => setShowLeyModal(false)} />}

      <div style={{ minHeight: '100vh' }}>
        <Header />
        <FloatingWhatsAppButton />

        {/* ── Hero ── */}
        <section style={{ paddingTop: '4.5rem', paddingBottom: '2.5rem', position: 'relative' }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.18) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 40%, transparent 100%)',
          }} />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center" style={{ position: 'relative' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                background: 'rgba(168,85,247,0.10)',
                border: '1px solid rgba(168,85,247,0.30)',
                borderRadius: '999px', padding: '0.3rem 1rem', marginBottom: '1.5rem',
              }}>
                <Shield size={11} style={{ color: '#A855F7' }} />
                <span style={{
                  fontSize: '0.58rem', fontFamily: 'Orbitron, sans-serif',
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A855F7', fontWeight: 700,
                }}>
                  Servicios Profesionales
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(1.9rem, 5vw, 3.2rem)',
                fontWeight: 900, letterSpacing: '-0.01em',
                color: 'white', marginBottom: '1rem', lineHeight: 1.1,
              }}>
                Soluciones de{' '}
                <span style={{
                  backgroundImage: 'linear-gradient(135deg, #A855F7 30%, #EC4899)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
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

              {/* Tab switcher — 3 tabs */}
              <div style={{
                display: 'inline-flex',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(168,85,247,0.18)',
                borderRadius: '14px', padding: '5px', gap: '4px',
                flexWrap: 'wrap', justifyContent: 'center',
              }}>
                {TABS.map(({ key, label, icon: TabIcon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.45rem',
                      padding: '0.6rem 1.4rem', borderRadius: '9px',
                      border: 'none', cursor: 'pointer',
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '0.65rem', fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      transition: 'all 0.25s ease',
                      background: activeTab === key
                        ? key === 'privacidad'
                          ? 'linear-gradient(135deg, rgba(16,185,129,0.70), rgba(16,185,129,0.40))'
                          : 'linear-gradient(135deg, rgba(168,85,247,0.75), rgba(168,85,247,0.42))'
                        : 'transparent',
                      color: activeTab === key ? 'white' : 'rgba(255,255,255,0.38)',
                      boxShadow: activeTab === key
                        ? key === 'privacidad'
                          ? '0 2px 20px rgba(16,185,129,0.30)'
                          : '0 2px 20px rgba(168,85,247,0.32)'
                        : 'none',
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

        {/* ── Content ── */}
        <section style={{ paddingBottom: '4rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {activeTab === 'privacidad' ? (
                <PrivacidadContent key="privacidad" />
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
                    <h2 style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)',
                      fontWeight: 800, color: 'white', marginBottom: '0.45rem',
                    }}>
                      {data.title}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto' }}>
                      {data.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {data.categories.map((cat, i) => (
                      <CategoryCard
                        key={cat.name}
                        cat={cat}
                        index={i}
                        onLeyOlimpia={() => setShowLeyModal(true)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
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
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)',
              }}
            >
              <div aria-hidden style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '420px', height: '200px',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.16), transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div aria-hidden style={{
                position: 'absolute', bottom: 0, right: 0, width: '250px', height: '180px',
                background: 'radial-gradient(circle at 100% 100%, rgba(236,72,153,0.10), transparent 65%)',
                pointerEvents: 'none',
              }} />
              <h2 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(1.2rem, 3vw, 1.65rem)',
                fontWeight: 900, color: 'white', marginBottom: '0.75rem', position: 'relative',
              }}>
                ¿Tienes dudas? Hablemos
              </h2>
              <p style={{
                color: 'rgba(255,255,255,0.46)', fontSize: '0.95rem', lineHeight: 1.65,
                position: 'relative', maxWidth: '420px', margin: '0 auto 2rem',
              }}>
                Asesoría gratuita y sin compromiso. Nuestro equipo te ayuda a encontrar la solución ideal.
              </p>
              <a
                href={`${WA}${encodeURIComponent('Hola, me interesa conocer más sobre los servicios de AztekillerTech')}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  position: 'relative',
                  display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                  padding: '0.82rem 2.2rem', borderRadius: '999px',
                  background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                  color: 'white', fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: '0 4px 32px rgba(168,85,247,0.45)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 44px rgba(168,85,247,0.62)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 32px rgba(168,85,247,0.45)'; }}
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
