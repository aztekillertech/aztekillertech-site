import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileSearch, KeyRound, Lock, ShieldAlert, AlertTriangle, Copy, ExternalLink, Check, RefreshCw, MailCheck, Eye, EyeOff, Download } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

const suspiciousTlds = ['.zip','.mov','.top','.xyz','.click','.work','.country','.gq','.tk','.ml','.cf','.ga','.pw','.su','.icu','.cyou','.monster','.cfd','.fun','.life','.live','.online','.site','.space','.uno','.vip','.win'];
const riskyWords = ['urgent','verify','password','login','bonus','payment','gift','free','invoice','airdrop','soporte','premio','factura','pago','suspended','blocked','unusual','confirm','update','secure','account','alert','action','required','compromised','limited','restricted','validate','reactivate','contrasena','acceso','suspendida','bloqueada','verificar','confirmar'];
const shorteners = ['bit.ly','tinyurl.com','t.co','cutt.ly','rebrand.ly','is.gd','lnkd.in','ow.ly','buff.ly','short.io','bl.ink','tiny.cc','snip.ly','rb.gy','shorturl.at'];

function analyzeInput(value, type) {
  let risk = 0;
  const flags = [];
  const lower = value.toLowerCase();

  if (type === 'url') {
    if (shorteners.some(s => lower.includes(s))) { risk += 30; flags.push('Link acortado — oculta el destino real'); }
    if (suspiciousTlds.some(t => lower.endsWith(t) || lower.includes(t + '/'))) { risk += 25; flags.push('Extensión de dominio sospechosa'); }
    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(value)) { risk += 40; flags.push('Usa IP en lugar de nombre de dominio'); }
    if (value.startsWith('http://') && !value.startsWith('https://')) { risk += 15; flags.push('Sin cifrado HTTPS'); }
    const found = riskyWords.filter(w => lower.includes(w));
    if (found.length > 0) { risk += Math.min(found.length * 10, 30); flags.push(`Palabras sospechosas: ${found.slice(0,3).join(', ')}`); }
  } else {
    if (!lower.includes('@')) { flags.push('No parece un correo válido'); risk = 0; }
    else {
      const domain = lower.split('@')[1] || '';
      if (!domain.includes('.')) { risk += 20; flags.push('Dominio sin extensión'); }
      if (suspiciousTlds.some(t => domain.endsWith(t))) { risk += 30; flags.push('Dominio con extensión sospechosa'); }
      if (/\d{4,}/.test(domain)) { risk += 15; flags.push('Dominio con muchos números'); }
    }
  }

  risk = Math.min(risk, 100);
  const level = risk >= 60 ? 'Alto' : risk >= 25 ? 'Medio' : 'Bajo';
  if (flags.length === 0) flags.push('Sin señales de alerta conocidas — siempre verifica el origen');
  return { risk, level, flags };
}

function generatePassword(length = 20, opts = { upper: true, lower: true, nums: true, symbols: true }) {
  let chars = '';
  if (opts.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (opts.lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (opts.nums)  chars += '0123456789';
  if (opts.symbols) chars += '!@#$%^&*()-_=+[]{}';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from(crypto.getRandomValues(new Uint8Array(length))).map(x => chars[x % chars.length]).join('');
}

function passwordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 2) return { label: 'Débil', color: '#ef4444', pct: 20 };
  if (score <= 4) return { label: 'Media', color: '#f59e0b', pct: 55 };
  return { label: 'Fuerte', color: '#A855F7', pct: 100 };
}

function analyzePhishing(txt) {
  const low = txt.toLowerCase();
  const indicators = [];
  let score = 0;
  if (/urgente|inmediato|expire|vence|suspender|bloqueada|bloquear|limite de tiempo|ahora mismo|inmediatamente|en las próximas|24 horas|48 horas/.test(low)) { indicators.push({ type:'high', msg:'Lenguaje de urgencia — presiona a actuar sin pensar' }); score += 25; }
  if (/contrase[ñn]a|password|clave|pin|tarjeta|cvv|número de cuenta|datos bancarios|nip|token/.test(low)) { indicators.push({ type:'high', msg:'Solicita datos sensibles (contraseña, tarjeta, PIN)' }); score += 35; }
  if (/haz clic|click aquí|ingresa aquí|verifica aquí|confirma aquí|accede aquí|entra aquí/.test(low)) { indicators.push({ type:'med', msg:'Botón o enlace de acción urgente' }); score += 15; }
  if (/ganaste|ganador|premio|lotería|gratis|regalo|seleccionado|elegido|afortunado|oferta especial/.test(low)) { indicators.push({ type:'high', msg:'Promesa de premios o regalos gratuitos' }); score += 25; }
  if (/banco|bbva|santander|banamex|sat|imss|gobierno|policía|fbi|microsoft|apple|google|amazon|paypal|netflix/.test(low)) { indicators.push({ type:'med', msg:'Menciona institución conocida — posible suplantación' }); score += 20; }
  if (/transfier|depósito|envía|manda|pago urgente|te cobraremos|cargo automático/.test(low)) { indicators.push({ type:'high', msg:'Solicita transferencia o pago de dinero' }); score += 30; }
  const urls = txt.match(/https?:\/\/[^\s]+/g) || [];
  urls.forEach(url => {
    if (/bit\.ly|tinyurl|goo\.gl|t\.co|is\.gd|shorturl|ow\.ly|rb\.gy/.test(url)) { indicators.push({ type:'high', msg:`Link acortado: ${url.slice(0,50)}` }); score += 25; }
    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) { indicators.push({ type:'high', msg:'Link usa dirección IP' }); score += 40; }
  });
  if (/nombre completo|fecha de nacimiento|número de seguro|curp|rfc|nss/.test(low)) { indicators.push({ type:'med', msg:'Solicita información personal identificable' }); score += 20; }
  if (indicators.length === 0) indicators.push({ type:'ok', msg:'No se detectaron señales de alerta conocidas' });
  score = Math.min(score, 100);
  const vcolor = score === 0 ? 'ok' : score < 40 ? 'low' : score < 70 ? 'med' : 'high';
  const verdict = score === 0 ? 'No hay señales de riesgo detectadas. Igual verifica el origen.' : score < 40 ? 'Riesgo bajo. Procede con precaución y verifica el remitente.' : score < 70 ? 'Riesgo moderado. Hay señales sospechosas. No hagas clic ni compartas datos.' : 'Alto riesgo de phishing o estafa. No respondas ni abras ningún enlace.';
  return { score, vcolor, verdict, indicators };
}

const glassCard = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,85,247,0.30)', borderRadius: '16px', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', padding: '1.75rem' };
const tools = [
  { id: 'verify', icon: FileSearch, label: 'Verificar' },
  { id: 'passwords', icon: KeyRound, label: 'Contraseñas' },
  { id: 'phishing', icon: ShieldAlert, label: 'Anti-Phishing' },
  { id: 'twofa', icon: Lock, label: 'Guía 2FA' },
  { id: 'incident', icon: AlertTriangle, label: 'Incidente' },
];

const riskColor = { Alto: '#ef4444', Medio: '#f59e0b', Bajo: '#A855F7' };

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState('verify');
  const [scanType, setScanType] = useState('url');
  const [scanValue, setScanValue] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [pwdLength, setPwdLength] = useState(20);
  const [pwdOpts, setPwdOpts] = useState({ upper: true, lower: true, nums: true, symbols: true });
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(true);
  const [checkPwd, setCheckPwd] = useState('');
  const [phishingInput, setPhishingInput] = useState('');
  const [phishingResult, setPhishingResult] = useState(null);
  const [fileHash, setFileHash] = useState(null);
  const [fileStatus, setFileStatus] = useState('');
  const [copied, setCopied] = useState('');
  const fileRef = useRef(null);

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(''), 2000); });
    toast.success('Copiado al portapapeles');
  };

  const runScan = () => {
    if (!scanValue.trim()) return;
    setScanResult(analyzeInput(scanValue.trim(), scanType));
  };

  const genPwd = () => setPwd(generatePassword(pwdLength, pwdOpts));

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileStatus('Calculando hash SHA-256...');
    setFileHash(null);
    try {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      const ext = file.name.split('.').pop().toLowerCase();
      const riskyExts = ['exe','bat','cmd','ps1','js','vbs','msi','dmg','apk','sh','zip','rar'];
      const risk = riskyExts.includes(ext) ? 'Alto' : ['pdf','doc','docx','xls','xlsx'].includes(ext) ? 'Medio' : 'Bajo';
      setFileHash({ name: file.name, size: file.size, hash: hex, ext, risk });
      setFileStatus('');
    } catch { setFileStatus('Error al leer el archivo.'); }
  };

  const strength = checkPwd ? passwordStrength(checkPwd) : null;

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <FloatingWhatsAppButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>HERRAMIENTAS DE</p>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 900, color: 'white', marginBottom: '0.5rem' }}>
            SECURITY <span style={{ background: 'linear-gradient(90deg,#A855F7,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>TOOLS</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.48)', maxWidth: 480 }}>Detecta amenazas, genera contraseñas seguras y protege tu identidad digital.</p>
        </motion.div>

        {/* Tool tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tools.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setActiveTool(id)}
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, padding: '0.55rem 1.1rem', borderRadius: '999px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: activeTool === id ? 'rgba(168,85,247,0.22)' : 'rgba(255,255,255,0.04)',
                border: activeTool === id ? '1px solid rgba(168,85,247,0.70)' : '1px solid rgba(168,85,247,0.22)',
                color: activeTool === id ? '#A855F7' : 'rgba(255,255,255,0.55)',
                boxShadow: activeTool === id ? '0 0 14px rgba(168,85,247,0.25)' : 'none' }}>
              <Icon size={14} />{label}
            </button>
          ))}
        </div>

        {/* ── VERIFICAR ── */}
        {activeTool === 'verify' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div style={glassCard}>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileSearch size={18} style={{ color: '#A855F7' }} /> Verificador de links y correos
              </h2>
              <div className="flex gap-2 mb-4">
                {[['url', 'Link/URL'], ['email', 'Correo']].map(([t, l]) => (
                  <button key={t} onClick={() => { setScanType(t); setScanResult(null); setScanValue(''); }}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                      background: scanType === t ? 'rgba(168,85,247,0.20)' : 'rgba(255,255,255,0.04)',
                      border: scanType === t ? '1px solid rgba(168,85,247,0.60)' : '1px solid rgba(168,85,247,0.18)',
                      color: scanType === t ? '#A855F7' : 'rgba(255,255,255,0.55)' }}>{l}</button>
                ))}
              </div>
              <input value={scanValue} onChange={e => { setScanValue(e.target.value); setScanResult(null); }}
                placeholder={scanType === 'url' ? 'https://ejemplo.com/link' : 'correo@dominio.com'}
                style={{ width: '100%', padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '10px', color: 'white', fontSize: '0.9rem', outline: 'none', marginBottom: '0.75rem' }} />
              <button onClick={runScan}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', background: 'rgba(168,85,247,0.15)', border: '1.5px solid #A855F7', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Shield size={16} /> Analizar
              </button>
              {scanResult && (
                <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '10px', background: `rgba(${scanResult.level === 'Alto' ? '239,68,68' : scanResult.level === 'Medio' ? '245,158,11' : '168,85,247'},0.10)`, border: `1px solid ${riskColor[scanResult.level]}40` }}>
                  <strong style={{ color: riskColor[scanResult.level], fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem' }}>Riesgo {scanResult.level}: {scanResult.risk}%</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                    {scanResult.flags.map((f, i) => <li key={i} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.84rem', marginBottom: '0.25rem' }}>{f}</li>)}
                  </ul>
                </div>
              )}
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <a href={`https://www.virustotal.com/gui/search/${encodeURIComponent(scanValue || '')}`} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.9rem', borderRadius: '8px', background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.30)', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', textDecoration: 'none' }}>
                  <ExternalLink size={13} /> Abrir en VirusTotal
                </a>
              </div>
            </div>
            <div style={glassCard}>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={18} style={{ color: '#A855F7' }} /> Hash de archivo (SHA-256)
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.84rem', marginBottom: '1rem' }}>Sube un archivo para calcular su huella digital y verificar si fue alterado.</p>
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '2rem', borderRadius: '12px', border: '2px dashed rgba(168,85,247,0.35)', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', transition: 'all 0.2s' }}>
                <Download size={24} style={{ color: '#A855F7' }} />
                <span>Haz clic o arrastra tu archivo aquí</span>
                <input type="file" ref={fileRef} onChange={handleFile} style={{ display: 'none' }} />
              </label>
              {fileStatus && <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.84rem', marginTop: '0.75rem' }}>{fileStatus}</p>}
              {fileHash && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ color: 'white', fontWeight: 600, marginBottom: '0.25rem' }}>{fileHash.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{(fileHash.size / 1024 / 1024).toFixed(2)} MB · .{fileHash.ext}</p>
                  <div style={{ padding: '0.75rem', borderRadius: '8px', background: `rgba(${fileHash.risk === 'Alto' ? '239,68,68' : fileHash.risk === 'Medio' ? '245,158,11' : '168,85,247'},0.10)`, border: `1px solid ${riskColor[fileHash.risk]}40`, marginBottom: '0.75rem' }}>
                    <strong style={{ color: riskColor[fileHash.risk], fontSize: '0.82rem' }}>Riesgo por extensión: {fileHash.risk}</strong>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.6rem 0.8rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#A855F7', wordBreak: 'break-all', marginBottom: '0.5rem' }}>{fileHash.hash}</div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => copyText(fileHash.hash, 'hash')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.8rem', borderRadius: '8px', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.30)', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer' }}>
                      {copied === 'hash' ? <Check size={13} /> : <Copy size={13} />}{copied === 'hash' ? 'Copiado' : 'Copiar hash'}
                    </button>
                    <a href={`https://www.virustotal.com/gui/file/${fileHash.hash}`} target="_blank" rel="noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.8rem', borderRadius: '8px', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.30)', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', textDecoration: 'none' }}>
                      <ExternalLink size={13} /> Ver en VirusTotal
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── CONTRASEÑAS ── */}
        {activeTool === 'passwords' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div style={glassCard}>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <KeyRound size={18} style={{ color: '#A855F7' }} /> Generador de contraseñas
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem' }}>Longitud: <strong style={{ color: 'white' }}>{pwdLength}</strong></label>
              </div>
              <input type="range" min={8} max={40} value={pwdLength} onChange={e => setPwdLength(+e.target.value)} style={{ width: '100%', marginBottom: '1rem', accentColor: '#A855F7' }} />
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[['upper', 'Mayúsculas (A-Z)'], ['lower', 'Minúsculas (a-z)'], ['nums', 'Números (0-9)'], ['symbols', 'Símbolos (!@#)']].map(([key, label]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={pwdOpts[key]} onChange={e => setPwdOpts(p => ({ ...p, [key]: e.target.checked }))} style={{ accentColor: '#A855F7' }} />{label}
                  </label>
                ))}
              </div>
              <button onClick={genPwd} style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', background: 'rgba(168,85,247,0.15)', border: '1.5px solid #A855F7', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <RefreshCw size={16} /> Generar contraseña
              </button>
              {pwd && (
                <div>
                  <div style={{ position: 'relative' }}>
                    <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '0.8rem 2.5rem 0.8rem 1rem', fontFamily: 'monospace', fontSize: '1rem', color: '#A855F7', wordBreak: 'break-all', letterSpacing: '0.05em' }}>{showPwd ? pwd : '•'.repeat(pwd.length)}</div>
                    <button onClick={() => setShowPwd(s => !s)} style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{showPwd ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                  </div>
                  <button onClick={() => copyText(pwd, 'pwd')} style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.8rem', borderRadius: '8px', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.30)', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer' }}>
                    {copied === 'pwd' ? <Check size={13} /> : <Copy size={13} />}{copied === 'pwd' ? 'Copiada' : 'Copiar'}
                  </button>
                </div>
              )}
            </div>
            <div style={glassCard}>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={18} style={{ color: '#A855F7' }} /> Verificar fortaleza
              </h2>
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <input type={showPwd ? 'text' : 'password'} value={checkPwd} onChange={e => setCheckPwd(e.target.value)} placeholder="Escribe una contraseña para evaluarla"
                  style={{ width: '100%', padding: '0.7rem 2.5rem 0.7rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '10px', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
              </div>
              {strength && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem' }}>Fortaleza:</span>
                    <span style={{ color: strength.color, fontWeight: 700, fontSize: '0.84rem' }}>{strength.label}</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${strength.pct}%`, background: strength.color, height: '100%', borderRadius: '4px', transition: 'width 0.4s' }} />
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {[
                      { ok: checkPwd.length >= 12, msg: '12+ caracteres' },
                      { ok: /[A-Z]/.test(checkPwd), msg: 'Contiene mayúsculas' },
                      { ok: /[0-9]/.test(checkPwd), msg: 'Contiene números' },
                      { ok: /[^A-Za-z0-9]/.test(checkPwd), msg: 'Contiene símbolos' },
                    ].map((c, i) => (
                      <span key={i} style={{ fontSize: '0.82rem', color: c.ok ? '#A855F7' : 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {c.ok ? <Check size={13} /> : '○'} {c.msg}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── ANTI-PHISHING ── */}
        {activeTool === 'phishing' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div style={glassCard}>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={18} style={{ color: '#A855F7' }} /> Detector de phishing
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.84rem', marginBottom: '1rem' }}>Pega el texto de un mensaje, correo, SMS o link sospechoso y lo analizamos.</p>
              <textarea value={phishingInput} onChange={e => { setPhishingInput(e.target.value); setPhishingResult(null); }} rows={7} placeholder="Pega aquí el mensaje sospechoso..."
                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '10px', color: 'white', fontSize: '0.87rem', outline: 'none', resize: 'vertical', marginBottom: '0.75rem', fontFamily: 'inherit' }} />
              <button onClick={() => phishingInput.trim() && setPhishingResult(analyzePhishing(phishingInput))}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', background: 'rgba(168,85,247,0.15)', border: '1.5px solid #A855F7', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={16} /> Analizar ahora
              </button>
            </div>
            {phishingResult ? (
              <div style={glassCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '10px', background: `rgba(${phishingResult.vcolor === 'high' ? '239,68,68' : phishingResult.vcolor === 'med' ? '245,158,11' : phishingResult.vcolor === 'low' ? '168,85,247' : '34,197,94'},0.12)`, border: `1px solid rgba(${phishingResult.vcolor === 'high' ? '239,68,68' : phishingResult.vcolor === 'med' ? '245,158,11' : phishingResult.vcolor === 'low' ? '168,85,247' : '34,197,94'},0.35)`, marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', fontWeight: 900, color: phishingResult.vcolor === 'high' ? '#ef4444' : phishingResult.vcolor === 'med' ? '#f59e0b' : phishingResult.vcolor === 'low' ? '#A855F7' : '#22c55e' }}>{phishingResult.score}%</span>
                  <div><strong style={{ color: 'white', fontSize: '0.9rem' }}>Riesgo de phishing</strong><p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', marginTop: '0.2rem' }}>{phishingResult.verdict}</p></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {phishingResult.indicators.map((ind, i) => (
                    <div key={i} style={{ padding: '0.6rem 0.8rem', borderRadius: '8px', background: `rgba(${ind.type === 'high' ? '239,68,68' : ind.type === 'med' ? '245,158,11' : '34,197,94'},0.08)`, fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span>{ind.type === 'high' ? '🔴' : ind.type === 'med' ? '🟡' : '✅'}</span>{ind.msg}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ ...glassCard, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.5 }}>
                <ShieldAlert size={40} style={{ color: '#A855F7', marginBottom: '0.75rem' }} />
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>El resultado aparecerá aquí</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── 2FA ── */}
        {activeTool === 'twofa' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { platform: 'Instagram', url: 'https://accountscenter.instagram.com/password_and_security/two_factor', icon: '📸', steps: ['Ve a Perfil → ☰ → Configuración → Seguridad', 'Selecciona "Autenticación en dos pasos"', 'Elige "App de autenticación"', 'Escanea el QR con tu app autenticadora', 'Guarda los códigos de respaldo'] },
              { platform: 'TikTok', url: 'https://www.tiktok.com/setting/account/security', icon: '🎵', steps: ['Ve a Perfil → ☰ → Configuración', 'Seguridad → Verificación en 2 pasos', 'Elige "App de autenticación"', 'Escanea el QR y confirma el código', 'Guarda los códigos de respaldo'] },
              { platform: 'Google/YouTube', url: 'https://myaccount.google.com/signinoptions/two-step-verification', icon: '▶️', steps: ['Ve a myaccount.google.com/security', 'Verifica en 2 pasos → Comenzar', 'Elige "App autenticadora"', 'Escanea el QR y confirma', 'Descarga los 10 códigos de respaldo'] },
              { platform: 'Facebook', url: 'https://accountscenter.facebook.com/password_and_security/two_factor', icon: '👥', steps: ['Menú → Configuración → Centro de cuentas', 'Contraseña y seguridad → 2FA', 'Elige "App de autenticación"', 'Escanea el QR y confirma', 'Guarda los códigos de respaldo'] },
              { platform: 'X (Twitter)', url: 'https://x.com/settings/security', icon: '𝕏', steps: ['Más → Configuración → Seguridad', '"Autenticación de dos factores"', 'Elige "App de autenticación"', 'Escanea el QR y confirma', 'Guarda el código de respaldo (solo 1)'] },
              { platform: 'App recomendada', url: 'https://play.google.com/store/apps/details?id=com.azure.authenticator', icon: '🔐', steps: ['Descarga Microsoft Authenticator o Authy', 'Disponibles gratis en App Store y Play Store', 'Más seguro que SMS (SIM swap)', 'Respaldo en la nube disponible', 'Compatible con todas las plataformas'] },
            ].map((item, i) => (
              <div key={i} style={glassCard}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>{item.platform}</h3>
                <ol style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {item.steps.map((step, j) => <li key={j} style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.82rem' }}>{step}</li>)}
                </ol>
                <a href={item.url} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '1rem', padding: '0.45rem 0.8rem', borderRadius: '8px', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.30)', color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', textDecoration: 'none' }}>
                  <ExternalLink size={12} /> Ir a seguridad
                </a>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── INCIDENTE ── */}
        {activeTool === 'incident' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div style={glassCard}>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} style={{ color: '#ef4444' }} /> Pasos ante un hackeo
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Cambia la contraseña del correo principal desde un dispositivo limpio.','Cierra sesiones abiertas en correo, redes sociales, bancos y servicios.','Revoca apps conectadas, tokens, integraciones y extensiones sospechosas.','Activa o regenera 2FA y guarda códigos de respaldo nuevos.','Revisa reglas de reenvío, filtros ocultos y correos de recuperación.','Contacta soporte de la plataforma con capturas, fecha y usuario afectado.','Avisa a contactos clave si hubo riesgo de mensajes falsos o links enviados.','Escanea el dispositivo y cambia contraseñas críticas desde otro equipo.'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem', fontWeight: 900, color: '#A855F7', minWidth: '1.5rem', paddingTop: '0.1rem' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: '0.85rem', lineHeight: 1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={glassCard}>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.75rem' }}>🚨 ¿Es una emergencia?</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', marginBottom: '1rem' }}>Si perdiste acceso a tu cuenta ahora mismo, contáctanos directamente por WhatsApp. Respondemos 24/7.</p>
                <a href="https://wa.me/5214561175410?text=Necesito%20ayuda%20urgente%2C%20creo%20que%20me%20han%20hackeado." target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', borderRadius: '10px', background: 'rgba(239,68,68,0.15)', border: '1.5px solid #ef4444', color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                  📱 Contacto de emergencia 24/7
                </a>
              </div>
              <div style={glassCard}>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>🔗 Recursos de recuperación</h3>
                {[['Instagram', 'https://www.instagram.com/accounts/login/help/'],['TikTok', 'https://www.tiktok.com/login/phone-or-email'],['Google/YouTube', 'https://accounts.google.com/signin/recovery'],['Facebook', 'https://www.facebook.com/login/identify'],['X (Twitter)', 'https://twitter.com/i/flow/password_reset']].map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(168,85,247,0.12)', color: 'rgba(255,255,255,0.65)', fontSize: '0.84rem', textDecoration: 'none' }}>
                    {name} <ExternalLink size={13} style={{ color: '#A855F7' }} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
