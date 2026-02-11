'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden parallax-container">

      {/* Background Layer (parallax-ready) */}
      <div className="parallax-layer-bg">
        {/* Warm radial glow */}
        <div className="absolute inset-0 bg-bg-primary" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-warm-radial from-bronze/8 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-secondary/50 to-transparent" />

        {/* Subtle ambient orbs */}
        <motion.div
          animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-bronze/10 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.02, 0.06, 0.02], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-cta/5 blur-[120px]"
        />
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 film-grain pointer-events-none z-[1]" />

      {/* Foreground Layer (parallax-ready) */}
      <div className="parallax-layer-fg">
        {/* Decorative floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -15, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            className="absolute w-1 h-1 rounded-full bg-bronze"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Content Layer (subject) */}
      <div className="parallax-layer-subject max-w-5xl mx-auto px-5 md:px-10 text-center pt-24 pb-16">

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-block font-heading font-bold text-xs md:text-sm uppercase tracking-[0.3em] text-bronze border border-bronze/30 px-4 py-1.5 rounded-full bg-bronze/5">
            Trusted by Cinemas for 7+ Years
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 text-headline"
        >
          Crunch That<br />
          <span className="text-glow-bronze bg-clip-text text-transparent bg-bronze-gradient">
            Brings People
          </span><br />
          Together<span className="text-cta">.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 text-body-text/80 font-medium leading-relaxed"
        >
          Powering cinema and events with premium popcorn, snacks, and beverage
          solutions — trusted by theaters and large-scale events.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-cta text-headline font-heading font-bold text-sm md:text-base px-8 md:px-10 py-3.5 md:py-4 rounded-full hover:bg-cta-hover transition-all duration-300 shadow-cta-glow uppercase tracking-wider"
          >
            Explore Products
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block border border-bronze/40 text-bronze font-heading font-bold text-sm md:text-base px-8 md:px-10 py-3.5 md:py-4 rounded-full hover:bg-bronze/10 hover:border-bronze transition-all duration-300 uppercase tracking-wider"
          >
            Our Story
          </motion.a>
        </motion.div>

        {/* Bottom separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="separator-bronze mt-16 md:mt-24 max-w-md mx-auto"
        />
      </div>
    </section>
  );
}
