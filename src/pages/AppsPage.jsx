import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

const categories = [
  { id: 'essential', label: 'Esenciales', apps: ['Microsoft Authenticator', 'Bitwarden', 'Brave Browser'] },
  { id: 'auth', label: 'Autenticadores 2FA', apps: ['Microsoft Authenticator', 'Google Authenticator', 'Authy', '2FAS Auth'] },
  { id: 'passwords', label: 'Contraseñas', apps: ['Bitwarden', 'Proton Pass', 'NordPass'] },
  { id: 'privacy', label: 'Privacidad', apps: ['Proton VPN', 'SimpleLogin', 'Firefox Focus', 'Signal'] },
  { id: 'extras', label: 'Extras', apps: ['Malwarebytes', 'Standard Notes'] },
];

const apps = {
  'Microsoft Authenticator': { name: 'Microsoft Authenticator', category: 'Autenticador 2FA', top: true, icon: 'https://play-lh.googleusercontent.com/icon?package=com.azure.authenticator&size=128', description: 'Respaldo en la nube, login sin contraseña', feature: 'Sincroniza entre dispositivos', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=com.azure.authenticator', ios: 'https://apps.apple.com/app/microsoft-authenticator/id983156458', windows: 'https://www.microsoft.com/store/apps/9NBLGGH08H54', macos: 'https://apps.apple.com/app/microsoft-authenticator/id983156458' } },
  'Bitwarden': { name: 'Bitwarden', category: 'Gestor de contraseñas', top: true, icon: 'https://play-lh.googleusercontent.com/icon?package=com.x8bit.bitwarden&size=128', description: '100% gratis, contraseñas y dispositivos ilimitados', feature: 'Open source, sin límites', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=com.x8bit.bitwarden', ios: 'https://apps.apple.com/app/bitwarden-password-manager/id1137397744', windows: 'https://bitwarden.com/download/', macos: 'https://bitwarden.com/download/' } },
  'Brave Browser': { name: 'Brave Browser', category: 'Navegador privado', top: true, icon: 'https://play-lh.googleusercontent.com/icon?package=com.brave.browser&size=128', description: 'Bloquea ads y trackers por defecto', feature: 'Tor integrado, muy rápido', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=com.brave.browser', ios: 'https://apps.apple.com/app/brave-private-web-browser-vpn/id1052879175', windows: 'https://brave.com/download/', macos: 'https://brave.com/download/' } },
  'Google Authenticator': { name: 'Google Authenticator', category: 'Autenticador 2FA', icon: 'https://play-lh.googleusercontent.com/icon?package=com.google.android.apps.authenticator2&size=128', description: 'El más conocido y compatible', feature: 'Ahora con respaldo en Google', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2', ios: 'https://apps.apple.com/app/google-authenticator/id388497605' } },
  'Authy': { name: 'Authy', category: 'Autenticador 2FA', icon: 'https://play-lh.googleusercontent.com/icon?package=com.authy.authy&size=128', description: 'Multi-dispositivo con respaldo encriptado', feature: 'También disponible en PC', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=com.authy.authy', ios: 'https://apps.apple.com/app/authy/id494168017', windows: 'https://authy.com/download/', macos: 'https://authy.com/download/' } },
  '2FAS Auth': { name: '2FAS Auth', category: 'Autenticador 2FA', icon: 'https://play-lh.googleusercontent.com/icon?package=com.twofasapp&size=128', description: 'Open source, sin rastreadores', feature: 'Máxima privacidad', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=com.twofasapp', ios: 'https://apps.apple.com/app/2fas-auth/id1217793794' } },
  'Proton Pass': { name: 'Proton Pass', category: 'Gestor de contraseñas', icon: 'https://play-lh.googleusercontent.com/icon?package=proton.android.pass&size=128', description: 'De los creadores de ProtonMail', feature: 'Alias de email integrados', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=proton.android.pass', ios: 'https://apps.apple.com/app/proton-pass-password-manager/id6443490629', windows: 'https://proton.me/pass/download', macos: 'https://proton.me/pass/download' } },
  'NordPass': { name: 'NordPass', category: 'Gestor de contraseñas', icon: 'https://play-lh.googleusercontent.com/icon?package=com.nordpass.android.app&size=128', description: 'Interfaz muy amigable', feature: 'Fácil para principiantes', price: 'Freemium', priceNote: '1 dispositivo gratis', links: { android: 'https://play.google.com/store/apps/details?id=com.nordpass.android.app', ios: 'https://apps.apple.com/app/nordpass-password-manager/id1465069804', windows: 'https://nordpass.com/download/windows/', macos: 'https://nordpass.com/download/macos/' } },
  'Proton VPN': { name: 'Proton VPN', category: 'Privacidad', icon: 'https://play-lh.googleusercontent.com/icon?package=ch.protonvpn.android&size=128', description: 'Mejor VPN gratis, sin límite de datos', feature: 'VPN gratis ilimitado', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=ch.protonvpn.android', ios: 'https://apps.apple.com/app/proton-vpn-fast-secure/id1437005085', windows: 'https://protonvpn.com/download-windows', macos: 'https://protonvpn.com/download-macos' } },
  'SimpleLogin': { name: 'SimpleLogin', category: 'Email alias', icon: 'https://play-lh.googleusercontent.com/icon?package=io.simplelogin.android&size=128', description: 'Crea emails alias para proteger tu correo real', feature: '10 alias gratis', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=io.simplelogin.android', ios: 'https://apps.apple.com/app/simplelogin/id1494359858' } },
  'Firefox Focus': { name: 'Firefox Focus', category: 'Navegador privado', icon: 'https://play-lh.googleusercontent.com/icon?package=org.mozilla.focus&size=128', description: 'Navegación privada extrema', feature: 'Borra todo al cerrar', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=org.mozilla.focus', ios: 'https://apps.apple.com/app/firefox-focus-privacy-browser/id1055677337' } },
  'Signal': { name: 'Signal', category: 'Mensajería segura', icon: 'https://play-lh.googleusercontent.com/icon?package=org.thoughtcrime.securesms&size=128', description: 'Mensajería más segura que WhatsApp', feature: 'End-to-end encryption', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms', ios: 'https://apps.apple.com/app/signal-private-messenger/id874139669', windows: 'https://signal.org/download/', macos: 'https://signal.org/download/' } },
  'Malwarebytes': { name: 'Malwarebytes', category: 'Antimalware', icon: 'https://play-lh.googleusercontent.com/icon?package=org.malwarebytes.antimalware&size=128', description: 'Escaneo de malware y adware', feature: 'Confiable sin publicidad', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=org.malwarebytes.antimalware', ios: 'https://apps.apple.com/app/malwarebytes-mobile-security/id1327105431', windows: 'https://www.malwarebytes.com/mwb-download', macos: 'https://www.malwarebytes.com/mac-download' } },
  'Standard Notes': { name: 'Standard Notes', category: 'Notas seguras', icon: 'https://play-lh.googleusercontent.com/icon?package=com.standardnotes&size=128', description: 'Notas encriptadas sincronizadas', feature: 'Zero-knowledge encryption', price: 'GRATIS', links: { android: 'https://play.google.com/store/apps/details?id=com.standardnotes', ios: 'https://apps.apple.com/app/standard-notes/id1285392450', windows: 'https://standardnotes.com/download', macos: 'https://standardnotes.com/download' } },
};

const glassCard = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,85,247,0.30)', borderRadius: '16px', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', padding: '1.5rem', display: 'flex', flexDirection: 'column' };

const btnStyle = (href) => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.4rem 0.75rem', borderRadius: '8px', background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.35)', color: 'rgba(255,255,255,0.78)', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' });
const disabledStyle = { ...btnStyle(''), background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.22)', cursor: 'not-allowed' };

export default function AppsPage() {
  const [activeCategory, setActiveCategory] = useState('essential');
  const cat = categories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <FloatingWhatsAppButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>KIT DE SEGURIDAD</p>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 900, color: 'white', marginBottom: '0.5rem' }}>
            APPS <span style={{ background: 'linear-gradient(90deg,#A855F7,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>SEGURAS</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.48)', maxWidth: 520 }}>Herramientas seleccionadas para proteger tus accesos, contraseñas, navegación y privacidad.</p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveCategory(c.id)}
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, padding: '0.55rem 1.1rem', borderRadius: '999px', cursor: 'pointer', transition: 'all 0.2s',
                background: activeCategory === c.id ? 'rgba(168,85,247,0.22)' : 'rgba(255,255,255,0.04)',
                border: activeCategory === c.id ? '1px solid rgba(168,85,247,0.70)' : '1px solid rgba(168,85,247,0.22)',
                color: activeCategory === c.id ? '#A855F7' : 'rgba(255,255,255,0.55)',
                boxShadow: activeCategory === c.id ? '0 0 14px rgba(168,85,247,0.25)' : 'none' }}>
              {c.label}
            </button>
          ))}
        </div>

        {/* App cards */}
        <motion.div key={activeCategory} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cat?.apps.map(appName => {
            const app = apps[appName];
            if (!app) return null;
            return (
              <div key={appName} style={glassCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                  <img src={app.icon} alt={app.name} style={{ width: 48, height: 48, borderRadius: '12px', objectFit: 'cover', border: '1px solid rgba(168,85,247,0.25)' }}
                    onError={e => { e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${app.name.toLowerCase().replace(' ', '')}.com&sz=128`; }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>{app.name}</h3>
                      {app.top && <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '999px', background: 'rgba(168,85,247,0.20)', border: '1px solid rgba(168,85,247,0.45)', color: '#A855F7', letterSpacing: '0.05em' }}>TOP</span>}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '0.76rem' }}>{app.category}</p>
                  </div>
                </div>

                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.83rem', marginBottom: '0.35rem', fontStyle: 'italic' }}>"{app.description}"</p>
                <p style={{ color: '#A855F7', fontSize: '0.8rem', marginBottom: '1rem' }}>✨ {app.feature}</p>

                <div style={{ marginTop: 'auto' }}>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginBottom: '0.4rem', fontWeight: 600, letterSpacing: '0.05em' }}>📱 MÓVIL</p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                    {app.links.android ? <a href={app.links.android} target="_blank" rel="noreferrer" style={btnStyle(app.links.android)}>Android</a> : <span style={disabledStyle}>Android —</span>}
                    {app.links.ios ? <a href={app.links.ios} target="_blank" rel="noreferrer" style={btnStyle(app.links.ios)}>iOS</a> : <span style={disabledStyle}>iOS —</span>}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginBottom: '0.4rem', fontWeight: 600, letterSpacing: '0.05em' }}>💻 ESCRITORIO</p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {app.links.windows ? <a href={app.links.windows} target="_blank" rel="noreferrer" style={btnStyle(app.links.windows)}>Windows</a> : <span style={disabledStyle}>Win —</span>}
                    {app.links.macos ? <a href={app.links.macos} target="_blank" rel="noreferrer" style={btnStyle(app.links.macos)}>macOS</a> : <span style={disabledStyle}>Mac —</span>}
                  </div>
                  <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', borderRadius: '999px', background: app.price === 'GRATIS' ? 'rgba(34,197,94,0.12)' : 'rgba(168,85,247,0.12)', border: `1px solid ${app.price === 'GRATIS' ? 'rgba(34,197,94,0.30)' : 'rgba(168,85,247,0.30)'}`, color: app.price === 'GRATIS' ? '#22c55e' : '#A855F7', fontWeight: 600 }}>
                    🏷️ {app.price}{app.priceNote ? ` · ${app.priceNote}` : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
