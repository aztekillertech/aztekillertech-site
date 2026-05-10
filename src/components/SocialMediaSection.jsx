import React from 'react';
import { Youtube, Facebook } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

function SocialMediaSection() {
  const socials = [
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@Aztekillertech',
      description: 'Tutoriales, consejos de ciberseguridad y guías paso a paso.',
      color: 'hover:border-accent hover:text-accent'
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
      url: 'https://www.tiktok.com/@aztekilertech?_r=1&_t=ZS-95gMFU6ZYY9',
      description: 'Tips rápidos y contenido dinámico sobre tecnología.',
      color: 'hover:border-primary hover:text-primary'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/profile.php?id=61572101053791',
      description: 'Novedades, comunidad y contacto directo.',
      color: 'hover:border-primary hover:text-primary'
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
            Conecta con nuestra comunidad
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Síguenos en nuestras redes sociales para mantenerte al día con los mejores consejos de seguridad y tecnología.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socials.map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a href={social.url} target="_blank" rel="noopener noreferrer" className="block h-full mobile-touch-target">
                <Card className={`p-8 h-full border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${social.color.split(' ')[0]}`}>
                  <div className={`w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6 transition-colors duration-300 text-foreground ${social.color.split(' ')[1]}`}>
                    <social.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-foreground transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {social.description}
                  </p>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialMediaSection;