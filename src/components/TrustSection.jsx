import React from 'react';
import { Shield, UserCheck, Zap, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

function TrustSection() {
  const trustPoints = [
    {
      icon: Shield,
      title: 'Confidencialidad total',
      description: 'Absoluta discreción y protección de datos en cada caso.'
    },
    {
      icon: UserCheck,
      title: 'Atención personalizada',
      description: 'Soluciones a medida y trato humano para tu situación específica.'
    },
    {
      icon: Zap,
      title: 'Respuesta rápida',
      description: 'Actuamos de inmediato para mitigar riesgos y resolver problemas.'
    },
    {
      icon: Award,
      title: 'Experiencia en ciberseguridad',
      description: 'Profesionales altamente capacitados y con ética comprobada.'
    }
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué confiar en nosotros?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nuestros pilares fundamentales para brindarte el mejor servicio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <point.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {point.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;