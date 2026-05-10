import React from 'react';
import { Helmet } from 'react-helmet';
import { Monitor, Smartphone, Wrench, Settings, Shield, Zap, HardDrive, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

function RepairPage() {
  const systems = [
    { name: 'Windows', icon: Monitor },
    { name: 'macOS', icon: Monitor },
    { name: 'Linux', icon: Monitor },
    { name: 'Android', icon: Smartphone },
    { name: 'iOS', icon: Smartphone }
  ];

  const services = [
    {
      icon: Wrench,
      title: 'Reparación General',
      description: 'Diagnóstico y reparación de problemas de hardware y software.',
    },
    {
      icon: Settings,
      title: 'Mantenimiento',
      description: 'Mantenimiento preventivo y correctivo integral.',
    },
    {
      icon: Shield,
      title: 'Desinfección',
      description: 'Eliminación completa de virus y malware.',
    },
    {
      icon: HardDrive,
      title: 'Recuperación',
      description: 'Recuperación de datos perdidos o discos dañados.',
    }
  ];

  const processSteps = [
    { number: '01', title: 'Diagnóstico', description: 'Evaluamos el problema sin costo' },
    { number: '02', title: 'Presupuesto', description: 'Cotización clara y detallada' },
    { number: '03', title: 'Reparación', description: 'Solución con piezas de calidad' },
    { number: '04', title: 'Entrega', description: 'Equipo funcionando perfectamente' }
  ];

  return (
    <>
      <Helmet>
        <title>Reparación de Equipos - AztekillerTech</title>
        <meta name="description" content="Servicio profesional de reparación de computadoras, laptops y dispositivos móviles. Soporte para Windows, macOS, Linux, Android e iOS." />
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
                <Wrench className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Reparación de Equipos
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
                Servicio técnico profesional para equipos de cómputo y dispositivos móviles. Diagnóstico, reparación y optimización garantizada.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Sistemas compatibles</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {systems.map((system, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center border-border bg-card">
                    <system.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="font-bold text-foreground">{system.name}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Servicios principales</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full border-border bg-card hover:border-primary/50 transition-colors">
                    <service.icon className="w-10 h-10 text-primary mb-6" />
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Proceso de reparación</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="text-6xl font-bold text-primary/10 mb-4 font-mono">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-12 rounded-3xl bg-card border border-border shadow-sm"
            >
              <h2 className="text-3xl font-bold mb-4">¿Tu equipo falla?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Agenda un diagnóstico hoy mismo.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
              >
                <a href="https://wa.me/524561175410" target="_blank" rel="noopener noreferrer">
                  Solicitar soporte
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

export default RepairPage;