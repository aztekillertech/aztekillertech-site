import React from 'react';
import { MessageCircle } from 'lucide-react';

function FloatingWhatsAppButton() {
  const whatsappUrl = "https://wa.me/5214561175410?text=Hola,%20necesito%20asistencia%20urgente.%20Perdí%20acceso%20a%20mi%20cuenta%20y%20quiero%20recuperarla%20lo%20antes%20posible.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-[0_0_20px_rgba(106,13,173,0.4)] hover:shadow-[0_0_25px_rgba(230,57,70,0.6)] hover:bg-accent transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse hover:animate-none"
      aria-label="Contactar por WhatsApp"
    >
      <span className="font-semibold text-sm hidden sm:block">¿Te hackearon? Escríbeme</span>
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

export default FloatingWhatsAppButton;