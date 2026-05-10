import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import RepairPage from './pages/RepairPage.jsx';
import CybersecurityPage from './pages/CybersecurityPage.jsx';
import SoftwarePage from './pages/SoftwarePage.jsx';
import SeguridadPage from './pages/SeguridadPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ProcessPage from './pages/ProcessPage.jsx';
import UGCGuardianPage from '@/pages/UGCGuardianPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicio/:serviceId" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/ugc-guardian" element={<UGCGuardianPage />} />
        <Route path="/reparacion" element={<RepairPage />} />
        <Route path="/ciberseguridad" element={<CybersecurityPage />} />
        <Route path="/software" element={<SoftwarePage />} />
        <Route path="/seguridad" element={<SeguridadPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/proceso" element={<ProcessPage />} />
        <Route path="*" element={
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <p className="text-xl text-muted-foreground mb-8">La página que buscas no existe.</p>
              <a 
                href="/" 
                className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground rounded-lg font-bold hover:bg-accent/90 transition-all duration-200 active:scale-95"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;