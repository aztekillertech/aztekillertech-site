import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function ProductCardsSection() {
  const products = [
    {
      title: 'Microsoft Office 365',
      description: 'Licencia original con acceso a Word, Excel, PowerPoint y 1TB en OneDrive. Ideal para productividad y seguridad en la nube.',
      price: 'Consultar precio',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/512px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      whatsappUrl: 'https://wa.me/5214561175410?text=Hola,%20quiero%20comprar%20Microsoft%20Office%20365%20con%20licencia%20digital'
    },
    {
      title: 'Windows 11 Pro',
      description: 'Sistema operativo con características avanzadas de seguridad, cifrado BitLocker y herramientas para profesionales.',
      price: 'Consultar precio',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Microsoft_Windows_11_logo.svg/512px-Microsoft_Windows_11_logo.svg.png',
      whatsappUrl: 'https://wa.me/5214561175410?text=Hola,%20quiero%20comprar%20una%20licencia%20digital%20de%20Windows%2011%20Pro'
    }
  ];

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Software Original y Seguro
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Protege tus equipos con licencias oficiales. Evita riesgos de malware por software pirata.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full flex flex-col bg-card border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(123,44,191,0.15)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute top-4 right-4 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-accent/20">
                  <Flame className="w-3 h-3" />
                  Promoción disponible
                </div>
                
                <div className="w-16 h-16 mb-6 bg-muted rounded-2xl p-3 flex items-center justify-center border border-border/50">
                  <img src={product.icon} alt={product.title} className="w-full h-full object-contain" loading="lazy" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-card-foreground">{product.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {product.description}
                </p>
                
                <Button 
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-accent transition-colors duration-300 font-bold py-6 text-lg group-hover:shadow-[0_0_15px_rgba(157,78,221,0.4)]"
                >
                  <a href={product.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar ahora
                  </a>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCardsSection;