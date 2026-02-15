'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

// ═══════════════════════════════════════════════════════════════
//  ANIMATION CONFIG — Adjust these values to customize timings
// ═══════════════════════════════════════════════════════════════
const LOAD_WAIT = 3000;               // ms AFTER page load before parallax starts

const BG_DURATION = 1.8;              // background reveal speed (seconds)
const BG_DELAY = 0;                   // background start delay
const SUBJECT_DURATION = 1.4;         // product reveal speed
const SUBJECT_DELAY = 0.2;            // product delay after bg
const FG_DURATION = 1.0;              // foreground reveal speed
const FG_DELAY = 0.35;               // foreground delay after bg

const EXPAND_DURATION = 2.0;          // how long the section expands (pushes hero down)

const ZOOM_PULSE = [1, 1.04, 1];
const ZOOM_DURATION = 8;
const FLOAT_Y = [-6, 0, -6];
const FLOAT_DURATION = 6;

const MOUSE_SENSITIVITY = { x: 15, y: 10 };
const EASE_SMOOTH = [0.22, 1, 0.36, 1];

export default function Hero() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [parallaxActive, setParallaxActive] = useState(false);
  const [revealDone, setRevealDone] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const fgRef = useRef(null);
  const rafRef = useRef(null);

  // ─── Detect device ───
  useEffect(() => {
    const mobile = !window.matchMedia('(pointer: fine)').matches || window.innerWidth < 768;
    setIsMobile(mobile);

    // Mobile: show popup after a short delay, no animation
    if (mobile) {
      const timer = setTimeout(() => setShowPopup(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // ─── Wait for full page load, THEN wait LOAD_WAIT ms ───
  useEffect(() => {
    const onLoad = () => {
      setPageLoaded(true);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  useEffect(() => {
    if (!pageLoaded) return;
    const timer = setTimeout(() => setParallaxActive(true), LOAD_WAIT);
    return () => clearTimeout(timer);
  }, [pageLoaded]);

  // ─── Preload parallax images ───
  useEffect(() => {
    if (isMobile) return;
    const imgs = ['/images/background.png', '/images/transparent-hero-product.png', '/images/corn_puff_scattered.png'];
    imgs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [isMobile]);

  // ─── Mark reveal complete ───
  useEffect(() => {
    if (parallaxActive && !isMobile) {
      const longestMs = Math.max(
        BG_DURATION + BG_DELAY,
        SUBJECT_DURATION + SUBJECT_DELAY,
        FG_DURATION + FG_DELAY,
        EXPAND_DURATION
      ) * 1000 + 600;
      const timer = setTimeout(() => setRevealDone(true), longestMs);
      return () => clearTimeout(timer);
    }
    if (parallaxActive && isMobile) {
      const timer = setTimeout(() => setRevealDone(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [parallaxActive, isMobile]);

  // ─── Mouse tracking (desktop only, after reveal) ───
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
          `translate3d(${mousePosRef.current.x}px, ${mousePosRef.current.y}px, 0)`;
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
    <>
      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 1: NEW LAUNCH — desktop only, expands 0→100vh */}
      {/*  On mobile this section is completely skipped           */}
      {/* ═══════════════════════════════════════════════════════ */}
      {!isMobile && (
        <motion.section
          initial={{ height: 0 }}
          animate={{ height: parallaxActive ? '100vh' : 0 }}
          transition={{
            duration: EXPAND_DURATION,
            ease: EASE_SMOOTH,
          }}
          className="relative overflow-hidden w-full"
          style={{ willChange: parallaxActive ? 'height' : 'auto' }}
        >
          {/* Inner content — full viewport, positioned inside the expanding container */}
          <div className="absolute inset-0 w-full h-screen">

            {/* LAYER 1: Background */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={parallaxActive
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.1 }
              }
              transition={{
                duration: BG_DURATION,
                ease: EASE_SMOOTH,
                delay: BG_DELAY,
              }}
              className="absolute inset-0 z-[10]"
            >
              <Image
                src="/images/background.png"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              {/* Edge gradients */}
              <div className="absolute inset-0 vignette-overlay" />
              <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-bg-primary/70 to-transparent" />
              <div className="absolute top-0 left-0 h-full w-28 bg-gradient-to-r from-bg-primary/60 to-transparent" />
              <div className="absolute top-0 right-0 h-full w-28 bg-gradient-to-l from-bg-primary/60 to-transparent" />
            </motion.div>

            {/* GLOW ORBS */}
            <div className="absolute inset-0 z-[15] pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: revealDone ? 1 : 0 }}
                transition={{ duration: 1.2 }}
                className="parallax-glow-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-bronze/15 blur-[120px]"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: revealDone ? 1 : 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="parallax-glow-right absolute top-[20%] right-[15%] w-[250px] h-[250px] rounded-full bg-gold/10 blur-[100px]"
              />
            </div>

            {/* LAYER 2: Main Product */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={parallaxActive
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 60 }
              }
              transition={{
                duration: SUBJECT_DURATION,
                ease: EASE_SMOOTH,
                delay: SUBJECT_DELAY,
              }}
              className="absolute inset-0 z-[20] flex items-center justify-center"
            >
              <div className="relative w-[420px] h-[580px] md:w-[520px] md:h-[700px] lg:w-[600px] lg:h-[800px]">
                <motion.div
                  animate={revealDone ? {
                    scale: ZOOM_PULSE,
                    y: FLOAT_Y,
                  } : { scale: 1, y: 0 }}
                  transition={revealDone ? {
                    scale: { duration: ZOOM_DURATION, repeat: Infinity, ease: 'easeInOut' },
                    y: { duration: FLOAT_DURATION, repeat: Infinity, ease: 'easeInOut' },
                  } : {}}
                  className="w-full h-full relative"
                >
                  {/* Product shadow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: revealDone ? 0.35 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[75%] h-[25%] rounded-full bg-bronze/20 blur-[50px]"
                  />
                  <Image
                    src="/images/transparent-hero-product.png"
                    alt="Miltz™ Corn Puff"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1024px) 520px, 600px"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* LAYER 3: Foreground */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={parallaxActive
                ? { opacity: 1 }
                : { opacity: 0 }
              }
              transition={{
                duration: FG_DURATION,
                ease: 'easeOut',
                delay: FG_DELAY,
              }}
              className="absolute inset-0 z-[25] pointer-events-none"
            >
              <div
                ref={fgRef}
                className="w-full h-full relative"
                style={{ transition: 'transform 0.2s ease-out' }}
              >
                <Image
                  src="/images/corn_puff_scattered.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </motion.div>

            {/* POST-TRANSITION TEXT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: revealDone ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 z-[30] flex flex-col items-center justify-end pb-14 md:pb-18 lg:pb-22 pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={revealDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-3"
              >
                <span className="inline-block font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.25em] text-bg-primary bg-gold px-4 py-1.5 rounded-full shadow-lg">
                  ✦ New Launch
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={revealDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-headline text-center mb-2 drop-shadow-lg"
              >
                Miltz<sup className="text-sm md:text-lg text-bronze align-super">™</sup> Corn Puff
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={revealDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="font-heading text-sm md:text-lg text-gold/90 tracking-wider mb-5 text-center"
              >
                The crunch that never stops.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={revealDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
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

            {/* Bottom gradient — blends into bg-primary */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-primary to-transparent z-[35] pointer-events-none" />
          </div>
        </motion.section>
      )}    {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 2: HERO TEXT — pushed down by section above   */}
      {/*  Remains visible below the new launch page             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Hero background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-bg-primary" />
          {!isMobile && (
            <>
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-bronze/5 blur-[200px]" />
              <div className="hero-orb-1 absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-bronze/10 blur-[100px]" />
              <div className="hero-orb-2 absolute bottom-[20%] left-[10%] w-[250px] h-[250px] rounded-full bg-cta/5 blur-[120px]" />
            </>
          )}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-secondary/50 to-transparent" />
        </div>

        {/* Film grain — desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 film-grain pointer-events-none z-[1]" />
        )}

        {/* Hero text content */}
        <div className="relative z-[5] max-w-5xl mx-auto px-5 md:px-10 text-center pt-24 pb-16">
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
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3 }}
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
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  MOBILE POPUP OVERLAY — fixed on top of everything     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobile && showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25, mass: 0.8 }}
              className="relative w-[85vw] max-w-[340px] rounded-2xl overflow-hidden border border-bronze/20"
              style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(176,138,87,0.1)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                aria-label="Close popup"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="2" y1="2" x2="12" y2="12" />
                  <line x1="12" y1="2" x2="2" y2="12" />
                </svg>
              </button>

              {/* Card Image — top portion */}
              <div className="relative w-full aspect-[4/3] bg-bg-secondary">
                <Image
                  src="/images/Overlay.png"
                  alt="Miltz™ Corn Puff"
                  fill
                  className="object-contain p-4"
                  sizes="340px"
                />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-bg-secondary to-transparent" />
              </div>

              {/* Card Content — bottom portion */}
              <div className="bg-bg-secondary px-5 pb-5 pt-1">
                <p className="font-heading font-black text-[11px] uppercase tracking-[0.15em] text-bronze/80 mb-1.5">
                  Miltz<sup className="text-[7px]">™</sup>
                </p>
                <span className="inline-block font-heading font-bold text-[9px] uppercase tracking-[0.2em] text-cta mb-2">
                  ✦ New Launch
                </span>
                <h2 className="font-heading font-black text-xl text-headline leading-tight mb-1.5">
                  Corn Puff
                </h2>
                <p className="text-xs text-body-text/60 mb-5 leading-relaxed">
                  Light, crispy, and irresistibly crunchy — the snack that never stops.
                </p>
                <a
                  href="#products"
                  onClick={() => setShowPopup(false)}
                  className="block w-full text-center bg-headline text-bg-primary font-heading font-bold text-sm py-3 rounded-xl hover:bg-gold transition-colors uppercase tracking-wider"
                >
                  View Products
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
