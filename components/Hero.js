'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

// ═══════════════════════════════════════════════════════════════
//  ANIMATION CONFIG — Adjust these values to customize timings
// ═══════════════════════════════════════════════════════════════
const PARALLAX_DELAY = 5000;           // ms before transition starts
const HERO_FADEOUT_DURATION = 0.8;     // hero text exit speed (seconds)

const BG_DURATION = 2.4;              // background slide-down speed
const BG_DELAY = 0;                   // background start delay
const SUBJECT_DURATION = 1.6;         // product slide-down speed
const SUBJECT_DELAY = 0.6;            // product start delay after bg
const FG_DURATION = 1.0;              // foreground slide-down speed
const FG_DELAY = 1.1;                 // foreground start delay after bg

const PRODUCT_SIZES = {
  sm: { w: 320, h: 450 },            // mobile
  md: { w: 420, h: 580 },            // small tablet
  lg: { w: 540, h: 720 },            // tablet
  xl: { w: 620, h: 820 },            // desktop
};

const ZOOM_PULSE = [1, 1.06, 1];      // still-frame scale pulse
const ZOOM_DURATION = 8;              // seconds per pulse cycle
const FLOAT_Y = [-8, 0, -8];          // product vertical float (px)
const FLOAT_DURATION = 6;             // seconds per float cycle

const FG_ROTATE = [-1.5, 1.5, -1.5];  // foreground rotation degrees
const FG_ROTATE_DURATION = 10;        // seconds per rotation cycle
const FG_SCALE_BREATHE = [1, 1.02, 1];
const FG_BREATHE_DURATION = 8;

const BG_DRIFT_X = [0, 5, 0];         // background horizontal drift
const BG_DRIFT_DURATION = 12;

const MOUSE_SENSITIVITY = { x: 18, y: 12 };

// Cubic bezier for smooth slide-down
const EASE_SLIDE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const [parallaxActive, setParallaxActive] = useState(false);
  const [revealDone, setRevealDone] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true until detected
  const mousePosRef = useRef({ x: 0, y: 0 });
  const fgRef = useRef(null);
  const rafRef = useRef(null);

  // Detect touch device
  useEffect(() => {
    const mobile = !window.matchMedia('(pointer: fine)').matches || window.innerWidth < 768;
    setIsMobile(mobile);
  }, []);

  // Preload parallax images before timer fires
  useEffect(() => {
    const imgs = ['/images/background.png', '/images/transparent-hero-product.png', '/images/corn_puff_scattered.png'];
    imgs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Trigger parallax transition after delay
  useEffect(() => {
    const timer = setTimeout(() => setParallaxActive(true), PARALLAX_DELAY);

    const handleScroll = () => {
      if (window.scrollY > 200) clearTimeout(timer);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mark reveal complete after slowest layer finishes
  useEffect(() => {
    if (parallaxActive) {
      const longestTransition = (BG_DURATION + BG_DELAY) * 1000 + 400;
      const timer = setTimeout(() => setRevealDone(true), longestTransition);
      return () => clearTimeout(timer);
    }
  }, [parallaxActive]);

  // Mouse tracking for foreground — uses rAF for performance
  useEffect(() => {
    if (isMobile || !revealDone) return;

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mousePosRef.current = {
        x: ((e.clientX - cx) / cx) * MOUSE_SENSITIVITY.x,
        y: ((e.clientY - cy) / cy) * MOUSE_SENSITIVITY.y,
      };
    };

    const animate = () => {
      if (fgRef.current) {
        fgRef.current.style.transform =
          `translate(${mousePosRef.current.x}px, ${mousePosRef.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, revealDone]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ═══════════════════════════════════════════════ */}
      {/*  HERO BACKGROUND (always visible)              */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-primary" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-warm-radial from-bronze/8 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-secondary/50 to-transparent" />
        {/* Ambient orbs — CSS keyframes for perf */}
        <div className="hero-orb-1 absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-bronze/10 blur-[100px]" />
        {!isMobile && (
          <div className="hero-orb-2 absolute bottom-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-cta/5 blur-[120px]" />
        )}
      </div>

      {/* Film grain — lighter on mobile */}
      <div className="absolute inset-0 film-grain pointer-events-none z-[1]" />

      {/* ═══════════════════════════════════════════════ */}
      {/*  HERO TEXT — pushes DOWN when parallax starts   */}
      {/* ═══════════════════════════════════════════════ */}
      <motion.div
        animate={parallaxActive
          ? { opacity: 0, y: 120, scale: 0.92, filter: 'blur(6px)' }
          : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: HERO_FADEOUT_DURATION, ease: 'easeInOut' }}
        className="relative z-[5] max-w-5xl mx-auto px-5 md:px-10 text-center pt-24 pb-16"
        style={{ willChange: 'transform, opacity' }}
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

      {/* LAYER 1: Background — SLOWEST */}
      <motion.div
        initial={{ y: '-105%' }}
        animate={parallaxActive ? { y: '0%' } : { y: '-105%' }}
        transition={{ duration: BG_DURATION, ease: EASE_SLIDE, delay: BG_DELAY }}
        className="absolute inset-0 z-[10]"
        style={{ willChange: 'transform' }}
      >
        {/* Post-transition: gentle horizontal drift */}
        <motion.div
          animate={revealDone ? { x: BG_DRIFT_X } : {}}
          transition={revealDone ? { duration: BG_DRIFT_DURATION, repeat: Infinity, ease: 'easeInOut' } : {}}
          className="absolute inset-[-5%] w-[110%] h-[110%]"
        >
          <Image
            src="/images/background.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Edge gradients — blend image into dark bg on ALL sides */}
        <div className="absolute inset-0 vignette-overlay" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-bg-primary/80 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-bg-primary/70 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-bg-primary/70 to-transparent" />
      </motion.div>

      {/* GLOW ORBS — CSS keyframes for performance */}
      {!isMobile && (
        <div className="absolute inset-0 z-[15] pointer-events-none">
          <div className="parallax-glow-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-bronze/20 blur-[120px]"
            style={{ opacity: revealDone ? undefined : 0, transition: 'opacity 0.8s ease' }}
          />
          <div className="parallax-glow-right absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-gold/15 blur-[100px]"
            style={{ opacity: revealDone ? undefined : 0, transition: 'opacity 0.8s ease' }}
          />
        </div>
      )}

      {/* LAYER 2: Main Subject — MEDIUM speed */}
      <motion.div
        initial={{ y: '-115%' }}
        animate={parallaxActive ? { y: '0%' } : { y: '-115%' }}
        transition={{ duration: SUBJECT_DURATION, ease: EASE_SLIDE, delay: SUBJECT_DELAY }}
        className="absolute inset-0 z-[20] flex items-center justify-center"
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-[320px] h-[450px] sm:w-[420px] sm:h-[580px] md:w-[540px] md:h-[720px] lg:w-[620px] lg:h-[820px]"
        >
          {/* Combined: zoom pulse + vertical float */}
          <motion.div
            animate={revealDone ? {
              scale: ZOOM_PULSE,
              y: FLOAT_Y,
            } : {}}
            transition={revealDone ? {
              scale: { duration: ZOOM_DURATION, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: FLOAT_DURATION, repeat: Infinity, ease: 'easeInOut' },
            } : {}}
            className="w-full h-full relative"
          >
            {/* Warm shadow under product */}
            <div
              className="parallax-product-shadow absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[80%] h-[30%] rounded-full bg-bronze/25 blur-[60px]"
              style={{ opacity: revealDone ? undefined : 0, transition: 'opacity 0.8s ease' }}
            />
            <Image
              src="/images/transparent-hero-product.png"
              alt="Miltz™ Corn Puff"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 540px, 620px"
              priority
            />
          </motion.div>
        </div>
      </motion.div>

      {/* LAYER 3: Foreground — FASTEST */}
      <motion.div
        initial={{ y: '-135%' }}
        animate={parallaxActive ? { y: '0%' } : { y: '-135%' }}
        transition={{ duration: FG_DURATION, ease: EASE_SLIDE, delay: FG_DELAY }}
        className="absolute inset-0 z-[25] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        {/* Inner wrapper for post-transition effects */}
        <motion.div
          ref={fgRef}
          animate={revealDone ? {
            rotate: isMobile ? 0 : FG_ROTATE,
            scale: FG_SCALE_BREATHE,
          } : {}}
          transition={revealDone ? {
            rotate: { duration: FG_ROTATE_DURATION, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: FG_BREATHE_DURATION, repeat: Infinity, ease: 'easeInOut' },
          } : {}}
          className="w-full h-full relative"
          style={{ willChange: 'transform', transition: 'transform 0.15s ease-out' }}
        >
          <Image
            src="/images/corn_puff_scattered.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
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

      {/* Edge fades for parallax area */}
      {parallaxActive && (
        <>
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-bg-primary to-transparent z-[28] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-bg-primary/70 to-transparent z-[28] pointer-events-none" />
        </>
      )}
    </section>
  );
}
