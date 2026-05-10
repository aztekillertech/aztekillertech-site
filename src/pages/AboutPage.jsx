import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Heart, Users, Award } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Ética Profesional",
      description: "Actuamos siempre con integridad, respetando la confidencialidad y privacidad de cada cliente en todo momento."
    },
    {
      icon: Heart,
      title: "Compromiso Real",
      description: "No solo resolvemos problemas técnicos, nos comprometemos genuinamente con el bienestar y tranquilidad de nuestros clientes."
    },
    {
      icon: Users,
      title: "Atención Personalizada",
      description: "Cada caso es único. Ofrecemos soluciones adaptadas a las necesidades específicas de cada persona."
    },
    {
      icon: Award,
      title: "Excelencia Técnica",
      description: "Combinamos conocimiento técnico avanzado con un enfoque humano para ofrecer el mejor servicio posible."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nosotros - AztekillerTech</title>
        <meta name="description" content="Conoce a AztekillerTech, especialistas en ciberseguridad y protección de privacidad digital. Profesionalismo, confidencialidad y compromiso real." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <FloatingWhatsAppButton />

        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
                Sobre <span className="text-primary">AztekillerTech</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Especialistas dedicados a proteger tu privacidad digital y recuperar tu tranquilidad
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-semibold mb-6">Nuestro enfoque profesional</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    En AztekillerTech entendemos que los problemas de privacidad digital y ciberseguridad son situaciones delicadas que requieren más que solo conocimiento técnico. Requieren empatía, discreción y un compromiso genuino con el bienestar de las personas.
                  </p>
                  <p>
                    Nos especializamos en ayudar a personas que han perdido el control de su información digital, enfrentan amenazas a su privacidad o necesitan protección contra contenido no consensuado. Cada caso se maneja con absoluta confidencialidad y profesionalismo.
                  </p>
                  <p>
                    Nuestro objetivo no es solo resolver el problema técnico, sino restaurar tu paz mental y ayudarte a recuperar el control de tu vida digital de manera segura y efectiva.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <h3 className="text-2xl font-semibold mb-6">¿Por qué elegirnos?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-muted-foreground">Experiencia comprobada en casos sensibles de privacidad digital</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-muted-foreground">Manejo confidencial y discreto de toda la información</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-muted-foreground">Respuesta rápida en situaciones urgentes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-muted-foreground">Atención personalizada y seguimiento continuo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-muted-foreground">Soluciones efectivas basadas en cada caso específico</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ letterSpacing: '-0.02em' }}>
                Nuestros valores fundamentales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
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

export default AboutPage;