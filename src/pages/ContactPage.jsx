import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Mensaje enviado. Te contactaremos pronto.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contacto - AztekillerTech</title>
        <meta name="description" content="Contáctanos para resolver tus problemas de ciberseguridad y privacidad digital. Respuesta rápida y confidencial garantizada." />
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
                Contáctanos
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Estamos listos para ayudarte. Tu información está segura y será tratada con total confidencialidad.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-8">Envíanos un mensaje</h2>
                <Card className="p-8 border-border bg-card shadow-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Nombre completo</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2 bg-background border-border focus:border-primary mobile-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2 bg-background border-border focus:border-primary mobile-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-foreground">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="mt-2 bg-background border-border focus:border-primary resize-none mobile-input"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 active:scale-95 font-bold"
                    >
                      {isSubmitting ? 'Enviando...' : <><Send className="mr-2 w-4 h-4" /> Enviar mensaje</>}
                    </Button>
                  </form>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-8">Vías de contacto</h2>
                  <div className="space-y-4">
                    <a href="https://wa.me/524561175410" target="_blank" rel="noopener noreferrer" className="block group">
                      <Card className="p-6 flex items-center gap-6 border-border bg-card hover:border-primary/50 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <MessageCircle className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">WhatsApp</p>
                          <p className="text-muted-foreground">+52 456 117 5410</p>
                        </div>
                      </Card>
                    </a>

                    <a href="tel:+524561175410" className="block group">
                      <Card className="p-6 flex items-center gap-6 border-border bg-card hover:border-primary/50 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Phone className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">Teléfono</p>
                          <p className="text-muted-foreground">+52 456 117 5410</p>
                        </div>
                      </Card>
                    </a>

                    <a href="mailto:info@aztekillertech.net" className="block group">
                      <Card className="p-6 flex items-center gap-6 border-border bg-card hover:border-primary/50 transition-colors">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Mail className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">Email</p>
                          <p className="text-muted-foreground">info@aztekillertech.net</p>
                        </div>
                      </Card>
                    </a>
                  </div>
                </div>

                <Card className="p-8 border-border bg-muted/50">
                  <h3 className="text-xl font-bold mb-4">Horario</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="flex justify-between"><span>Lunes - Viernes:</span> <span className="font-medium text-foreground">9:00 AM - 8:00 PM</span></p>
                    <p className="flex justify-between"><span>Sábados:</span> <span className="font-medium text-foreground">10:00 AM - 6:00 PM</span></p>
                  </div>
                  <p className="text-sm mt-4 text-accent font-semibold">
                    * Emergencias 24/7 vía WhatsApp
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default ContactPage;