import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const whatsappUrl = "https://wa.me/5214561175410?text=Hola,%20necesito%20asistencia%20urgente.";

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/reparacion', label: 'Reparación' },
  { path: '/software', label: 'Software' },
  { path: '/contacto', label: 'Contacto' },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: 'rgba(8,0,22,0.55)',
        borderBottom: '1px solid rgba(168,85,247,0.18)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-8">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center mobile-touch-target" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 900,
              fontSize: '1.1rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'white'
            }}>
              AZTEKILLER<span style={{
                backgroundImage: 'linear-gradient(90deg, #A855F7, #EC4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>TECH</span>
            </span>
          </Link>

          {/* Nav — desktop center */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive(link.path) ? '#A855F7' : 'rgba(255,255,255,0.58)',
                  borderBottom: isActive(link.path) ? '2px solid #A855F7' : '2px solid transparent',
                  paddingBottom: '2px',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA — "Connect wallet" style pill */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'white',
              padding: '0.6rem 1.4rem',
              borderRadius: '999px',
              border: '1.5px solid #A855F7',
              background: 'rgba(168,85,247,0.08)',
              textDecoration: 'none',
              boxShadow: '0 0 16px rgba(168,85,247,0.22)',
              whiteSpace: 'nowrap'
            }}
          >
            Contáctanos
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 mobile-touch-target flex items-center justify-center transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{ background: '#060010', borderTop: '1px solid rgba(168,85,247,0.18)' }}>
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-lg mobile-touch-target flex items-center transition-colors duration-200"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive(link.path) ? '#A855F7' : 'rgba(255,255,255,0.65)',
                  background: isActive(link.path) ? 'rgba(168,85,247,0.08)' : 'transparent',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center py-3 rounded-full transition-all duration-200"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'white',
                border: '1.5px solid #A855F7',
                background: 'rgba(168,85,247,0.10)',
                textDecoration: 'none'
              }}
            >
              Contáctanos
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
