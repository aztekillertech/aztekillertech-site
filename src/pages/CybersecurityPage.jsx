import React from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Lock, FileSearch, UserCheck, Eye, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

function CybersecurityPage() {
  const services = [
    {
      icon: FileSearch,
      title: 'Eliminación de fotos no consentidas',
      description: 'Servicio especializado en la eliminación de contenido íntimo o personal publicado sin consentimiento. Trabajamos con total discreción y profesionalismo.',
      benefits: [
        'Localización del contenido en internet',
        'Reporte en plataformas digitales',
        'Desindexación en motores de búsqueda',
        'Seguimiento continuo',
        'Confidencialidad absoluta'
      ]
    },
    {
      icon: Lock,
      title: 'Protección de cuentas',
      description: 'Fortalecimiento de seguridad en redes sociales, correos y cuentas en línea contra accesos no autorizados.',
      benefits: [
        'Autenticación de dos factores',
        'Auditoría de seguridad',
        'Detección de accesos sospechosos',
        'Recomendaciones personalizadas'
      ]
    },
    {
      icon: UserCheck,
      title: 'Recuperación de accesos',
      description: 'Recuperación profesional de cuentas comprometidas, bloqueadas o hackeadas utilizando técnicas especializadas.',
      benefits: [
        'Recuperación rápida y efectiva',
        'Protección contra futuros ataques',
        'Cambio seguro de credenciales',
        'Verificación de actividad'
      ]
    },
    {
      icon: Shield,
      title: 'Prevención de hackeos',
      description: 'Implementación de medidas de seguridad avanzadas para proteger tu información digital.',
      benefits: [
        'Análisis de vulnerabilidades',
        'Configuración avanzada',
        'Monitoreo de amenazas',
        'Capacitación en buenas prácticas'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Ciberseguridad - AztekillerTech</title>
        <meta name="description" content="Servicios profesionales de ciberseguridad y protección de privacidad. Eliminación de contenido íntimo, protección de cuentas y prevención de hackeos." />
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
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ciberseguridad y Privacidad
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Protección especializada para tu información digital. Manejamos cada caso con absoluta confidencialidad y profesionalismo.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full border-border bg-card flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>
                    <div className="space-y-3 pt-6 border-t border-border">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-medium text-foreground">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tu privacidad es nuestra prioridad
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                Entendemos la sensibilidad de estos casos. Cada situación es tratada con absoluta confidencialidad, empatía y profesionalismo.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-6 bg-muted/50 border-transparent shadow-none">
                  <Eye className="w-8 h-8 text-primary mx-auto mb-4" />
                  <p className="font-bold mb-2 text-foreground">100% Confidencial</p>
                  <p className="text-sm text-muted-foreground">Absoluta discreción en cada caso</p>
                </Card>
                <Card className="p-6 bg-muted/50 border-transparent shadow-none">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                  <p className="font-bold mb-2 text-foreground">Datos protegidos</p>
                  <p className="text-sm text-muted-foreground">Información segura en todo momento</p>
                </Card>
                <Card className="p-6 bg-muted/50 border-transparent shadow-none">
                  <UserCheck className="w-8 h-8 text-primary mx-auto mb-4" />
                  <p className="font-bold mb-2 text-foreground">Atención personalizada</p>
                  <p className="text-sm text-muted-foreground">Soporte dedicado y empático</p>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-12 rounded-3xl bg-muted border border-border"
            >
              <h2 className="text-3xl font-bold mb-4">¿Necesitas ayuda urgente?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contáctanos de inmediato. Entendemos la urgencia de estos casos.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
              >
                <a href="https://wa.me/524561175410" target="_blank" rel="noopener noreferrer">
                  Contactar ahora
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

export default CybersecurityPage;