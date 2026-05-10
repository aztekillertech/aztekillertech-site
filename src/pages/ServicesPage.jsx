import React from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Wrench, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

function ServicesPage() {
  const serviceCategories = [
    {
      icon: Wrench,
      title: 'Reparación de Equipos',
      description: 'Soporte técnico profesional para computadoras, laptops y dispositivos móviles',
      link: '/reparacion',
      services: [
        'Reparación de hardware y software',
        'Mantenimiento preventivo y correctivo',
        'Eliminación de virus y malware',
        'Optimización de rendimiento',
        'Recuperación de archivos perdidos',
        'Actualización de componentes'
      ]
    },
    {
      icon: Shield,
      title: 'Ciberseguridad',
      description: 'Protección especializada para tu información digital y privacidad',
      link: '/ciberseguridad',
      services: [
        'Eliminación de contenido íntimo sin consentimiento',
        'Protección de cuentas y redes sociales',
        'Recuperación de accesos comprometidos',
        'Prevención de hackeos',
        'Auditoría de seguridad',
        'Asesoría en privacidad digital'
      ]
    },
    {
      icon: Download,
      title: 'Software',
      description: 'Instalación, configuración y venta de software profesional',
      link: '/software',
      services: [
        'Instalación de sistemas operativos (Windows, macOS, Linux)',
        'Venta de licencias originales',
        'Configuración avanzada de sistemas',
        'Instalación de software especializado',
        'Configuración de redes',
        'Soporte técnico continuo'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nuestros Servicios - AztekillerTech</title>
        <meta name="description" content="Servicios profesionales de reparación de equipos, ciberseguridad, software y soporte técnico. Protegemos tu privacidad y recuperamos tu tranquilidad." />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Nuestros Servicios
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Soluciones profesionales en tecnología, ciberseguridad y protección de privacidad. Cada servicio está diseñado para brindarte tranquilidad y seguridad digital.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="servicios" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {serviceCategories.map((category, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <Card className="p-8 border-border bg-card">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                        <category.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                        {category.description}
                      </p>
                      <Button 
                        asChild
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        <a href={category.link}>
                          Ver más detalles
                        </a>
                      </Button>
                    </Card>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="space-y-4">
                      {category.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-transparent hover:border-border transition-colors">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                          <p className="text-foreground leading-relaxed font-medium">{service}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-12 text-center border border-border shadow-sm max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Necesitas ayuda?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Contáctanos sin compromiso. Nuestro equipo está listo para ayudarte con cualquier necesidad tecnológica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                >
                  <a href="https://wa.me/524561175410" target="_blank" rel="noopener noreferrer">
                    Contactar por WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default ServicesPage;