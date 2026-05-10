import React from 'react';
import { motion } from 'framer-motion';

function ProcessStep({ number, icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-6 items-start"
    >
      <div className="flex-shrink-0">
        <div className="relative">
          <span className="text-7xl font-bold text-primary/10" style={{ letterSpacing: '-0.02em' }}>
            {number}
          </span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 pt-4">
        <h3 className="text-2xl font-semibold mb-3 text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default ProcessStep;