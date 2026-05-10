import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, Check, Lock, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

const BROKERS = [
  { name:'Spokeo',            url:'https://www.spokeo.com/opt_out/new',                                   dif:'Fácil' },
  { name:'WhitePages',        url:'https://www.whitepages.com/suppression_requests',                       dif:'Fácil' },
  { name:'BeenVerified',      url:'https://www.beenverified.com/faq/opt-out/',                             dif:'Fácil' },
  { name:'Radaris',           url:'https://radaris.com/control/privacy',                                   dif:'Fácil' },
  { name:'Intelius',          url:'https://www.intelius.com/opt-out/',                                     dif:'Fácil' },
  { name:'PeopleFinders',     url:'https://www.peoplefinders.com/manage',                                  dif:'Media' },
  { name:'MyLife',            url:'https://www.mylife.com/ccpa/index.pubview',                             dif:'Media' },
  { name:'ZoomInfo',          url:'https://www.zoominfo.com/about/privacy-center/optout',                  dif:'Media' },
  { name:'Truthfinder',       url:'https://www.truthfinder.com/opt-out/',                                  dif:'Fácil' },
  { name:'Instant Checkmate', url:'https://www.instantcheckmate.com/opt-out/',                             dif:'Fácil' },
  { name:'FastPeopleSearch',  url:'https://www.fastpeoplesearch.com/removal',                              dif:'Fácil' },
  { name:'Pipl',              url:'https://pipl.com/personal-information-removal-request',                 dif:'Media' },
  { name:'Acxiom',            url:'https://isapps.acxiom.com/optout/optout.aspx',                         dif:'Media' },
  { name:'CheckPeople',       url:'https://checkpeople.com/opt-out',                                       dif:'Fácil' },
  { name:'PublicRecordsNow',  url:'https://www.publicrecordsnow.com/static/view/optout',                   dif:'Fácil' },
];

function analyzePhishing(txt) {
  const low = txt.toLowerCase();
  const indicators = [];
  let score = 0;
  if (/urgente|inmediato|expire|vence|suspender|bloqueada|bloquear|limite de tiempo|ahora mismo|24 horas|48 horas/.test(low)) { indicators.push({ type:'high', msg:'Lenguaje de urgencia — presiona a actuar sin pensar' }); score += 25; }
  if (/contrase[ñn]a|password|clave|pin|tarjeta|cvv|número de cuenta|datos bancarios|nip|token/.test(low)) { indicators.push({ type:'high', msg:'Solicita datos sensibles (contraseña, tarjeta, PIN)' }); score += 35; }
  if (/haz clic|click aquí|ingresa aquí|verifica aquí|confirma aquí|accede aquí/.test(low)) { indicators.push({ type:'med', msg:'Botón o enlace de acción urgente' }); score += 15; }
  if (/ganaste|ganador|premio|lotería|gratis|regalo|seleccionado|elegido|afortunado/.test(low)) { indicators.push({ type:'high', msg:'Promesa de premios o regalos gratuitos' }); score += 25; }
  if (/banco|bbva|santander|banamex|sat|imss|gobierno|policía|microsoft|apple|google|amazon|paypal|netflix/.test(low)) { indicators.push({ type:'med', msg:'Menciona institución conocida — posible suplantación' }); score += 20; }
  if (/transfier|depósito|envía|manda|pago urgente|cargo automático/.test(low)) { indicators.push({ type:'high', msg:'Solicita transferencia o pago de dinero' }); score += 30; }
  const urls = txt.match(/https?:\/\/[^\s]+/g) || [];
  urls.forEach(url => {
    if (/bit\.ly|tinyurl|goo\.gl|t\.co|is\.gd|shorturl|ow\.ly|rb\.gy/.test(url)) { indicators.push({ type:'high', msg:`Link acortado detectado` }); score += 25; }
    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) { indicators.push({ type:'high', msg:'Link usa dirección IP' }); score += 40; }
  });
  if (indicators.length === 0) indicators.push({ type:'ok', msg:'No se detectaron señales de alerta conocidas' });
  score = Math.min(score, 100);
  const vcolor = score === 0 ? 'ok' : score < 40 ? 'low' : score < 70 ? 'med' : 'high';
  const verdict = score === 0 ? 'Sin señales de riesgo. Igual verifica el origen.' : score < 40 ? 'Riesgo bajo. Procede con precaución.' : score < 70 ? 'Riesgo moderado. No compartas datos ni hagas clic.' : 'Alto riesgo de phishing. No respondas ni abras ningún enlace.';
  return { score, vcolor, verdict, indicators };
}

function simpleEncrypt(text, key) {
  try { return btoa(unescape(encodeURIComponent(text.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join('')))); } catch { return ''; }
}
function simpleDecrypt(encoded, key) {
  try { return decodeURIComponent(escape(atob(encoded))).split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))).join(''); } catch { return '(Error al descifrar)'; }
}

const glassCard = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,85,247,0.30)', borderRadius: '16px', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', padding: '1.75rem', marginBottom: '1rem' };
const tabs = [['footprint','🔍','Huella'],['identity','🎭','Identidad'],['brokers','🗂️','Brókers'],['detector','🛡️','Detector'],['vault','🔐','Bóveda'],['alerts','🚨','Alertas']];

export default function CentroPage() {
  const [activeTab, setActiveTab] = useState('footprint');
  const [footprintEmail, setFootprintEmail] = useState('');
  const [aliasBase, setAliasBase] = useState('');
  const [aliasList, setAliasList] = useState([]);
  const [aliasCopied, setAliasCopied] = useState('');
  const [brokerChecks, setBrokerChecks] = useState(() => { try { return JSON.parse(localStorage.getItem('azt-broker-checks') || '{}'); } catch { return {}; } });
  const [detectorInput, setDetectorInput] = useState('');
  const [detectorResult, setDetectorResult] = useState(null);
  const [vaultPin, setVaultPin] = useState('');
  const [vaultPinInput, setVaultPinInput] = useState('');
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [vaultNotes, setVaultNotes] = useState([]);
  const [vaultNewTitle, setVaultNewTitle] = useState('');
  const [vaultNewBody, setVaultNewBody] = useState('');
  const [copied, setCopied] = useState('');

  const copyText = (text, key) => { navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(''), 2000); }); toast.success('Copiado'); };

  const generateAliases = () => {
    const base = (aliasBase || 'usuario').toLowerCase().replace(/[^a-z0-9]/g, '');
    const words = ['secure','safe','private','guard','shield','anon','prv','alt','box','drop'];
    const r = () => Math.floor(Math.random() * 900 + 100);
    const w = () => words[Math.floor(Math.random() * words.length)];
    setAliasList([`${base}.${w()}${r()}`,`${w()}.${base}.${r()}`,`${base}${r()}`,`${w()}${r()}.${base}`,`${base}.privado.${r()}`]);
  };

  const copyAlias = (alias) => { navigator.clipboard.writeText(alias + '@simplelogin.com').then(() => { setAliasCopied(alias); setTimeout(() => setAliasCopied(''), 2000); }); };

  const saveBrokerCheck = (name, checked) => {
    const next = { ...brokerChecks, [name]: checked };
    setBrokerChecks(next);
    localStorage.setItem('azt-broker-checks', JSON.stringify(next));
  };

  const unlockVault = () => {
    if (vaultPinInput.length < 4) return;
    setVaultPin(vaultPinInput);
    const stored = JSON.parse(localStorage.getItem('azt-vault-notes') || '[]');
    setVaultNotes(stored);
    setVaultUnlocked(true);
  };

  const addVaultNote = () => {
    if (!vaultNewTitle.trim() || !vaultNewBody.trim()) return;
    const note = { id: Date.now(), title: vaultNewTitle, body_enc: simpleEncrypt(vaultNewBody, vaultPin), created_at: new Date().toISOString() };
    const updated = [note, ...vaultNotes];
    setVaultNotes(updated);
    localStorage.setItem('azt-vault-notes', JSON.stringify(updated));
    setVaultNewTitle(''); setVaultNewBody('');
    toast.success('Nota guardada en la bóveda');
  };

  const deleteVaultNote = (id) => {
    const updated = vaultNotes.filter(n => n.id !== id);
    setVaultNotes(updated);
    localStorage.setItem('azt-vault-notes', JSON.stringify(updated));
  };

  const inputStyle = { width: '100%', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '10px', color: 'white', fontSize: '0.9rem', outline: 'none' };
  const btnPrimary = { padding: '0.65rem 1.2rem', borderRadius: '10px', background: 'rgba(168,85,247,0.15)', border: '1.5px solid #A855F7', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' };
  const colorForVColor = (v) => v === 'high' ? '#ef4444' : v === 'med' ? '#f59e0b' : v === 'low' ? '#A855F7' : '#22c55e';
  const rgbForVColor = (v) => v === 'high' ? '239,68,68' : v === 'med' ? '245,158,11' : v === 'low' ? '168,85,247' : '34,197,94';
  const completedBrokers = Object.values(brokerChecks).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <FloatingWhatsAppButton />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>CENTRO DE</p>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 900, color: 'white', marginBottom: '0.5rem' }}>
            SEGURIDAD <span style={{ background: 'linear-gradient(90deg,#A855F7,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>DIGITAL</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.48)', maxWidth: 480 }}>7 herramientas para proteger tu identidad, huella digital y datos personales.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(([id, icon, label]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.63rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '999px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem',
                background: activeTab === id ? 'rgba(168,85,247,0.22)' : 'rgba(255,255,255,0.04)',
                border: activeTab === id ? '1px solid rgba(168,85,247,0.70)' : '1px solid rgba(168,85,247,0.22)',
                color: activeTab === id ? '#A855F7' : 'rgba(255,255,255,0.55)',
                boxShadow: activeTab === id ? '0 0 14px rgba(168,85,247,0.25)' : 'none' }}>
              {icon} {label}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>

          {/* ── HUELLA ── */}
          {activeTab === 'footprint' && (
            <>
              <div style={glassCard}>
                <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>🔍 Verifica tu huella digital</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.84rem', marginBottom: '1rem' }}>Comprueba si tu correo aparece en filtraciones de bases de datos públicas.</p>
                <div className="flex gap-2 flex-wrap">
                  <input value={footprintEmail} onChange={e => setFootprintEmail(e.target.value)} placeholder="tu@correo.com" style={{ ...inputStyle, flex: 1, minWidth: '200px' }} />
                  <a href={`https://haveibeenpwned.com/account/${encodeURIComponent(footprintEmail || '')}`} target="_blank" rel="noreferrer" style={{ ...btnPrimary, textDecoration: 'none' }}>
                    <ExternalLink size={14} /> Verificar en HIBP
                  </a>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.32)', marginTop: '0.75rem' }}>Have I Been Pwned es el estándar mundial para verificar filtraciones.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[['🔐 Have I Been Pwned','https://haveibeenpwned.com'],['🦊 Firefox Monitor','https://monitor.firefox.com'],['🕵️ DeHashed','https://dehashed.com']].map(([l,u]) => (
                    <a key={l} href={u} target="_blank" rel="noreferrer" style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.25)', color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', textDecoration: 'none' }}>{l}</a>
                  ))}
                </div>
              </div>
              <div style={glassCard}>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>🌐 Tu presencia en buscadores</h3>
                <div className="flex flex-wrap gap-2">
                  <a href={`https://www.google.com/search?q="${encodeURIComponent(footprintEmail || 'tu correo')}"`} target="_blank" rel="noreferrer" style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.25)', color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', textDecoration: 'none' }}>🔎 Buscar mi correo en Google</a>
                </div>
              </div>
              <div style={glassCard}>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>📋 Tipos de datos que pueden estar expuestos</h3>
                <div className="flex flex-wrap gap-2">
                  {['Correo electrónico','Nombre completo','Número de teléfono','Contraseña hasheada','Dirección IP','Fecha de nacimiento','Dirección física','Preguntas de seguridad'].map(d => (
                    <span key={d} style={{ padding: '0.3rem 0.7rem', borderRadius: '999px', background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.22)', color: 'rgba(255,255,255,0.58)', fontSize: '0.78rem' }}>{d}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── IDENTIDAD ── */}
          {activeTab === 'identity' && (
            <>
              <div style={glassCard}>
                <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>🎭 Genera correos alias</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.84rem', marginBottom: '1rem' }}>Usa un alias diferente en cada sitio. Si empiezan a llegarte spams, simplemente desactívalo.</p>
                <div className="flex gap-2 flex-wrap mb-2">
                  <input value={aliasBase} onChange={e => setAliasBase(e.target.value)} placeholder="Tu nombre o username base (ej: javier)" style={{ ...inputStyle, flex: 1, minWidth: '200px' }} />
                  <button onClick={generateAliases} style={btnPrimary}>Generar</button>
                </div>
                {aliasList.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                    {aliasList.map(alias => (
                      <div key={alias} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0.85rem', borderRadius: '8px', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.20)' }}>
                        <span style={{ color: '#A855F7', fontFamily: 'monospace', fontSize: '0.88rem' }}>{alias}@simplelogin.com</span>
                        <button onClick={() => copyAlias(alias)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(168,85,247,0.14)', border: '1px solid rgba(168,85,247,0.30)', borderRadius: '6px', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', padding: '0.3rem 0.6rem', cursor: 'pointer' }}>
                          {aliasCopied === alias ? <Check size={12} /> : <Copy size={12} />}{aliasCopied === alias ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={glassCard}>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>🛠️ Servicios de alias recomendados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[{ name:'SimpleLogin', url:'https://simplelogin.io', desc:'Gratis y open source. Reenvía a tu correo real.', tag:'Gratis' },{ name:'AnonAddy', url:'https://addy.io', desc:'Plan gratuito generoso. Muy privado.', tag:'Gratis' },{ name:'Firefox Relay', url:'https://relay.firefox.com', desc:'De Mozilla. Simple y confiable.', tag:'Gratis' },{ name:'Apple Hide My Email', url:'https://support.apple.com/en-us/102540', desc:'Incluido en iCloud+. Solo para Apple.', tag:'iCloud+' }].map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{ padding: '0.85rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168,85,247,0.20)', textDecoration: 'none', display: 'block' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <strong style={{ color: 'white', fontSize: '0.88rem' }}>{s.name}</strong>
                        <span style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '999px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.30)', color: '#A855F7' }}>{s.tag}</span>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>{s.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── BRÓKERS ── */}
          {activeTab === 'brokers' && (
            <div style={glassCard}>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>🗂️ Elimina tus datos de brókers</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.84rem', marginBottom: '1rem' }}>Estos sitios venden tu información sin permiso. Solicita que te borren y marca los completados.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem' }}>{completedBrokers} de {BROKERS.length} completados</span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(completedBrokers / BROKERS.length) * 100}%`, background: 'linear-gradient(90deg,#A855F7,#EC4899)', height: '100%', borderRadius: '4px', transition: 'width 0.3s' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {BROKERS.map(b => (
                  <div key={b.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0.85rem', borderRadius: '8px', background: brokerChecks[b.name] ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${brokerChecks[b.name] ? 'rgba(168,85,247,0.35)' : 'rgba(168,85,247,0.12)'}`, transition: 'all 0.2s' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', flex: 1 }}>
                      <input type="checkbox" checked={!!brokerChecks[b.name]} onChange={e => saveBrokerCheck(b.name, e.target.checked)} style={{ accentColor: '#A855F7', width: '16px', height: '16px' }} />
                      <span style={{ color: brokerChecks[b.name] ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.75)', fontSize: '0.85rem', textDecoration: brokerChecks[b.name] ? 'line-through' : 'none' }}>{b.name}</span>
                      <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem', borderRadius: '999px', background: b.dif === 'Fácil' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)', border: `1px solid ${b.dif === 'Fácil' ? 'rgba(34,197,94,0.30)' : 'rgba(245,158,11,0.30)'}`, color: b.dif === 'Fácil' ? '#22c55e' : '#f59e0b' }}>{b.dif}</span>
                    </label>
                    <a href={b.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#A855F7', textDecoration: 'none', padding: '0.25rem 0.5rem', borderRadius: '6px', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.20)', whiteSpace: 'nowrap' }}>
                      <ExternalLink size={11} /> Opt-out
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DETECTOR ── */}
          {activeTab === 'detector' && (
            <>
              <div style={glassCard}>
                <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>🛡️ Detector de phishing y estafas</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.84rem', marginBottom: '1rem' }}>Pega el texto de un mensaje, correo, SMS o link sospechoso.</p>
                <textarea value={detectorInput} onChange={e => { setDetectorInput(e.target.value); setDetectorResult(null); }} rows={7}
                  placeholder="Pega aquí el mensaje sospechoso..."
                  style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '10px', color: 'white', fontSize: '0.87rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', marginBottom: '0.75rem' }} />
                <button onClick={() => detectorInput.trim() && setDetectorResult(analyzePhishing(detectorInput))} style={{ ...btnPrimary, justifyContent: 'center' }}>
                  🛡️ Analizar ahora
                </button>
              </div>
              {detectorResult && (
                <div style={glassCard}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '10px', background: `rgba(${rgbForVColor(detectorResult.vcolor)},0.12)`, border: `1px solid rgba(${rgbForVColor(detectorResult.vcolor)},0.35)`, marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', fontWeight: 900, color: colorForVColor(detectorResult.vcolor) }}>{detectorResult.score}%</span>
                    <div><strong style={{ color: 'white' }}>Nivel de riesgo</strong><p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', marginTop: '0.2rem' }}>{detectorResult.verdict}</p></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {detectorResult.indicators.map((ind, i) => (
                      <div key={i} style={{ padding: '0.55rem 0.8rem', borderRadius: '8px', background: `rgba(${ind.type === 'high' ? '239,68,68' : ind.type === 'med' ? '245,158,11' : '34,197,94'},0.08)`, fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span>{ind.type === 'high' ? '🔴' : ind.type === 'med' ? '🟡' : '✅'}</span>{ind.msg}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── BÓVEDA ── */}
          {activeTab === 'vault' && (
            <>
              {!vaultUnlocked ? (
                <div style={{ ...glassCard, maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
                  <Lock size={36} style={{ color: '#A855F7', margin: '0 auto 1rem' }} />
                  <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>🔐 Bóveda cifrada</h2>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.84rem', marginBottom: '1rem' }}>Tus notas se cifran con tu PIN y se guardan solo en este dispositivo.</p>
                  <input type="password" value={vaultPinInput} onChange={e => setVaultPinInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && unlockVault()} placeholder="Escribe tu PIN (mín. 4 caracteres)"
                    style={{ ...inputStyle, marginBottom: '0.75rem', textAlign: 'center', letterSpacing: '0.2em' }} />
                  <button onClick={unlockVault} disabled={vaultPinInput.length < 4} style={{ ...btnPrimary, justifyContent: 'center', width: '100%', opacity: vaultPinInput.length < 4 ? 0.5 : 1 }}>
                    🔓 Abrir bóveda
                  </button>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.75rem' }}>Si es la primera vez, este PIN creará tu bóveda. Guárdalo bien.</p>
                </div>
              ) : (
                <>
                  <div style={glassCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'white' }}>🔐 Bóveda — {vaultNotes.length} nota{vaultNotes.length !== 1 ? 's' : ''}</h2>
                      <button onClick={() => { setVaultUnlocked(false); setVaultPin(''); setVaultPinInput(''); setVaultNotes([]); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '0.78rem' }}>Bloquear</button>
                    </div>
                    <input value={vaultNewTitle} onChange={e => setVaultNewTitle(e.target.value)} placeholder="Título de la nota" style={{ ...inputStyle, marginBottom: '0.5rem' }} />
                    <textarea value={vaultNewBody} onChange={e => setVaultNewBody(e.target.value)} rows={4} placeholder="Contenido (se cifrará con tu PIN)..."
                      style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '10px', color: 'white', fontSize: '0.87rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', marginBottom: '0.75rem' }} />
                    <button onClick={addVaultNote} disabled={!vaultNewTitle.trim() || !vaultNewBody.trim()} style={{ ...btnPrimary, opacity: (!vaultNewTitle.trim() || !vaultNewBody.trim()) ? 0.5 : 1 }}>
                      <Lock size={14} /> Guardar nota cifrada
                    </button>
                  </div>
                  {vaultNotes.length === 0 && (
                    <div style={{ ...glassCard, textAlign: 'center', color: 'rgba(255,255,255,0.35)' }}>
                      <Lock size={28} style={{ margin: '0 auto 0.5rem', opacity: 0.4 }} />
                      <p style={{ fontSize: '0.85rem' }}>Tu bóveda está vacía. Agrega tu primera nota arriba.</p>
                    </div>
                  )}
                  {vaultNotes.map(note => {
                    const body = simpleDecrypt(note.body_enc, vaultPin);
                    return (
                      <div key={note.id} style={{ ...glassCard, position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <strong style={{ color: 'white', fontSize: '0.95rem' }}>{note.title}</strong>
                          <button onClick={() => { if (window.confirm('¿Eliminar esta nota?')) deleteVaultNote(note.id); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}><Trash2 size={14} /></button>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.87rem', whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}>{body}</p>
                        <small style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem' }}>{new Date(note.created_at).toLocaleDateString('es-MX')}</small>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}

          {/* ── ALERTAS ── */}
          {activeTab === 'alerts' && (
            <>
              <div style={glassCard}>
                <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>🚨 Acciones recomendadas</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    { emoji: '🔑', text: 'Verifica tus correos en Have I Been Pwned cada 3 meses', url: 'https://haveibeenpwned.com' },
                    { emoji: '🗝️', text: 'Activa 2FA en todas tus cuentas importantes si aún no lo has hecho' },
                    { emoji: '🔐', text: 'Cambia contraseñas críticas cada 6 meses o si sospechas una filtración' },
                    { emoji: '📋', text: 'Revisa y completa el borrado de datos en los brókers de datos mensualmente' },
                    { emoji: '🛡️', text: 'Escanea links y archivos sospechosos antes de abrirlos' },
                    { emoji: '📱', text: 'Revisa las apps conectadas a tus redes sociales y elimina las que no uses' },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.18)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span>
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', flex: 1 }}>{item.text}</span>
                      {item.url && <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#A855F7', flexShrink: 0 }}><ExternalLink size={14} /></a>}
                    </div>
                  ))}
                </div>
              </div>
              <div style={glassCard}>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.75rem' }}>🚨 ¿Emergencia ahora?</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', marginBottom: '1rem' }}>Si crees que te están hackeando en este momento, contáctanos directamente. Respondemos 24/7.</p>
                <a href="https://wa.me/5214561175410?text=Necesito%20ayuda%20urgente%2C%20creo%20que%20me%20han%20hackeado." target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', borderRadius: '10px', background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                  📱 Contacto de emergencia 24/7
                </a>
              </div>
            </>
          )}

        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
