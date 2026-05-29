import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function MictlanPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#020308', display: 'flex', flexDirection: 'column' }}>
      {/* Barra mínima de regreso */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '8px 16px', background: 'rgba(2,3,14,0.95)',
        borderBottom: '1px solid rgba(124,58,237,0.3)', flexShrink: 0, zIndex: 10,
      }}>
        <a href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: '#a78bfa', fontFamily: 'monospace', fontSize: '12px',
          textDecoration: 'none', padding: '4px 10px', border: '1px solid rgba(124,58,237,0.4)',
          borderRadius: '6px', transition: 'all 0.2s',
        }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(124,58,237,0.15)'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          <ArrowLeft size={12} /> aztekillertech.net
        </a>
        <span style={{ color: 'rgba(124,58,237,0.6)', fontFamily: 'monospace', fontSize: '11px' }}>
          MICTLAN: CÓDIGO OSCURO — Beta
        </span>
        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', fontSize: '10px' }}>
          v1.0-beta · AztekillerTech
        </span>
      </div>

      {/* Juego full-screen */}
      <iframe
        src="https://mictlan-game.pages.dev"
        style={{ flex: 1, border: 'none', width: '100%', display: 'block' }}
        title="MICTLAN: Código Oscuro"
        allow="autoplay"
      />
    </div>
  );
}
