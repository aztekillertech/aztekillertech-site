import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';
import {
  Shield, ShieldCheck, Lock, Phone, Mail, MessageCircle,
  Youtube, Music2, Facebook, Star, ChevronDown, Menu, X,
  FileSearch, UserCheck, Zap, Award, Monitor, Wrench,
  CheckCircle, ArrowRight, ExternalLink, Quote,
} from 'lucide-react';
import './styles.css';

const WA_URGENTE = 'https://wa.me/5214561175410?text=Hola%2C%20necesito%20asistencia%20urgente.%20Perd%C3%AD%20acceso%20a%20mi%20cuenta%20y%20quiero%20recuperarla%20lo%20antes%20posible.';
const WA_GENERAL = 'https://wa.me/5214561175410?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.';

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#software', label: 'Software' },
  { href: '#testimonios', label: 'Clientes' },
  { href: '#contacto', label: 'Contacto' },
];

const TRUST_ITEMS = [
  { icon: Lock, title: 'Confidencialidad total', desc: 'Absoluta discreción y protección de datos en cada caso.' },
  { icon: UserCheck, title: 'Atención personalizada', desc: 'Soluciones a medida y trato humano para tu situación específica.' },
  { icon: Zap, title: 'Respuesta rápida', desc: 'Actuamos de inmediato para mitigar riesgos y resolver problemas.' },
  { icon: Award, title: 'Experiencia en ciberseguridad', desc: 'Profesionales altamente capacitados y con ética comprobada.' },
];

const SERVICES = [
  {
    icon: FileSearch,
    title: 'Protección Digital',
    desc: 'Eliminación de contenido íntimo sin consentimiento, protección de cuentas y blindaje de privacidad digital con total discreción.',
    tag: 'Más solicitado',
  },
  {
    icon: Shield,
    title: 'Ciberseguridad',
    desc: 'Auditorías de seguridad, detección de vulnerabilidades, protección contra hackeos y recuperación de cuentas comprometidas.',
    tag: null,
  },
  {
    icon: Wrench,
    title: 'Soporte Técnico',
    desc: 'Reparación de equipos, instalación de software, optimización de sistemas y solución de problemas técnicos.',
    tag: null,
  },
  {
    icon: Monitor,
    title: 'Software Original',
    desc: 'Licencias oficiales de Microsoft Office, Windows y herramientas de productividad a precios accesibles.',
    tag: 'Disponible',
  },
];

const SOFTWARE = [
  {
    name: 'Microsoft Office 365',
    desc: 'Licencia original con acceso a Word, Excel, PowerPoint y 1TB en OneDrive. Ideal para productividad y seguridad en la nube.',
    price: 'Consultar precio',
    badge: 'Promoción disponible',
    icon: '📊',
  },
  {
    name: 'Windows 11 Pro',
    desc: 'Sistema operativo con características avanzadas de seguridad, cifrado BitLocker y herramientas para profesionales.',
    price: 'Consultar precio',
    badge: 'Promoción disponible',
    icon: '🪟',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Javier es una persona sumamente empática y te responde las 24 horas del día para tranquilizarte, además de que está al pendiente de tu bienestar emocional, algo que muy pocos profesionales hacen. Un excelente profesional y un gran ser humano. Me ayudó con mi problema y mi familia lo adora.',
    name: 'Dana Padron',
    role: 'Creadora de Contenido',
  },
  {
    quote: 'Profesional muy humano, además contesta muy rápido; así le escribas o llames a las 4 a.m., estará al pendiente de ti, dándote tranquilidad para tu estabilidad emocional y, sobre todo, te muestra resultados. Mi familia y yo estamos súper agradecidas.',
    name: 'Estela García',
    role: 'Pensionada',
  },
  {
    quote: 'Excelente servicio y excelente persona, no solo te ayuda con cualquier cosa que necesites, si no que también te enseña para que no vuelvas a caer en lo mismo. 100% recomendado con un servicio excepcional.',
    name: 'Zeniff',
    role: 'Profesional independiente',
  },
];

const SOCIAL = [
  { icon: Youtube, label: 'YouTube', desc: 'Tutoriales, consejos de ciberseguridad y guías paso a paso.', href: 'https://www.youtube.com/@AztekillerTech', color: '#ff0000' },
  { icon: Music2, label: 'TikTok', desc: 'Tips rápidos y contenido dinámico sobre tecnología.', href: 'https://www.tiktok.com/@aztekillertech', color: '#010101' },
  { icon: Facebook, label: 'Facebook', desc: 'Novedades, comunidad y contacto directo.', href: 'https://www.facebook.com/aztekillertech', color: '#1877f2' },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className={`azt-nav ${scrolled ? 'azt-nav--scrolled' : ''}`}>
      <div className="azt-nav-inner">
        <a href="#inicio" className="azt-nav-brand">
          <img src="/aztekiller-logo.png" alt="AztekillerTech" className="azt-nav-logo" />
          <span>AztekillerTech</span>
        </a>
        <div className="azt-nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="azt-nav-link">{label}</a>
          ))}
          <a href={WA_URGENTE} target="_blank" rel="noreferrer" className="azt-nav-cta">
            Contactar ahora
          </a>
        </div>
        <button className="azt-nav-hamburger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="azt-nav-mobile">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="azt-nav-mobile-link" onClick={close}>{label}</a>
          ))}
          <a href={WA_URGENTE} target="_blank" rel="noreferrer" className="azt-nav-cta azt-nav-cta--full" onClick={close}>
            Contactar ahora
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="inicio" className="azt-hero">
      <div className="azt-hero-grid-bg" />
      <div className="azt-hero-scan" />
      <div className="azt-hero-inner">
        <div className="azt-hero-copy">
          <span className="azt-badge">Tu aliado de confianza en tecnología</span>
          <h1 className="azt-hero-h1">
            Protegemos tu privacidad.{' '}
            <span className="azt-hero-accent">Recuperamos tu tranquilidad.</span>
          </h1>
          <p className="azt-hero-sub">
            Ayudamos a personas a recuperar el control de su información digital con total confidencialidad.
            Servicios de ciberseguridad y soporte técnico experto, disponibles las 24 horas.
          </p>
          <div className="azt-hero-actions">
            <a href={WA_URGENTE} target="_blank" rel="noreferrer" className="azt-btn-primary">
              <MessageCircle size={18} />
              Recupera tu cuenta ahora
            </a>
            <a href="#servicios" className="azt-btn-ghost">
              Ver servicios
              <ChevronDown size={16} />
            </a>
          </div>
          <div className="azt-hero-trust">
            <span><ShieldCheck size={15} /> Confidencialidad garantizada</span>
            <span><Zap size={15} /> Respuesta en minutos</span>
            <span><Phone size={15} /> Disponibles 24/7</span>
          </div>
        </div>
        <div className="azt-hero-visual">
          <div className="azt-hero-img-wrap">
            <div className="azt-hero-glow" />
            <img src="/aztekiller-logo.png" alt="AztekillerTech" className="azt-hero-img" />
          </div>
          <div className="azt-hero-stats">
            <div className="azt-stat">
              <strong>24/7</strong>
              <span>Disponibilidad</span>
            </div>
            <div className="azt-stat">
              <strong>100%</strong>
              <span>Confidencial</span>
            </div>
            <div className="azt-stat">
              <strong>+5 años</strong>
              <span>Experiencia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="azt-section azt-trust">
      <div className="azt-container">
        <div className="azt-section-head reveal">
          <span className="azt-kicker">¿Por qué elegirnos?</span>
          <h2>Pilares que nos distinguen</h2>
          <p>Nuestros valores fundamentales para brindarte el mejor servicio.</p>
        </div>
        <div className="azt-trust-grid">
          {TRUST_ITEMS.map(({ icon: Icon, title, desc }, i) => (
            <article key={title} className="azt-trust-card reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="azt-trust-icon">
                <Icon size={22} />
              </div>
              <strong>{title}</strong>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicios" className="azt-section azt-services">
      <div className="azt-container">
        <div className="azt-section-head reveal">
          <span className="azt-kicker">Servicios</span>
          <h2>Lo que hacemos por ti</h2>
          <p>Soluciones especializadas para proteger tu identidad y dispositivos digitales.</p>
        </div>
        <div className="azt-services-grid">
          {SERVICES.map(({ icon: Icon, title, desc, tag }, i) => (
            <article key={title} className="azt-service-card reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              {tag && <span className="azt-service-tag">{tag}</span>}
              <div className="azt-service-icon">
                <Icon size={24} />
              </div>
              <strong>{title}</strong>
              <p>{desc}</p>
              <a href={WA_GENERAL} target="_blank" rel="noreferrer" className="azt-service-link">
                Consultar <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SoftwareSection() {
  return (
    <section id="software" className="azt-section azt-software">
      <div className="azt-container">
        <div className="azt-section-head reveal">
          <span className="azt-kicker">Software</span>
          <h2>Software Original y Seguro</h2>
          <p>Protege tus equipos con licencias oficiales. Evita riesgos de malware por software pirata.</p>
        </div>
        <div className="azt-software-grid">
          {SOFTWARE.map(({ name, desc, badge, icon }, i) => (
            <article key={name} className="azt-software-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="azt-software-top">
                <span className="azt-software-badge">{badge}</span>
                <div className="azt-software-icon">{icon}</div>
                <strong>{name}</strong>
                <p>{desc}</p>
              </div>
              <a href={WA_GENERAL} target="_blank" rel="noreferrer" className="azt-btn-primary">
                <ExternalLink size={16} />
                Comprar ahora
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonios" className="azt-section azt-testimonials">
      <div className="azt-container">
        <div className="azt-section-head reveal">
          <span className="azt-kicker">Testimonios</span>
          <h2>Lo que dicen nuestros clientes</h2>
          <p>Experiencias reales de personas que recuperaron su tranquilidad.</p>
        </div>
        <div className="azt-testimonials-grid">
          {TESTIMONIALS.map(({ quote, name, role }, i) => (
            <article key={name} className="azt-testimonial-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <Quote size={28} className="azt-quote-icon" />
              <p className="azt-testimonial-text">"{quote}"</p>
              <div className="azt-testimonial-author">
                <div className="azt-testimonial-avatar">{name[0]}</div>
                <div>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="azt-section azt-social">
      <div className="azt-container">
        <div className="azt-section-head reveal">
          <span className="azt-kicker">Comunidad</span>
          <h2>Conecta con nuestra comunidad</h2>
          <p>Síguenos en redes sociales para mantenerte al día con los mejores consejos de seguridad y tecnología.</p>
        </div>
        <div className="azt-social-grid">
          {SOCIAL.map(({ icon: Icon, label, desc, href, color }, i) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="azt-social-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="azt-social-icon" style={{ color }}>
                <Icon size={32} />
              </div>
              <strong>{label}</strong>
              <p>{desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setStatus('Por favor completa todos los campos.'); return; }
    const text = encodeURIComponent(`Hola, me llamo ${form.name} (${form.email}).\n\n${form.message}`);
    window.open(`https://wa.me/5214561175410?text=${text}`, '_blank');
    setForm({ name: '', email: '', message: '' });
    setStatus('¡Listo! Te redirigimos a WhatsApp para enviar tu mensaje.');
  };

  return (
    <section id="contacto" className="azt-section azt-contact">
      <div className="azt-container">
        <div className="azt-section-head reveal">
          <span className="azt-kicker">Contacto</span>
          <h2>Contáctanos</h2>
          <p>Estamos listos para ayudarte. Escríbenos y te responderemos a la brevedad.</p>
        </div>
        <div className="azt-contact-grid">
          <div className="azt-contact-form reveal">
            <h3>Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Nombre completo
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" />
              </label>
              <label>
                Correo electrónico
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com" />
              </label>
              <label>
                Mensaje
                <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Cuéntanos cómo podemos ayudarte..." />
              </label>
              {status && <p className="azt-form-status">{status}</p>}
              <button type="submit" className="azt-btn-primary">
                <MessageCircle size={18} />
                Enviar por WhatsApp
              </button>
            </form>
          </div>
          <div className="azt-contact-info reveal">
            <div className="azt-contact-card">
              <h3>Contacto directo</h3>
              <a href="tel:+524561175410" className="azt-contact-row">
                <div className="azt-contact-icon"><Phone size={20} /></div>
                <div>
                  <strong>Teléfono</strong>
                  <span>+52 456 117 5410</span>
                </div>
              </a>
              <a href="mailto:info@aztekillertech.net" className="azt-contact-row">
                <div className="azt-contact-icon"><Mail size={20} /></div>
                <div>
                  <strong>Email</strong>
                  <span>info@aztekillertech.net</span>
                </div>
              </a>
              <a href={WA_URGENTE} target="_blank" rel="noreferrer" className="azt-contact-row">
                <div className="azt-contact-icon"><MessageCircle size={20} /></div>
                <div>
                  <strong>WhatsApp</strong>
                  <span>+52 456 117 5410</span>
                </div>
              </a>
            </div>
            <div className="azt-contact-hours">
              <h3>Horario de atención</h3>
              <div className="azt-hours-row"><span>Lunes a Viernes</span><strong>9:00 AM – 8:00 PM</strong></div>
              <div className="azt-hours-row"><span>Sábados</span><strong>10:00 AM – 6:00 PM</strong></div>
              <div className="azt-hours-row"><span>Domingos</span><strong>Emergencias</strong></div>
              <p className="azt-hours-note">Casos urgentes atendidos 24/7 vía WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="azt-footer">
      <div className="azt-footer-inner">
        <div className="azt-footer-brand">
          <img src="/aztekiller-logo.png" alt="AztekillerTech" />
          <p>Especialistas en ciberseguridad, protección de privacidad y soporte técnico profesional.</p>
          <div className="azt-footer-social">
            {SOCIAL.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={18} /></a>
            ))}
          </div>
        </div>
        <div className="azt-footer-links">
          <strong>Servicios</strong>
          <a href="#servicios">Protección Digital</a>
          <a href="#servicios">Ciberseguridad</a>
          <a href="#servicios">Soporte Técnico</a>
          <a href="#software">Software Original</a>
        </div>
        <div className="azt-footer-links">
          <strong>Contacto</strong>
          <a href="tel:+524561175410">+52 456 117 5410</a>
          <a href="mailto:info@aztekillertech.net">info@aztekillertech.net</a>
          <a href={WA_URGENTE} target="_blank" rel="noreferrer">WhatsApp 24/7</a>
        </div>
      </div>
      <div className="azt-footer-bottom">
        <span>© 2026 AztekillerTech. Todos los derechos reservados.</span>
        <div>
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
}

function FloatingWA() {
  return (
    <a href={WA_URGENTE} target="_blank" rel="noreferrer" className="azt-fab" aria-label="WhatsApp">
      <MessageCircle size={26} />
    </a>
  );
}

function App() {
  useScrollReveal();
  return (
    <>
      <Nav />
      <Hero />
      <TrustSection />
      <ServicesSection />
      <SoftwareSection />
      <TestimonialsSection />
      <SocialSection />
      <ContactSection />
      <Footer />
      <FloatingWA />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
