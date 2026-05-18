import React, { useEffect, useRef } from 'react';

const tools = [
  { icon: '🧹', name: 'Limpiador Central',       desc: 'Cache, logs, papelera y basura del sistema.' },
  { icon: '💀', name: 'Desinstalador Obsidiana',  desc: 'Elimina apps y residuos profundos.' },
  { icon: '⚡', name: 'Forja de Drivers',          desc: 'Detecta drivers viejos con respaldo.' },
  { icon: '🚀', name: 'Control de Inicio',         desc: 'Acelera el arranque de Windows.' },
  { icon: '💻', name: 'Salud del Sistema',         desc: 'CPU, RAM, temperatura y hardware.' },
  { icon: '🔐', name: 'Guardian del Registro',     desc: 'Repara entradas rotas con backup.' },
  { icon: '💾', name: 'Analizador de Disco',       desc: 'Encuentra carpetas y archivos gigantes.' },
  { icon: '🔍', name: 'Cazador de Duplicados',     desc: 'Hash MD5 real para duplicados exactos.' },
  { icon: '🛡', name: 'Escudo de Privacidad',      desc: 'Limpia historial, cookies y rastros.' },
  { icon: '🔄', name: 'Actualizador de Apps',      desc: 'Actualización automática con winget.' },
  { icon: '🔧', name: 'Kit de Reparación',         desc: '13 reparaciones de Windows en un click.' },
  { icon: '🛡', name: 'Escaneo de Seguridad',      desc: 'Defender, Firewall, UAC y BitLocker.' },
  { icon: '🔋', name: 'Optimizador de Batería',    desc: 'Salud, ciclos y perfiles de energía.' },
  { icon: '🎮', name: 'Game Booster',              desc: 'Cierra procesos y activa modo juego.' },
  { icon: '🗡', name: 'Destructor de Archivos',    desc: 'Borrado seguro e irreversible.' },
  { icon: '📦', name: 'Bóveda de Respaldo',        desc: 'Respaldo incremental con verificación MD5.' },
  { icon: '🔁', name: 'Punto de Restauración',     desc: 'Crea y elimina puntos del sistema.' },
  { icon: '🌐', name: 'Doctor de Red',             desc: 'Ping, DNS, WiFi y speed test.' },
  { icon: '🔬', name: 'Inspector de Procesos',     desc: 'CPU%, firma digital y suplantación.' },
  { icon: '⚙', name: 'Comandos Rápidos',          desc: '20 herramientas de Windows en un clic.' },
  { icon: '🧠', name: 'Optimizador de RAM',        desc: 'Libera memoria sin cerrar ninguna app.' },
  { icon: '🌍', name: 'Limpiador de Navegadores',  desc: 'Chrome, Edge y Firefox de un golpe.' },
  { icon: '📊', name: 'Monitor en Tiempo Real',    desc: 'CPU, RAM, temperatura y discos live.' },
  { icon: '⚙', name: 'Gestor de Servicios',       desc: 'Preset seguro de servicios no esenciales.' },
  { icon: '⚡', name: 'Acelerador de Internet',    desc: 'DNS Cloudflare, TCP tuning y RSS.' },
  { icon: '🔴', name: 'Escáner de Malware',        desc: '25+ firmas, hosts, Temp EXEs.' },
];

export default function ObsidianToolsPage() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio/azteca-flaute.mp3');
    audioRef.current = audio;
    audio.volume = 0.6;
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.currentTime = 0; };
  }, []);

  const handleDownload = (type) => {
    const base = 'https://github.com/aztekillertech/aztekillertech-site/releases/download/v0.4.0/';
    window.open(
      type === 'setup'
        ? `${base}Aztekiller-Obsidian-Core-Suite-Setup-0.4.0.exe`
        : `${base}Aztekiller-Obsidian-Core-Suite-Portable-0.4.0.exe`,
      '_blank'
    );
  };

  return (
    <div style={{ background: '#080016', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0d0020 0%, #1a0040 50%, #0a0020 100%)',
        padding: '90px 24px 70px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(168,85,247,0.2)',
      }}>
        {/* Orb glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#a855f7',
          marginBottom: 16,
        }}>
          AztekillerTech — Software
        </p>

        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: 20,
          background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Obsidian Core Suite
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
          26 herramientas profesionales de mantenimiento para Windows. Limpieza, seguridad,
          drivers, privacidad y rendimiento — todo en una sola app.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleDownload('setup')}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: 999,
              border: 'none',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(168,85,247,0.45)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(168,85,247,0.65)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(168,85,247,0.45)'; }}
          >
            ⬇ Descargar Setup — v0.4.0
          </button>
          <button
            onClick={() => handleDownload('portable')}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: 999,
              border: '1.5px solid rgba(168,85,247,0.5)',
              background: 'rgba(168,85,247,0.08)',
              color: 'white',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.background = 'rgba(168,85,247,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'; e.currentTarget.style.background = 'rgba(168,85,247,0.08)'; }}
          >
            ⚡ Portable — Sin instalar
          </button>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
          {['Windows 10/11', '26 herramientas', 'v0.4.0', 'Gratis', '~100 MB'].map(b => (
            <span key={b} style={{
              fontSize: '0.72rem',
              padding: '4px 12px',
              borderRadius: 999,
              background: 'rgba(168,85,247,0.12)',
              border: '1px solid rgba(168,85,247,0.25)',
              color: 'rgba(255,255,255,0.7)',
            }}>{b}</span>
          ))}
        </div>
      </section>

      {/* ── Grid de herramientas ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '70px 24px' }}>
        <h2 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 10,
          color: 'white',
        }}>
          Las 26 herramientas
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: 48 }}>
          Cada herramienta al nivel de su competidor comercial.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: 14,
        }}>
          {tools.map((t, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(168,85,247,0.15)',
                borderRadius: 10,
                padding: '16px 18px',
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)';
                e.currentTarget.style.background = 'rgba(168,85,247,0.07)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.15)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: 8 }}>{t.icon}</span>
              <strong style={{ fontSize: '0.85rem', color: 'white', display: 'block', marginBottom: 4 }}>{t.name}</strong>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0d0020, #1a0040)',
        borderTop: '1px solid rgba(168,85,247,0.18)',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.5rem', fontWeight: 800, marginBottom: 14 }}>
          ¿Tienes una PC lenta?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 30, maxWidth: 480, margin: '0 auto 30px' }}>
          Descarga Obsidian Core Suite y dale nueva vida a tu equipo en minutos.
        </p>
        <button
          onClick={() => handleDownload('setup')}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '16px 40px',
            borderRadius: 999,
            border: 'none',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 0 40px rgba(168,85,247,0.5)',
          }}
        >
          ⬇ Descargar gratis — v0.4.0
        </button>
      </section>
    </div>
  );
}
