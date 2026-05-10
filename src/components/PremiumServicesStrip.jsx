import React from 'react';
import { Shield, Wrench, Download, Smartphone } from 'lucide-react';

function PremiumServicesStrip() {
  const services = [
    {
      icon: Shield,
      category: 'Protección digital',
      description: 'Eliminar fotos no consentidas de la red',
      color: 'text-primary'
    },
    {
      icon: Wrench,
      category: 'Reparación de equipos',
      description: 'Windows, Mac, Linux',
      color: 'text-secondary'
    },
    {
      icon: Download,
      category: 'Seguridad y software',
      description: 'Antivirus, programas, software',
      color: 'text-primary'
    },
    {
      icon: Smartphone,
      category: 'Dispositivos móviles',
      description: 'Android y Apple',
      color: 'text-secondary'
    }
  ];

  return (
    <section className="service-strip-bg py-6 sm:py-8 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4 mobile-touch-target"
            >
              <div className={`w-10 h-10 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 ${service.color}`}>
                <service.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="service-category-title mb-1 text-sm sm:text-sm">
                  {service.category}
                </h3>
                <p className="service-description text-xs sm:text-xs">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PremiumServicesStrip;