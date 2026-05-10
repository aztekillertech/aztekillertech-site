import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShieldCheck, HardDrive, Bot, Terminal, Globe, Key, FileText, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

function SeguridadPage() {
  const toolsList = [
    { name: 'Nmap', desc: 'escaneo y auditoría de redes' },
    { name: 'Metasploit Framework', desc: 'análisis de vulnerabilidades y pruebas de penetración' },
    { name: 'Wireshark', desc: 'análisis de tráfico de red en tiempo real' },
    { name: 'Burp Suite', desc: 'auditoría de seguridad web' },
    { name: 'Aircrack-ng', desc: 'análisis de seguridad en redes inalámbricas' },
    { name: 'John the Ripper / Hashcat', desc: 'auditoría de contraseñas y hashes' },
    { name: 'Hydra', desc: 'pruebas de autenticación' },
    { name: 'OSINT Framework', desc: 'inteligencia de fuentes abiertas' },
    { name: 'Volatility', desc: 'análisis forense de memoria RAM' },
    { name: 'Autopsy / Sleuth Kit', desc: 'análisis forense digital' }
  ];

  return (
    <>
      <Helmet>
        <title>Seguridad y Privacidad - AztekillerTech</title>
        <meta name="description" content="Conoce cómo protegemos tu información sensible. Infraestructura de ciberseguridad profesional, almacenamiento cifrado y privacidad garantizada." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <FloatingWhatsAppButton />

        {/* Hero Section */}
        <section className="py-20 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                ¿Cómo protegemos tu información?
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                En AztekIllerTech entendemos que cuando nos contactas, muchas veces compartes información extremadamente sensible — ya sea documentos personales, evidencia de hackeos, o contenido íntimo filtrado. Por eso, la seguridad de tus datos no es una promesa vacía: es nuestra infraestructura.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Subsection 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-8 h-full border-border bg-card hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <HardDrive className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Almacenamiento cifrado de extremo a extremo</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Todos nuestros dispositivos de trabajo — discos duros internos, unidades externas y medios de respaldo — operan con cifrado completo mediante BitLocker (Windows) y LUKS (Linux). Esto significa que si alguien accediera físicamente a nuestro equipo, no podría leer absolutamente nada sin la clave de descifrado. Tus archivos, en reposo, son ilegibles para cualquier persona ajena a AztekIllerTech.
                  </p>
                </Card>
              </motion.div>

              {/* Subsection 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-8 h-full border-border bg-card hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Bot className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Inteligencia Artificial con privacidad garantizada</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cuando utilizamos herramientas de Inteligencia Artificial para apoyar el análisis de tu caso, empleamos plataformas con arquitectura de privacidad local: tus documentos y conversaciones no se almacenan en servidores externos ni se usan para entrenar modelos de terceros. A diferencia de soluciones populares como ChatGPT, seleccionamos deliberadamente herramientas donde tu información se procesa y se elimina en tiempo real, sin dejar huella.
                  </p>
                </Card>
              </motion.div>

              {/* Subsection 3 - Spans 2 columns on desktop due to list */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:col-span-2"
              >
                <Card className="p-8 border-border bg-card hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                        <Terminal className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-foreground">Infraestructura de ciberseguridad profesional</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Nuestro entorno de trabajo está construido sobre Kali Linux, la distribución de seguridad ofensiva y defensiva más reconocida a nivel mundial. Contamos con las principales herramientas del ecosistema de ciberseguridad activas y actualizadas.
                      </p>
                    </div>
                    <div className="md:w-2/3 bg-muted/30 rounded-2xl p-6 border border-border/50">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {toolsList.map((tool, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-foreground block">{tool.name}</span>
                              <span className="text-sm text-muted-foreground">{tool.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Subsection 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="p-8 h-full border-border bg-card hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Globe className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Comunicaciones seguras</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Todas las comunicaciones con clientes que involucran información sensible se realizan a través de canales cifrados. Nunca solicitamos información confidencial por medios no seguros.
                  </p>
                </Card>
              </motion.div>

              {/* Subsection 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="p-8 h-full border-border bg-card hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Key className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Política de mínima exposición de datos</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Seguimos el principio de mínimo privilegio: solo accedemos a la información estrictamente necesaria para resolver tu caso. Una vez concluido el servicio, los archivos relacionados con tu caso son eliminados de forma segura mediante sobreescritura, no simplemente borrados.
                  </p>
                </Card>
              </motion.div>

              {/* Subsection 6 - Centered or spans 2 if needed, but fits in grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="md:col-span-2 lg:col-span-1"
              >
                <Card className="p-8 h-full border-border bg-card hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Consentimiento informado</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Para servicios que involucran manejo de contenido sensible (como remoción de imágenes no consensuales), solicitamos un documento de consentimiento informado antes de iniciar cualquier proceso. Tú tienes control total sobre qué información compartimos, con quién y para qué.
                  </p>
                </Card>
              </motion.div>

            </div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-20 text-center max-w-3xl mx-auto"
            >
              <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                  Tu privacidad no es un apartado legal al pie de página. <span className="text-primary">Es el centro de todo lo que hacemos.</span>
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default SeguridadPage;