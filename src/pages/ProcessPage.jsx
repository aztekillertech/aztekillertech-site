import React from 'react';
import { Helmet } from 'react-helmet';
import { Search, ClipboardCheck, Lightbulb, Zap, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

function ProcessPage() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Diagnóstico inicial',
      description: 'Escuchamos tu situación con atención y confidencialidad. Realizamos un análisis preliminar para entender el alcance del problema.'
    },
    {
      number: '02',
      icon: ClipboardCheck,
      title: 'Evaluación técnica',
      description: 'Evaluamos a fondo todos los aspectos técnicos y de seguridad involucrados. Identificamos las mejores opciones de resolución.'
    },
    {
      number: '03',
      icon: Lightbulb,
      title: 'Plan de acción',
      description: 'Presentamos una estrategia clara y detallada, explicando tiempos y medidas de seguridad a implementar.'
    },
    {
      number: '04',
      icon: Zap,
      title: 'Ejecución segura',
      description: 'Implementamos la solución manteniendo comunicación constante y garantizando total discreción.'
    },
    {
      number: '05',
      icon: CheckCircle,
      title: 'Cierre y soporte',
      description: 'Ofrecemos seguimiento post-servicio y recomendaciones clave para prevenir futuros incidentes.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Proceso - AztekillerTech</title>
        <meta name="description" content="Conoce nuestro proceso estructurado y confidencial para resolver incidentes de ciberseguridad." />
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
                Nuestro Proceso
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Un enfoque profesional, estructurado y 100% confidencial para resolver tu caso con la máxima eficacia.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="text-4xl font-bold text-primary/20 mb-2 font-mono">
                    {step.number}
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-muted/50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-12 border-border bg-card text-center max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Garantías del servicio</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <p className="font-medium text-foreground">Confidencial</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                    <p className="font-medium text-foreground">Atención emergencias</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">Total</div>
                    <p className="font-medium text-foreground">Transparencia</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default ProcessPage;