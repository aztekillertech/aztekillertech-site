import React, { useEffect, useState } from 'react';
import { X, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ServiceCardDetail({ service, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const ServiceIcon = service.icon;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleContactClick = () => {
    if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
      window.Tawk_API.toggle();
    } else if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      window.Tawk_API.maximize();
    } else {
      window.open('https://wa.me/524561175410', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div 
        className={`service-detail-overlay ${isClosing ? 'closing' : ''}`}
        onClick={handleOverlayClick}
      />
      
      <div className="service-detail-modal" onClick={handleOverlayClick}>
        <div className={`service-detail-content ${isClosing ? 'closing' : ''}`}>
          <div className="service-detail-header">
            <div className="service-detail-icon-wrapper">
              <ServiceIcon className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {service.title}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="icon"
              className="flex-shrink-0 hover:bg-muted"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="service-detail-features">
            {service.features.map((feature, index) => (
              <div key={index} className="service-detail-feature-item">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-foreground leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="service-detail-actions">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 border-border hover:bg-muted mobile-button"
            >
              Volver a servicios
            </Button>
            <Button
              onClick={handleContactClick}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 mobile-button"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contactar ahora
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCardDetail;