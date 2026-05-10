import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

function TestimonialCard({ name, role, quote, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
    >
      <Quote className="w-10 h-10 text-primary/30 mb-4" />
      <p className="text-foreground leading-relaxed mb-6 italic">
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold text-lg">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;