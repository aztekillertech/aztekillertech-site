import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Shield, Youtube, Facebook } from 'lucide-react';

function Footer() {
  const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  return (
    <footer style={{ background: 'linear-gradient(180deg, #0A0018 0%, #060010 100%)', borderTop: '1px solid rgba(168,85,247,0.18)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '0.04em', color: 'white' }}>
                AZTEKILLER<span style={{ background: 'linear-gradient(90deg, #A855F7, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TECH</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Especialistas en ciberseguridad, protección de privacidad y soporte técnico profesional.
            </p>
            <div className="flex items-center gap-4 text-foreground/70">
              <a href="https://www.youtube.com/@Aztekillertech" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200 mobile-touch-target flex items-center justify-center">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@aztekilertech?_r=1&_t=ZS-95gMFU6ZYY9" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200 mobile-touch-target flex items-center justify-center">
                <TikTokIcon />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61572101053791" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200 mobile-touch-target flex items-center justify-center">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-6 text-foreground">Enlaces rápidos</p>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target flex items-center">
                Inicio
              </Link>
              <Link to="/servicios" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target flex items-center">
                Servicios
              </Link>
              <Link to="/reparacion" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target flex items-center">
                Reparación
              </Link>
              <Link to="/software" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target flex items-center">
                Software
              </Link>
              <Link to="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target flex items-center">
                Contacto
              </Link>
            </nav>
          </div>

          <div>
            <p className="font-semibold mb-6 text-foreground">Contacto</p>
            <div className="flex flex-col gap-4">
              <a 
                href="tel:+524561175410" 
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +52 456 117 5410
              </a>
              <a 
                href="mailto:info@aztekillertech.net" 
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@aztekillertech.net
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-6 text-foreground">Privacidad</p>
            <div className="flex items-start gap-3 bg-background p-4 rounded-xl border border-border">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tu información está protegida bajo estrictos principios de confidencialidad.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(168,85,247,0.12)' }}>
          <p className="text-sm text-muted-foreground">
            © 2026 AztekillerTech. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target flex items-center">
              Política de Privacidad
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mobile-touch-target flex items-center">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;