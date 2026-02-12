'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const [parallaxActive, setParallaxActive] = useState(false);
  const [revealDone, setRevealDone] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsMobile(!window.matchMedia('(pointer: fine)').matches || window.innerWidth < 768);
  }, []);

  // Trigger parallax transition after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setParallaxActive(true);
    }, 5000);

    // Cancel if user scrolls away from hero
    const handleScroll = () => {
      if (window.scrollY > 200) {
        clearTimeout(timer);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mark reveal complete after transition
  useEffect(() => {
    if (parallaxActive) {
      const timer = setTimeout(() => setRevealDone(true), 2200);
      return () => clearTimeout(timer);
    }
  }, [parallaxActive]);

  // Mouse tracking for foreground parallax
  useEffect(() => {
    if (isMobile || !revealDone) return;
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({
        x: ((e.clientX - cx) / cx) * 18,
        y: ((e.clientY - cy) / cy) * 12,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, revealDone]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ═══════════════════════════════════════════════ */}
      {/*  HERO TEXT CONTENT (visible initially)         */}
      {/* ═══════════════════════════════════════════════ */}

      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-primary" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-warm-radial from-bronze/8 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-secondary/50 to-transparent" />
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

      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none z-[1]" />

      {/* Hero Text — fades out when parallax slides in */}
      <motion.div
        animate={parallaxActive ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
        className="relative z-[5] max-w-5xl mx-auto px-5 md:px-10 text-center pt-24 pb-16"
      >
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 text-body-text/80 font-medium leading-relaxed"
        >
          Powering cinema and events with premium popcorn, snacks, and beverage
          solutions — trusted by theaters and large-scale events.
        </motion.p>

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
      </motion.div>

      {/* Scroll indicator — visible before parallax fires */}
      {!parallaxActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-muted/60">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} className="text-bronze/50" />
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/*  PARALLAX LAYERS (slide down from above)       */}
      {/* ═══════════════════════════════════════════════ */}

      {/* LAYER 1: Background — slides down SLOWEST (parallax depth) */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={parallaxActive ? { y: '0%' } : { y: '-100%' }}
        transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-[10]"
      >
        <Image
          src="/images/background.png"
          alt=""
          fill
          className="object-cover scale-110"
          sizes="100vw"
          priority
        />
        {/* Vignette for depth */}
        <div className="absolute inset-0 vignette-overlay" />
        {/* Bottom edge fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-primary/70 to-transparent" />
      </motion.div>

      {/* GLOW ORBS — appear after transition */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        <motion.div
          animate={revealDone ? { opacity: [0.15, 0.3, 0.15], scale: [1, 1.08, 1] } : { opacity: 0 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-bronze/20 blur-[120px]"
        />
        <motion.div
          animate={revealDone ? { opacity: [0.08, 0.18, 0.08], scale: [1, 1.12, 1] } : { opacity: 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-gold/15 blur-[100px]"
        />
        <motion.div
          animate={revealDone ? { opacity: [0.05, 0.12, 0.05] } : { opacity: 0 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] rounded-full bg-cta/8 blur-[110px]"
        />
      </div>

      {/* LAYER 2: Main Subject — slides down at MEDIUM speed */}
      <motion.div
        initial={{ y: '-110%' }}
        animate={parallaxActive ? { y: '0%' } : { y: '-110%' }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="absolute inset-0 z-[20] flex items-center justify-center"
      >
        <div className="relative w-[280px] h-[400px] sm:w-[350px] sm:h-[500px] md:w-[450px] md:h-[620px] lg:w-[500px] lg:h-[700px]">
          {/* Zoom pulse wrapper */}
          <motion.div
            animate={revealDone ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full relative"
          >
            {/* Warm shadow under product */}
            <motion.div
              animate={revealDone ? { opacity: [0.3, 0.5, 0.3], scale: [1, 1.06, 1] } : { opacity: 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[80%] h-[30%] rounded-full bg-bronze/25 blur-[60px]"
            />
            <Image
              src="/images/transparent-hero-product.png"
              alt="Miltz™ Corn Puff"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 450px, 500px"
              priority
            />
          </motion.div>
        </div>
      </motion.div>

      {/* LAYER 3: Foreground — slides down FASTEST (parallax depth) */}
      <motion.div
        initial={{ y: '-130%' }}
        animate={parallaxActive ? { y: '0%' } : { y: '-130%' }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute inset-0 z-[25] pointer-events-none"
        style={revealDone && !isMobile ? {
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.25s ease-out',
        } : undefined}
      >
        <Image
          src="/images/corn_puff_scattered.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* TEXT OVERLAY — fades in after parallax lands */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealDone ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0 z-[30] flex flex-col items-center justify-end pb-12 md:pb-16 lg:pb-20 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={revealDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-3"
        >
          <span className="inline-block font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.25em] text-bg-primary bg-gold px-4 py-1.5 rounded-full shadow-lg">
            ✦ New Launch
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={revealDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-headline text-center mb-2 drop-shadow-lg"
        >
          Miltz<sup className="text-sm md:text-lg text-bronze align-super">™</sup> Corn Puff
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={revealDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="font-heading text-sm md:text-lg text-gold/90 tracking-wider mb-6 text-center"
        >
          The crunch that never stops.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={revealDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="pointer-events-auto"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block bg-cta text-headline font-heading font-bold text-xs md:text-sm px-8 py-3 md:px-10 md:py-3.5 rounded-full hover:bg-cta-hover transition-all duration-300 shadow-cta-glow uppercase tracking-wider"
          >
            Shop Now
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Top & bottom edge fades for parallax layers */}
      {parallaxActive && (
        <>
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-bg-primary to-transparent z-[28] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-bg-primary/60 to-transparent z-[28] pointer-events-none" />
        </>
      )}
    </section>
  );
}
