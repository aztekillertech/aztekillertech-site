import React from 'react';
import { Helmet } from 'react-helmet';
import { Video } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

function TutorialsPage() {
  return (
    <>
      <Helmet>
        <title>Tutoriales - AztekillerTech</title>
        <meta name="description" content="Tutoriales de ciberseguridad, protección de privacidad, optimización de sistemas y más. Aprende a proteger tu información digital." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <FloatingWhatsAppButton />

        <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Video className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
              Tutoriales
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Aprende a proteger tu información digital, optimizar tus dispositivos y resolver problemas técnicos con nuestros tutoriales profesionales.
            </p>
          </div>
        </section>

        <section className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-8">
                <Video className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                Próximamente
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Los tutoriales estarán disponibles pronto. Estamos preparando contenido de alta calidad para ayudarte a proteger tu información digital y optimizar tus dispositivos.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default TutorialsPage;