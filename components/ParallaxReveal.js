'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxReveal() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [revealDone, setRevealDone] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect touch device
    useEffect(() => {
        setIsMobile(!window.matchMedia('(pointer: fine)').matches || window.innerWidth < 768);
    }, []);

    // Mouse tracking for foreground parallax (desktop only)
    useEffect(() => {
        if (isMobile) return;
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            setMousePos({
                x: ((e.clientX - centerX) / centerX) * 15, // ±15px
                y: ((e.clientY - centerY) / centerY) * 10,  // ±10px
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isMobile]);

    // Mark reveal as done after entrance animations complete
    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setRevealDone(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section
            ref={sectionRef}
            id="parallax-reveal"
            className="relative w-full h-screen overflow-hidden bg-bg-primary"
        >
            {/* ====== LAYER 1: Background ====== */}
            <motion.div
                initial={{ scale: 1.15, y: 80 }}
                animate={isInView ? { scale: 1.0, y: 0 } : {}}
                transition={{ duration: 2.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/background.png"
                    alt="Warm bronze atmosphere"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                {/* Vignette overlay for depth */}
                <div className="absolute inset-0 vignette-overlay" />
            </motion.div>

            {/* ====== GLOW ORBS (behind subject) ====== */}
            <div className="absolute inset-0 z-[5] pointer-events-none">
                {/* Central warm glow */}
                <motion.div
                    animate={revealDone ? {
                        opacity: [0.15, 0.3, 0.15],
                        scale: [1, 1.08, 1],
                    } : { opacity: 0 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-bronze/20 blur-[120px]"
                />
                {/* Upper-right warm accent */}
                <motion.div
                    animate={revealDone ? {
                        opacity: [0.08, 0.18, 0.08],
                        scale: [1, 1.12, 1],
                    } : { opacity: 0 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-gold/15 blur-[100px]"
                />
                {/* Bottom-left cta accent */}
                <motion.div
                    animate={revealDone ? {
                        opacity: [0.05, 0.12, 0.05],
                    } : { opacity: 0 }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] rounded-full bg-cta/8 blur-[110px]"
                />
            </div>

            {/* ====== LAYER 2: Main Subject (Product) ====== */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.7, y: 80, opacity: 0 }}
                    animate={isInView ? { scale: 1, y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                    className="relative w-[280px] h-[400px] sm:w-[350px] sm:h-[500px] md:w-[450px] md:h-[620px] lg:w-[500px] lg:h-[700px]"
                >
                    {/* Zoom pulse wrapper — activates after reveal */}
                    <motion.div
                        animate={revealDone ? {
                            scale: [1, 1.05, 1],
                        } : {}}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="w-full h-full relative"
                    >
                        {/* Warm shadow glow under product */}
                        <motion.div
                            animate={revealDone ? {
                                opacity: [0.3, 0.5, 0.3],
                                scale: [1, 1.06, 1],
                            } : { opacity: 0 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[80%] h-[30%] rounded-full bg-bronze/25 blur-[60px]"
                        />
                        <Image
                            src="/images/transparent-hero-product.png"
                            alt="Miltz™ Corn Puff — New Launch"
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="(max-width: 768px) 280px, (max-width: 1024px) 450px, 500px"
                            priority
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* ====== LAYER 3: Foreground (scattered corn puffs) ====== */}
            <motion.div
                initial={{ y: 120, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                className="absolute inset-0 z-20 pointer-events-none"
                style={!isMobile ? {
                    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                    transition: 'transform 0.3s ease-out',
                } : undefined}
            >
                <Image
                    src="/images/corn_puff_scattered.png"
                    alt="Scattered corn puffs"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </motion.div>

            {/* ====== TEXT OVERLAY ====== */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-12 md:pb-16 lg:pb-20 pointer-events-none">
                {/* "New Launch" badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mb-3"
                >
                    <span className="inline-block font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.25em] text-bg-primary bg-gold px-4 py-1.5 rounded-full shadow-lg">
                        ✦ New Launch
                    </span>
                </motion.div>

                {/* Product title */}
                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-headline text-center mb-2 drop-shadow-lg"
                >
                    Miltz<sup className="text-sm md:text-lg text-bronze align-super">™</sup> Corn Puff
                </motion.h2>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="font-heading text-sm md:text-lg text-gold/90 tracking-wider mb-6 text-center"
                >
                    The crunch that never stops.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.8 }}
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
            </div>

            {/* ====== EDGE GRADIENTS (top & bottom fade) ====== */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-bg-primary to-transparent z-[25] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-primary/80 to-transparent z-[25] pointer-events-none" />
        </section>
    );
}
