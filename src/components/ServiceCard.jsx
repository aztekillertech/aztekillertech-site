import React from 'react';
import { motion } from 'framer-motion';

function ServiceCard({ icon: Icon, title, description, index, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 w-full text-left cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1 w-full">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mobile-text-readable">
            {description}
          </p>
          <p className="text-sm text-primary font-medium mt-4 group-hover:translate-x-1 transition-transform duration-300">
            Ver detalles →
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default ServiceCard;