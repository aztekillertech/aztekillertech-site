import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Shield, AlertTriangle, UserX, DollarSign, 
  CheckCircle2, Smartphone, Video, Camera, Palette, 
  GraduationCap, Heart, Lock, Search, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UGCGuardianPage() {
  return (
    <main className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Helmet>
        <title>{`UGC Guardian | Protección para Creadores`}</title>
        <meta name="description" content="Protección profesional para creadores. Detén el robo de identidad digital antes de que destruya todo lo que construiste." />
      </Helmet>

      {/* SECTION 1 - HERO */}
      <section className="relative px-4 pt-32 pb-20 md:pt-[120px] md:pb-[80px] bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-muted/30">
        <div className="absolute top-6 left-4 md:left-8 z-10">
          <a 
            href="https://aztekillertech.net"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-[#8B5CF6] text-foreground hover:bg-[#8B5CF6]/5 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#8B5CF6]" />
            Regresar a AztekIllerTech
          </a>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-8 md:mt-0 relative z-10">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-[#EDE9FE] dark:bg-[#8B5CF6]/10 text-sm font-semibold tracking-wide text-[#8B5CF6]">
            🛡️ PROTECCIÓN PROFESIONAL PARA CREADORES
          </div>
          
          <h1 className="text-[32px] md:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-8">
            <span className="block text-foreground">Tu contenido bajo ataque.</span>
            <span className="block text-[#8B5CF6]">Tu reputación en juego.</span>
            <span className="block text-foreground">Tu carrera en riesgo.</span>
          </h1>

          <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-[800px] mx-auto mb-6 leading-relaxed font-medium">
            Detén el robo de identidad digital ANTES de que destruya todo lo que construiste.
          </p>

          <p className="text-base text-muted-foreground max-w-[700px] mx-auto mb-10 leading-relaxed">
            Como creador de contenido, tu imagen es tu mayor activo. Los hackers y estafadores lo saben. Protegemos tus cuentas, monitoreamos filtraciones y eliminamos contenido no autorizado para que tú solo te preocupes por crear.
          </p>

          <a 
            href="https://www.ugcguardian.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-lg font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8B5CF6]/30 active:scale-95"
          >
            Protege tu contenido ahora &rarr;
          </a>
        </div>
      </section>

      {/* SECTION 2 - RISKS */}
      <section className="py-20 bg-[#F9FAFB] dark:bg-muted/20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-bold text-center text-foreground mb-12">
            Los riesgos que enfrentas cada día como creador
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Lock className="w-8 h-8 text-rose-500 mb-4" />,
                title: 'Robo de contenido íntimo',
                desc: 'Tus fotos y videos exclusivos filtrados, vendidos en foros y distribuidos sin tu consentimiento, arruinando tu exclusividad.'
              },
              {
                icon: <UserX className="w-8 h-8 text-amber-500 mb-4" />,
                title: 'Suplantación de identidad',
                desc: 'Perfiles falsos creados con tu imagen estafando a tus seguidores más leales y destruyendo la confianza de tu comunidad.'
              },
              {
                icon: <AlertTriangle className="w-8 h-8 text-orange-500 mb-4" />,
                title: 'Extorsión y chantaje',
                desc: 'Amenazas directas de publicar material sensible si no pagas un rescate monetario, un ciclo que raramente termina con un solo pago.'
              },
              {
                icon: <DollarSign className="w-8 h-8 text-emerald-500 mb-4" />,
                title: 'Pérdida de ingresos',
                desc: 'Disminución drástica de suscriptores y daño irreparable a tu marca personal que ahuyenta a futuros patrocinadores y acuerdos comerciales.'
              }
            ].map((risk, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-card border border-[#E5E7EB] dark:border-border p-8 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                {risk.icon}
                <h3 className="text-xl font-bold mb-3">{risk.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{risk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - PRICING */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-amber-100 dark:bg-amber-500/10 text-sm font-bold tracking-widest text-amber-600 dark:text-amber-400">
              PLANES
            </div>
            <h2 className="text-[32px] md:text-[40px] font-bold text-foreground mb-4">
              Protección para cada etapa
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Elige el nivel de protección que tu carrera necesita. Sin contratos forzosos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* PLAN 1 BÁSICO */}
            <div className="bg-white dark:bg-card border border-border p-8 rounded-2xl flex flex-col relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                PARA EMPEZAR
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-4">Básico</h3>
              <div className="text-3xl font-extrabold mb-4">$59 <span className="text-lg font-normal text-muted-foreground">MXN/mes</span></div>
              <p className="text-sm text-muted-foreground mb-6 h-12">Protección esencial para creadores que inician su comunidad.</p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {['Auditoría de seguridad básica', 'Monitoreo mensual de identidad', 'Guía de blindaje de cuentas', 'Alerta de suplantación', 'Soporte por email', 'Cancelación en cualquier momento'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://wa.me/5214561175410?text=Hola%2C%20quiero%20contratar%20el%20*Plan%20B%C3%A1sico*%20de%20%2459%20MXN%2Fmes%20de%20UGC%20Guardian.%20%C2%BFCu%C3%A1les%20son%20los%20pasos%20para%20activarlo%3F"
                target="_blank" rel="noopener noreferrer"
                className="w-full text-center py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-auto"
              >
                Contratar por WhatsApp
              </a>
            </div>

            {/* PLAN 2 PRO (HIGHLIGHTED) */}
            <div className="bg-white dark:bg-card border-2 border-emerald-500 shadow-xl lg:scale-105 p-8 rounded-2xl flex flex-col relative z-10 transition-all duration-200">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-md">
                MÁS RECOMENDADO
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-4">Pro</h3>
              <div className="text-3xl font-extrabold mb-4">$199 <span className="text-lg font-normal text-muted-foreground">MXN/mes</span></div>
              <p className="text-sm text-muted-foreground mb-6 h-12">Monitoreo activo y defensa contra filtraciones de contenido.</p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {['Todo lo del plan Básico', 'Monitoreo 24/7 en la Web', 'Detección facial de contenido', 'Reportes de DMCA automáticos', 'Atención por WhatsApp'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://wa.me/5214561175410?text=Hola%2C%20quiero%20contratar%20el%20*Plan%20Pro*%20de%20%24199%20MXN%2Fmes%20de%20UGC%20Guardian.%20%C2%BFCu%C3%A1les%20son%20los%20pasos%20para%20activarlo%3F"
                target="_blank" rel="noopener noreferrer"
                className="w-full text-center py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors mt-auto shadow-md shadow-emerald-500/20"
              >
                Contratar por WhatsApp
              </a>
            </div>

            {/* PLAN 3 VIP PREMIUM */}
            <div className="bg-white dark:bg-card border border-border p-8 rounded-2xl flex flex-col relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                SOPORTE PRIORITARIO
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-4">VIP Premium</h3>
              <div className="text-3xl font-extrabold mb-4">$599 <span className="text-lg font-normal text-muted-foreground">MXN/mes</span></div>
              <p className="text-sm text-muted-foreground mb-6 h-12">Cobertura total para creadores top con altos ingresos.</p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {['Todo lo del plan Pro', 'Búsqueda profunda en Dark Web', 'Takedowns legales prioritarios', 'Asesoría legal preventiva', 'Línea SOS directa 24/7', 'Recuperación de cuentas'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://wa.me/5214561175410?text=Hola%2C%20quiero%20contratar%20el%20*Plan%20VIP%20Premium*%20de%20%24599%20MXN%2Fmes%20de%20UGC%20Guardian.%20%C2%BFCu%C3%A1les%20son%20los%20pasos%20para%20activarlo%3F"
                target="_blank" rel="noopener noreferrer"
                className="w-full text-center py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-auto"
              >
                Contratar por WhatsApp
              </a>
            </div>

            {/* PLAN 4 AGENCIAS */}
            <div className="bg-white dark:bg-card border border-border p-8 rounded-2xl flex flex-col relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="absolute top-0 right-0 bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                HASTA 10 USUARIOS
              </div>
              <h3 className="text-2xl font-bold mb-2 mt-4">Agencias</h3>
              <div className="text-3xl font-extrabold mb-4">Desde $2,999 <span className="text-sm font-normal text-muted-foreground block">MXN/mes</span></div>
              <p className="text-sm text-muted-foreground mb-6 h-12">Solución integral para agencias de representación y talento.</p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {['Protección para hasta 10 talentos', 'Panel de control centralizado', 'Reportes ejecutivos', 'Ejecutivo de cuenta asignado', 'API de monitoreo', 'Precios por volumen'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://wa.me/5214561175410?text=Hola%2C%20quiero%20contratar%20el%20*Plan%20Agencias*%20desde%20%242%2C999%20MXN%2Fmes%20de%20UGC%20Guardian.%20%C2%BFCu%C3%A1les%20son%20los%20pasos%20para%20activarlo%3F"
                target="_blank" rel="noopener noreferrer"
                className="w-full text-center py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors mt-auto"
              >
                Contratar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - HOW IT WORKS */}
      <section className="py-20 bg-[#F9FAFB] dark:bg-muted/30 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-bold text-center text-foreground mb-16">
            Protección activa en 3 pasos
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-6 lg:gap-12 relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-[2px] bg-[#E5E7EB] dark:bg-border z-0"></div>

            {[
              {
                step: '1',
                title: 'Auditoría inicial',
                desc: 'Analizamos toda tu huella digital para encontrar vulnerabilidades y detectar contenido que ya haya sido filtrado o suplantado sin tu conocimiento.'
              },
              {
                step: '2',
                title: 'Blindaje preventivo',
                desc: 'Implementamos sistemas de seguridad avanzados en tus cuentas, configuramos verificación robusta y establecemos alertas tempranas.'
              },
              {
                step: '3',
                title: 'Monitoreo continuo',
                desc: 'Nuestros sistemas vigilan la web abierta y profunda 24/7, listos para emitir reclamos legales (DMCA) y eliminar contenido no autorizado.'
              }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-[60px] h-[60px] rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-[#8B5CF6]/30 border-4 border-white dark:border-background">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - EMERGENCY */}
      <section className="py-20 px-4 bg-black border-y-[8px] border-y-rose-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-6">
            <span className="text-rose-500 mr-2">¿Ya te hackearon?</span> 
            ¿Filtraron tu contenido?
          </h2>
          <p className="text-[18px] md:text-[22px] text-gray-300 mb-10 max-w-2xl mx-auto">
            Respuesta inmediata por WhatsApp. No esperes a que se viralice y el daño sea irreversible.
          </p>
          
          <a 
            href="https://wa.me/5214561175410?text=EMERGENCIA%3A%20Me%20hackearon%20o%20filtraron%20contenido.%20Necesito%20ayuda%20urgente."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white text-xl md:text-2xl font-bold px-8 py-5 rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20 w-full md:w-auto mb-6"
          >
            📱 Contactar ahora: +52 456 117 5410
          </a>
          
          <p className="text-gray-400 text-sm md:text-base font-medium">
            Protocolo SOS básico incluido en todos los planes. Respuesta en menos de 2 horas.
          </p>
        </div>
      </section>

      {/* SECTION 6 - USE CASES */}
      <section className="py-20 px-4 bg-white dark:bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-bold text-center text-foreground mb-16">
            Protegemos a creadores como tú
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Smartphone className="w-8 h-8 text-[#8B5CF6]" />, title: 'Influencers', desc: 'Protección contra suplantación de identidad en redes sociales para estafar a tus seguidores.' },
              { icon: <Video className="w-8 h-8 text-[#8B5CF6]" />, title: 'Streamers', desc: 'Blindaje contra doxxing, hackeo de cuentas en vivo y ataques coordinados de bots.' },
              { icon: <Heart className="w-8 h-8 text-[#8B5CF6]" />, title: 'Creadores de contenido adulto', desc: 'Rastreo implacable y eliminación (takedown) de material PPV filtrado en foros gratuitos.' },
              { icon: <GraduationCap className="w-8 h-8 text-[#8B5CF6]" />, title: 'Coaches', desc: 'Protección de cursos premium, PDFs y metodologías contra la piratería digital.' },
              { icon: <Camera className="w-8 h-8 text-[#8B5CF6]" />, title: 'Fotógrafos', desc: 'Detección de uso comercial no autorizado de tu portafolio fotográfico con IA.' },
              { icon: <Palette className="w-8 h-8 text-[#8B5CF6]" />, title: 'Artistas', desc: 'Salvaguarda de obras de arte digital, ilustraciones y diseños exclusivos en la red.' }
            ].map((role, idx) => (
              <div key={idx} className="bg-white dark:bg-card border border-[#E5E7EB] dark:border-border p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="mb-4 p-3 bg-[#8B5CF6]/10 rounded-full">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{role.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - TECHNOLOGY */}
      <section className="py-20 bg-[#F9FAFB] dark:bg-muted/20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground mb-12">
            Herramientas profesionales de ciberseguridad
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-3xl mx-auto">
            {[
              'Rastreo facial con Inteligencia Artificial',
              'Monitoreo activo en la Deep y Dark Web',
              'Sistemas automatizados de DMCA Takedown',
              'Auditorías forenses de vulnerabilidad en RRSS',
              'Fingerprinting digital de contenido exclusivo',
              'Recuperación acelerada de cuentas secuestradas'
            ].map((tech, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white dark:bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="font-medium text-foreground">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - FINAL CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-6 leading-tight">
            Tu tranquilidad tiene precio.<br/>Perder tu carrera también.
          </h2>
          <p className="text-[18px] md:text-[20px] text-purple-100 mb-10">
            Invierte $59 MXN al mes o arriesga años de trabajo. Tú decides.
          </p>
          
          <a 
            href="https://www.ugcguardian.pro"
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-white text-[#8B5CF6] hover:bg-gray-50 text-xl font-bold px-12 py-5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-xl w-full md:w-auto mb-6"
          >
            Comenzar protección &rarr;
          </a>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-purple-200 font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Sin contratos largos.</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Cancela cuando quieras.</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Garantía de 30 días.</span>
          </div>
        </div>
      </section>

      {/* SECTION 9 - FOOTER CTA */}
      <footer className="py-12 px-4 bg-white dark:bg-background border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-lg font-medium text-foreground">
            ¿Tienes dudas? Agenda una consultoría gratuita de 15 minutos
          </p>
          <a 
            href="https://wa.me/5214561175410?text=Hola%2C%20quiero%20agendar%20una%20consultor%C3%ADa%20gratuita%20de%2015%20minutos%20sobre%20UGC%20Guardian."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white font-bold transition-colors w-full md:w-auto whitespace-nowrap"
          >
            Agendar consulta
          </a>
        </div>
      </footer>
    </main>
  );
}