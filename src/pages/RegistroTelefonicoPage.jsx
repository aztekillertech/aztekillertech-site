import React, { useEffect, useState } from 'react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

/* ── Countdown ── */
function useCountdown(target) {
  const calc = () => {
    const diff = new Date(target) - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000)  / 60000),
      secs:  Math.floor((diff % 60000)    / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

const S = {
  page:    { background: '#06000f', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' },
  section: { maxWidth: 1080, margin: '0 auto', padding: '70px 24px' },
  badge:   (color) => ({ display: 'inline-block', padding: '4px 14px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, background: color + '22', border: `1px solid ${color}55`, color }),
  h2:      { fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.2rem,2.5vw,1.7rem)', fontWeight: 800, marginBottom: 10 },
  card:    { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 12, padding: '24px 22px' },
  tag:     (color) => ({ fontSize: '10px', padding: '2px 8px', borderRadius: 4, background: color + '22', color, border: `1px solid ${color}44`, marginLeft: 6, fontWeight: 700 }),
  dot:     (color) => ({ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: color, marginRight: 8 }),
};

const pros  = (items) => items.map((t, i) => <div key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: 5 }}><span style={S.dot('#22c55e')} />{t}</div>);
const cons  = (items) => items.map((t, i) => <div key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 5 }}><span style={S.dot('#ef4444')} />{t}</div>);
const price = (txt, color = '#22c55e') => <div style={{ marginTop: 14, padding: '6px 14px', borderRadius: 6, background: color + '18', border: `1px solid ${color}44`, fontSize: '0.8rem', fontWeight: 700, color }}>{txt}</div>;

export default function RegistroTelefonicoPage() {
  const cd = useCountdown('2026-07-01T00:00:00');
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={S.page}>
      <Header />

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(180deg, #0e0022 0%, #06000f 100%)',
        padding: '80px 24px 60px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(168,85,247,0.15)',
      }}>
        <span style={S.badge('#22c55e')}>⚡ Fecha límite: 1 de julio de 2026</span>
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
          fontWeight: 900,
          lineHeight: 1.2,
          margin: '22px auto 18px',
          maxWidth: 700,
        }}>
          Registrarte es obligatorio.{' '}
          <span style={{ background: 'linear-gradient(90deg,#ec4899,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Entregar tu privacidad, NO.
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto', lineHeight: 1.75, fontSize: '0.95rem' }}>
          La nueva ley obliga a vincular cada línea móvil a una CURP antes del 30 de junio de 2026.
          Si no lo haces, tu línea solo para llamar al 911. Aquí te mostramos alternativas reales
          — con sus ventajas y sus riesgos. Sin adornos, nada.
        </p>
      </section>

      {/* ── Alternativas sin registrar ── */}
      <section style={S.section}>
        <h2 style={{ ...S.h2, textAlign: 'center' }}>🌐 Datos en la calle sin registrar tu línea</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: 40 }}>
          Cuatro opciones reales — sin teléfonos nacionales, con sus rutas y riesgos reales.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>

          {/* eSIM */}
          <div style={{ ...S.card, borderColor: 'rgba(34,197,94,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <strong style={{ fontSize: '1rem' }}>eSIM Internacional Sub Datos</strong>
              <span style={S.badge('#22c55e')}>Recomendado</span>
            </div>
            {pros(['Sin CURP requerida', 'Datos 4G/5G internacionales', 'Activa en minutos desde la app', 'Funciona en toda la República'])}
            {cons(['No da número telefónico mexicano', 'Requiere teléfono con eSIM compatible', 'Costo mensual en USD'])}
            {price('$10–20 USD/mes — Airalo, Holafly, Maya')}
          </div>

          {/* SIM Extranjera */}
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <strong style={{ fontSize: '1rem' }}>SIM Física Extranjera</strong>
              <span style={S.badge('#f59e0b')}>NL y frontera</span>
            </div>
            {pros(['SIM americana o canadiense sin CURP', 'Número de llamadas real (+1)', 'Datos en roaming en México'])}
            {cons(['Requiere viaje o contacto en frontera', 'Roaming puede ser lento o limitado', 'Planes más caros para México'])}
            {price('$25–45 USD/mes — T-Mobile USA, Mint', '#f59e0b')}
          </div>

          {/* WiFi Portátil */}
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <strong style={{ fontSize: '1rem' }}>Método WiFi Portátil</strong>
              <span style={S.badge('#60a5fa')}>Sin SIM</span>
            </div>
            {pros(['Sin ningún registro de identidad', 'MiFi con eSIM internacional', 'Comparte datos a varios dispositivos', 'Máxima privacidad'])}
            {cons(['Costo inicial del dispositivo MiFi', 'Necesitas llevar el aparato contigo', 'Sin número telefónico propio'])}
            {price('$800–1,500 MXN equipo + $15 USD/mes', '#60a5fa')}
          </div>

        </div>
      </section>

      {/* ── El Sistema del Ancla ── */}
      <section style={{ ...S.section, paddingTop: 0 }}>
        <div style={{ borderTop: '1px solid rgba(168,85,247,0.15)', paddingTop: 60 }}>
          <h2 style={S.h2}>🔗 El Sistema del Ancla</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 680, lineHeight: 1.75, marginBottom: 24, fontSize: '0.9rem' }}>
            Quien sea el ancla para tu CURP en el padrón, si alguien del grupo no ha dicho algo
            llegó — el ancla aparece primero en la investigación. Eso requiere{' '}
            <strong style={{ color: 'white' }}>confianza absoluta</strong> — no confianza mutua.
          </p>

          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '16px 20px', maxWidth: 680, marginBottom: 32 }}>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.7 }}>
              ⚠️ <strong style={{ color: '#ef4444' }}>Riesgo real:</strong> Si usas la CURP de un familiar
              o amigo como ancla y tienes un problema legal, ese familiar queda vinculado al número
              en el padrón oficial. Asegúrate de entender las implicaciones antes de proceder.
            </p>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.85)' }}>El Ancla Familiar</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, maxWidth: 680 }}>
            {[
              ['¿Quién puede ser ancla?', 'Familiar directo con CURP: padre, madre, cónyuge, hermano.'],
              ['¿Qué implica?', 'El ancla aparece asociado al número en el padrón del IFT.'],
              ['¿Es reversible?', 'Sí, pero requiere trámite presencial en el operador.'],
              ['Alternativa segura', 'Persona moral S.A.S. — el ancla es la empresa, no tú.'],
            ].map(([t, d], i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '14px 16px' }}>
                <strong style={{ fontSize: '0.8rem', color: '#a855f7', display: 'block', marginBottom: 6 }}>{t}</strong>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marco legal ── */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(168,85,247,0.1)', borderBottom: '1px solid rgba(168,85,247,0.1)' }}>
        <div style={{ ...S.section, paddingTop: 50, paddingBottom: 50 }}>
          <h2 style={S.h2}>📋 Lo que dice la ley (sin tecnicismos)</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.8, maxWidth: 700, marginBottom: 20 }}>
            Según el artículo 10 de los Lineamientos publicados en el DOF, el límite de 10 líneas
            por CURP NO aplica a personas morales. Las empresas registran sus líneas con RFC y
            constancia de situación fiscal — sin vincular la CURP personal de nadie.
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[['DOF', 'Publicado en el Diario Oficial'], ['IFT', 'Instituto Federal de Telecomunicaciones'], ['RFC', 'Registro sin CURP personal'], ['Operadores', 'AT&T, Telcel, Movistar — aplica a todos']].map(([k, v]) => (
              <div key={k} style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 8, padding: '10px 16px', minWidth: 140 }}>
                <strong style={{ fontSize: '0.75rem', color: '#a855f7', display: 'block' }}>{k}</strong>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Persona moral S.A.S. ── */}
      <section style={S.section}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <span style={{ ...S.badge('#22c55e'), marginBottom: 14, display: 'inline-block' }}>Mejor opción legal</span>
            <h2 style={S.h2}>Persona moral S.A.S.</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontSize: '0.9rem', marginBottom: 20 }}>
              Una S.A.S. (Sociedad por Acciones Simplificada) es la empresa más fácil de constituir
              en México — 100% en línea, en días, sin notario. Con ella, las líneas van a nombre
              de la empresa y el RFC empresarial — sin CURP personal expuesta en el padrón.
            </p>
            {[
              'Sin CURP personal en el padrón del IFT',
              'Hasta 50 líneas por empresa',
              'RFC propio — separación legal total',
              'Deducible de impuestos',
              'Constitución 100% en línea',
            ].map((f, i) => <div key={i} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', marginBottom: 8 }}><span style={S.dot('#22c55e')} />{f}</div>)}
            <a
              href="https://wa.me/5214561175410?text=Hola,%20quiero%20info%20sobre%20crear%20una%20S.A.S.%20para%20mis%20líneas"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block', marginTop: 22,
                background: 'linear-gradient(90deg,#22c55e,#16a34a)',
                color: 'white', borderRadius: 8, padding: '12px 24px',
                fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none',
              }}
            >
              Crear mi S.A.S. sin trampas gordas →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['4–8 días', 'Tiempo de constitución'], ['Desde $1,299', 'Con asesoría incluida'], ['Sin notario', '100% en línea vía SE'], ['50 líneas', 'Capacidad máxima por empresa']].map(([v, l]) => (
              <div key={l} style={{ ...S.card, textAlign: 'center' }}>
                <strong style={{ fontSize: '1.1rem', color: '#22c55e', display: 'block', marginBottom: 6 }}>{v}</strong>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tabla comparativa ── */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(168,85,247,0.1)' }}>
        <div style={{ ...S.section, paddingTop: 60, paddingBottom: 60 }}>
          <h2 style={{ ...S.h2, textAlign: 'center' }}>⚡ Compara todas las alternativas</h2>
          <div style={{ overflowX: 'auto', marginTop: 30 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(168,85,247,0.3)' }}>
                  {['Alternativa', 'Precio', 'Mensual', 'CURP', 'País', 'Líneas', 'Privacidad'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'eSIM Internacional Sub Datos', tag: null,          precio: '$10–20 USD', mensual: '$10–20',  curp: 'No',    pais: 'Ext.',    lineas: '1',    priv: '90%',  highlight: false },
                  { name: 'Número doméstico registrado',  tag: 'Recomendado', precio: 'Gratis',     mensual: 'Tu plan', curp: 'Sí',    pais: 'México',  lineas: '10',   priv: '40%',  highlight: true  },
                  { name: 'MiFi portátil + eSIM',         tag: null,          precio: '$800–1,500', mensual: '$15 USD', curp: 'No',    pais: 'Ext.',    lineas: '1',    priv: '88%',  highlight: false },
                  { name: 'Persona moral S.A.S.',          tag: 'Recomendado', precio: 'Desde $1,299', mensual: 'Plan',curp: 'RFC',   pais: 'México',  lineas: 'Hasta 50', priv: '95%', highlight: true },
                  { name: 'Grupo amigos (ancla común)',   tag: null,          precio: 'Tu plan',    mensual: 'Variable',curp: 'Ancla', pais: 'México',  lineas: 'Varias', priv: '55%', highlight: false },
                  { name: 'SIM extranjera NL',            tag: null,          precio: '$25–45 USD', mensual: '$30 USD', curp: 'No',    pais: 'USA/CA',  lineas: '1',    priv: '85%',  highlight: false },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: row.highlight ? 'rgba(34,197,94,0.05)' : 'transparent' }}>
                    <td style={{ padding: '12px 14px', color: 'white', fontWeight: row.highlight ? 700 : 400 }}>
                      {row.name}
                      {row.tag && <span style={S.tag('#22c55e')}>{row.tag}</span>}
                    </td>
                    <td style={{ padding: '12px 14px', color: 'rgba(255,255,255,0.65)' }}>{row.precio}</td>
                    <td style={{ padding: '12px 14px', color: 'rgba(255,255,255,0.65)' }}>{row.mensual}</td>
                    <td style={{ padding: '12px 14px', color: row.curp === 'No' || row.curp === 'RFC' ? '#22c55e' : '#f59e0b', fontWeight: 700 }}>{row.curp}</td>
                    <td style={{ padding: '12px 14px', color: 'rgba(255,255,255,0.65)' }}>{row.pais}</td>
                    <td style={{ padding: '12px 14px', color: 'rgba(255,255,255,0.65)' }}>{row.lineas}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                          <div style={{ width: row.priv, height: '100%', background: parseInt(row.priv) > 80 ? '#22c55e' : parseInt(row.priv) > 60 ? '#f59e0b' : '#ef4444', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', minWidth: 32 }}>{row.priv}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Actúa antes del 1 de julio ── */}
      <section style={S.section}>
        <h2 style={{ ...S.h2, textAlign: 'center' }}>⚡ Actúa antes del 1 de julio</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 50, marginTop: 30 }}>
          {[
            { n: '1', title: 'Asegura tu cuenta bancaria', desc: 'Ata tu Banco o Mercado Pago a tu número actual. Activa biometría, TOTP y passkeys ahora — antes de perder acceso al número.' },
            { n: '2', title: 'Mueve tu 2FA al IFE o a CURP', desc: 'Migra todos tus autenticadores a una app (Google Authenticator, Aegis) o llave física. No dependas del SMS.' },
          ].map(s => (
            <div key={s.n} style={{ ...S.card, display: 'flex', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem', flexShrink: 0 }}>{s.n}</div>
              <div>
                <strong style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>{s.title}</strong>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tiempo restante hasta el 1 de julio</p>
          <div style={{ display: 'flex', gap: 'clamp(16px, 4vw, 40px)', justifyContent: 'center', alignItems: 'flex-end' }}>
            {[['días', cd.days], ['horas', cd.hours], ['min', cd.mins], ['seg', cd.secs]].map(([label, val]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 900,
                  color: 'white',
                  lineHeight: 1,
                  minWidth: 'clamp(60px, 12vw, 110px)',
                }}>{pad(val)}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
