import React from 'react';
import { Helmet } from 'react-helmet';
import { Download, Award, CheckCircle, Shield, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

function SoftwarePage() {
  const softwareList = [
    'McAfee Total Security',
    'Windows 11 Pro / Home / LTSC',
    'Paquetería Adobe (Photoshop, Premiere Pro, Illustrator)',
    'Microsoft Office (Word, Excel, PowerPoint)',
    'Navegadores seguros',
    'Programas esenciales y utilidades'
  ];

  const linuxDistributions = [
    'Ubuntu', 'Debian', 'Kali Linux', 'Linux Mint', 'Fedora', 'Arch Linux'
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Software original',
      description: 'Solo trabajamos con licencias originales y legales'
    },
    {
      icon: CheckCircle,
      title: 'Instalación profesional',
      description: 'Configuración optimizada por expertos'
    },
    {
      icon: Award,
      title: 'Garantía incluida',
      description: 'Soporte y garantía en todos nuestros servicios'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Software - AztekillerTech</title>
        <meta name="description" content="Instalación de sistemas operativos, venta de licencias originales y configuración avanzada. Software profesional con garantía." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <FloatingWhatsAppButton />

        <section className="py-20 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Seguridad y Software
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Instalación, configuración y optimización de software para mejorar el rendimiento y la seguridad de los dispositivos.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-8">Software disponible</h2>
                <Card className="p-8 border-border bg-card">
                  <div className="space-y-4">
                    {softwareList.map((software, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-foreground font-medium">{software}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-8">Sistemas Linux</h2>
                <Card className="p-8 border-border bg-card">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {linuxDistributions.map((distro, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                        <Monitor className="w-5 h-5 text-primary flex-shrink-0" />
                        <p className="text-foreground font-medium">{distro}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center border-border bg-card h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-12 rounded-3xl bg-card border border-border shadow-sm"
            >
              <h2 className="text-3xl font-bold mb-4">¿Necesitas instalación?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contáctanos para asesoría personalizada y cotizaciones.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
              >
                <a href="https://wa.me/524561175410" target="_blank" rel="noopener noreferrer">
                  Solicitar asesoría
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default SoftwarePage;