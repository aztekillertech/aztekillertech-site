import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Download, ExternalLink, FileText, Check, Copy, Terminal, Shield, Cpu, Code, Command } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import { toast } from 'sonner';

function RecursosPage() {
  const [copiedOpt, setCopiedOpt] = useState(false);
  const [copiedWin, setCopiedWin] = useState(false);
  const [copiedMac, setCopiedMac] = useState(false);

  const handleCopyOpt = () => {
    navigator.clipboard.writeText('irm https://raw.githubusercontent.com/aztekillertech/tools/main/Optimizar-FPS.ps1 | iex');
    setCopiedOpt(true);
    toast.success('Comando copiado al portapapeles');
    setTimeout(() => setCopiedOpt(false), 2000);
  };

  const handleCopyWin = () => {
    navigator.clipboard.writeText('irm https://raw.githubusercontent.com/aztekillertech/tools/main/audit.ps1 | iex');
    setCopiedWin(true);
    toast.success('Comando copiado al portapapeles');
    setTimeout(() => setCopiedWin(false), 2000);
  };

  const handleCopyMac = () => {
    navigator.clipboard.writeText('curl -s https://raw.githubusercontent.com/aztekillertech/tools/main/audit_mac.sh | bash');
    setCopiedMac(true);
    toast.success('Comando copiado al portapapeles');
    setTimeout(() => setCopiedMac(false), 2000);
  };

  const remoteTools = [
    {
      name: 'UltraViewer',
      url: 'https://www.ultraviewer.net',
      description: 'Software ligero para conexión remota rápida.',
      steps: 'Descargar → Ejecutar → Instalar → Compartir ID y contraseña'
    },
    {
      name: 'AnyDesk',
      url: 'https://anydesk.com',
      description: 'Herramienta rápida y segura sin instalación compleja.',
      steps: 'Descargar → Ejecutar → Compartir código'
    },
    {
      name: 'TeamViewer',
      url: 'https://www.teamviewer.com',
      description: 'Software profesional para acceso remoto seguro.',
      steps: 'Descargar → Instalar → Compartir ID y contraseña'
    },
    {
      name: 'AnyViewer',
      url: 'https://www.anyviewer.com',
      description: 'Alternativa moderna para control remoto.',
      steps: 'Descargar → Instalar → Compartir acceso'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Recursos - AztekillerTech</title>
        <meta name="description" content="Herramientas seguras y formularios para iniciar procesos de soporte técnico o ciberseguridad." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <FloatingWhatsAppButton />

        {/* OPTIMIZE FPS BLOCK */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12 bg-gradient-to-br from-[#130a2a] to-[#2a1354] border-primary/30 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                  <div className="flex-1 w-full">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 text-white tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                      Optimiza tu PC en segundos (Script automático)
                    </h2>
                    <p className="text-lg md:text-xl text-purple-200 mb-8 leading-relaxed max-w-3xl">
                      Ejecuta esta herramienta avanzada que mejora el rendimiento de Windows, elimina procesos innecesarios y optimiza tu sistema automáticamente.
                    </p>
                    
                    <div className="bg-[#0a0a0a] border border-white/10 p-5 md:p-6 rounded-xl font-mono text-green-400 text-sm md:text-base overflow-x-auto mb-8 shadow-inner text-left">
                      <code>irm https://raw.githubusercontent.com/aztekillertech/tools/main/Optimizar-FPS.ps1 | iex</code>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Button 
                        onClick={handleCopyOpt}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold h-14 px-8 shadow-lg shadow-primary/20 transition-all duration-300"
                      >
                        {copiedOpt ? (
                          <><Check className="w-5 h-5 mr-2" /> Copiado</>
                        ) : (
                          <><Copy className="w-5 h-5 mr-2" /> Copiar comando</>
                        )}
                      </Button>
                      <Button 
                        asChild
                        variant="outline" 
                        className="h-14 px-8 text-white border-white/20 hover:bg-white/10 bg-transparent font-semibold transition-all duration-300"
                      >
                        <a href="https://raw.githubusercontent.com/aztekillertech/tools/main/Optimizar-FPS.ps1" target="_blank" rel="noopener noreferrer">
                          <Code className="w-5 h-5 mr-2" /> Ver en GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* WINDOWS PREMIUM BLOCK: PC Optimization Tool */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#130a2a] via-[#2a1354] to-[#130a2a] py-16 md:py-24 border-b border-primary/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* SECTION 1 - HERO */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="text-6xl md:text-7xl mb-6 transform hover:scale-110 transition-transform duration-300 inline-block">🚀</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                Mejora tu PC Windows en pocos clics!
              </h1>
              <p className="text-lg md:text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
                Diagnostica, detecta problemas y optimiza tu equipo automáticamente con una sola herramienta profesional.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column: Explanations & Instructions */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                {/* SECTION 2 - EXPLANATION */}
                <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-md shadow-xl text-white hover:bg-white/10 transition-colors duration-300">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Cpu className="text-purple-300 w-6 h-6" />
                    </div>
                    ¿Qué hace esta herramienta?
                  </h2>
                  <ul className="space-y-4 mb-6">
                    {[
                      'Analiza procesos sospechosos',
                      'Detecta configuraciones inseguras',
                      'Evalúa el estado general del sistema',
                      'Identifica posibles riesgos de seguridad',
                      'Genera un diagnóstico rápido sin conocimientos técnicos'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-purple-100">
                        <Check className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-purple-200 text-sm leading-relaxed">
                      No necesitas instalar nada. Solo ejecuta el comando y la herramienta hará el análisis automáticamente.
                    </p>
                  </div>
                </Card>

                {/* SECTION 5 - INSTRUCTIONS */}
                <div className="px-2">
                  <h3 className="text-xl font-bold text-white mb-6">Cómo usar</h3>
                  <ol className="space-y-4 relative before:absolute before:inset-y-0 before:left-[15px] before:w-0.5 before:bg-purple-500/30">
                    {[
                      'Abre PowerShell como administrador',
                      'Pega el comando',
                      'Presiona Enter'
                    ].map((step, idx) => (
                      <li key={idx} className="relative flex items-center gap-4 text-purple-100">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-lg ring-4 ring-[#130a2a] z-10 flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-lg">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>

              {/* Right Column: Command, Actions, Trust */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                {/* SECTION 3 - COMMAND BLOCK */}
                <Card className="p-1 border-white/10 bg-gradient-to-b from-white/10 to-transparent shadow-2xl rounded-2xl overflow-hidden">
                  <div className="bg-[#0a0a0a] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                      <Terminal className="text-primary w-5 h-5" />
                      <span className="font-mono text-sm text-gray-400">PowerShell Administrator</span>
                    </div>
                    
                    <div className="bg-black p-5 rounded-lg font-mono text-green-400 text-sm md:text-base overflow-x-auto mb-6 border border-white/5 shadow-inner">
                      <code>irm https://raw.githubusercontent.com/aztekillertech/tools/main/audit.ps1 | iex</code>
                    </div>

                    <Button
                      onClick={handleCopyWin}
                      className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                        copiedWin 
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50' 
                          : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                      }`}
                      variant="outline"
                    >
                      {copiedWin ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 mr-2" />
                          Copiar comando
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                {/* SECTION 4 - ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleCopyWin}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-bold shadow-lg shadow-primary/20"
                  >
                    Usar herramienta ahora
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    className="flex-1 border-white/20 text-white hover:bg-white/10 h-14 bg-transparent"
                  >
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Code className="w-5 h-5 mr-2" /> 
                      Ver código (transparencia)
                    </a>
                  </Button>
                </div>

                {/* SECTION 6 - TRUST MESSAGE */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-black/20 border border-white/5">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-purple-200/90 leading-relaxed">
                    Esta herramienta es transparente y segura. Puedes revisar el código antes de ejecutarlo. No realizamos acciones ocultas.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MAC PREMIUM BLOCK: Mac Optimization Tool */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#111827] via-[#374151] to-[#111827] py-16 md:py-24 border-b border-gray-500/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* SECTION 1 - HERO */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="text-6xl md:text-7xl mb-6 transform hover:scale-110 transition-transform duration-300 inline-block">🍏</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                Mejora tu Mac en pocos clics!
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Diagnostica, detecta problemas y optimiza tu equipo automáticamente con una sola herramienta profesional.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column: Explanations & Instructions */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                {/* SECTION 2 - EXPLANATION */}
                <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-md shadow-xl text-white hover:bg-white/10 transition-colors duration-300">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
                      <Cpu className="text-gray-300 w-6 h-6" />
                    </div>
                    ¿Qué hace esta herramienta?
                  </h2>
                  <ul className="space-y-4 mb-6">
                    {[
                      'Analiza procesos sospechosos',
                      'Detecta configuraciones inseguras',
                      'Evalúa el estado general del sistema',
                      'Identifica posibles riesgos de seguridad',
                      'Genera un diagnóstico rápido sin conocimientos técnicos'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <Check className="text-gray-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 bg-gray-500/10 rounded-lg border border-gray-500/20">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      No necesitas instalar nada. Solo ejecuta el comando y la herramienta hará el análisis automáticamente.
                    </p>
                  </div>
                </Card>

                {/* SECTION 5 - INSTRUCTIONS */}
                <div className="px-2">
                  <h3 className="text-xl font-bold text-white mb-6">Cómo usar</h3>
                  <ol className="space-y-4 relative before:absolute before:inset-y-0 before:left-[15px] before:w-0.5 before:bg-gray-500/30">
                    {[
                      'Abre Terminal (Cmd + Espacio, escribe Terminal)',
                      'Pega el comando',
                      'Presiona Enter'
                    ].map((step, idx) => (
                      <li key={idx} className="relative flex items-center gap-4 text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-white shadow-lg ring-4 ring-[#111827] z-10 flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-lg">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>

              {/* Right Column: Command, Actions, Trust */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                {/* SECTION 3 - COMMAND BLOCK */}
                <Card className="p-1 border-white/10 bg-gradient-to-b from-white/10 to-transparent shadow-2xl rounded-2xl overflow-hidden">
                  <div className="bg-[#0a0a0a] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                      <Command className="text-gray-400 w-5 h-5" />
                      <span className="font-mono text-sm text-gray-400">Terminal</span>
                    </div>
                    
                    <div className="bg-black p-5 rounded-lg font-mono text-green-400 text-sm md:text-base overflow-x-auto mb-6 border border-white/5 shadow-inner">
                      <code>curl -s https://raw.githubusercontent.com/aztekillertech/tools/main/audit_mac.sh | bash</code>
                    </div>

                    <Button
                      onClick={handleCopyMac}
                      className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                        copiedMac 
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50' 
                          : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                      }`}
                      variant="outline"
                    >
                      {copiedMac ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5 mr-2" />
                          Copiar comando
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                {/* SECTION 4 - ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleCopyMac}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white h-14 text-lg font-bold shadow-lg shadow-gray-500/20"
                  >
                    Usar herramienta ahora
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    className="flex-1 border-white/20 text-white hover:bg-white/10 h-14 bg-transparent"
                  >
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Code className="w-5 h-5 mr-2" /> 
                      Ver código (transparencia)
                    </a>
                  </Button>
                </div>

                {/* SECTION 6 - TRUST MESSAGE */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-black/20 border border-white/5">
                  <Shield className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300/90 leading-relaxed">
                    Esta herramienta es transparente y segura. Puedes revisar el código antes de ejecutarlo. No realizamos acciones ocultas.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EXISTING RECURSOS CONTENT */}
        <section className="py-20 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Download className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Recursos y Herramientas
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Accede a las descargas y formularios necesarios para agilizar tu proceso de soporte técnico o ciberseguridad.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <Card className="p-8 md:p-10 border-l-4 border-l-accent border-y-border border-r-border bg-card shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10" />
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                      Formulario de consentimiento
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed max-w-3xl">
                      Para eliminación de contenido sensible. Completa este formulario para iniciar el proceso de eliminación segura de contenido de manera oficial.
                    </p>
                    <Button 
                      asChild
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                    >
                      <a href="https://forms.gle/fkBLRb7xq9bzSY3K7" target="_blank" rel="noopener noreferrer">
                        Completar formulario <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                Soporte remoto
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Descarga una de las opciones y comparte el código de acceso con nuestro equipo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {remoteTools.map((tool, index) => (
                  <Card key={index} className="p-8 border-border bg-card hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-semibold">{tool.name}</h3>
                      <ExternalLink className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    <div className="bg-muted rounded-lg p-4 mb-6">
                      <p className="text-sm font-semibold mb-2 text-foreground">Pasos de instalación:</p>
                      <p className="text-sm text-muted-foreground">{tool.steps}</p>
                    </div>

                    <Button 
                      asChild
                      variant="outline"
                      className="w-full border-border hover:bg-muted text-foreground"
                    >
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        Descargar {tool.name}
                      </a>
                    </Button>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default RecursosPage;