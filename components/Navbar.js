'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Show navbar when scrolling up or at top, hide when scrolling down
      if (currentY < 80) {
        setVisible(true);
      } else if (currentY < lastScrollY) {
        setVisible(true);
      } else if (currentY > lastScrollY && currentY > 200) {
        setVisible(false);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { href: '#products', label: 'Products' },
    { href: '#about', label: 'About' },
    { href: '#story', label: 'Our Story' },
  ];

  return (
    <>
      {/* Navbar — slides in/out on scroll direction */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 md:py-5 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="logo-glow">
            <span className="font-heading font-black text-2xl md:text-3xl tracking-tighter text-cta uppercase">
              Miltz<sup className="text-[10px] md:text-xs align-super text-bronze">™</sup>
              <span className="text-gold">.</span>
            </span>
          </Link>

          {/* Desktop Nav — minimal, spaced out */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-heading font-bold text-xs text-muted hover:text-headline transition-colors duration-300 uppercase tracking-[0.15em] group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-bronze group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="#products"
              className="bg-cta text-headline px-5 py-2 rounded-full font-heading font-bold text-xs uppercase tracking-wider hover:bg-cta-hover transition-all duration-300 shadow-cta-glow hover:shadow-lg"
            >
              Order Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-headline p-2 hover:text-gold transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-bg-secondary border-l border-bronze/10 z-[70] flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-bronze/10">
                <span className="font-heading font-black text-xl text-cta uppercase">
                  Miltz<sup className="text-[9px] align-super text-bronze">™</sup>
                  <span className="text-gold">.</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted hover:text-headline transition-colors p-1"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-4 rounded-lg font-heading font-bold text-sm text-body-text hover:text-gold hover:bg-bg-surface/60 transition-all duration-200 uppercase tracking-wider"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-4"
                >
                  <Link
                    href="#products"
                    onClick={() => setIsOpen(false)}
                    className="block text-center bg-cta text-headline px-6 py-3 rounded-full font-heading font-bold text-sm uppercase tracking-wider hover:bg-cta-hover transition-all duration-300"
                  >
                    Order Now
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
