'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductSpotlight from './ProductSpotlight';

export default function ProductCarousel({ products, onOrder }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative overflow-hidden bg-bg-primary">
      {/* Section Header */}
      <div className="py-12 md:py-20 px-5 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-headline uppercase mb-4"
        >
          Our <span className="bg-clip-text text-transparent bg-bronze-gradient">Products</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-body-text/70 text-sm md:text-lg max-w-xl mx-auto"
        >
          Bold flavors crafted for cinemas, events, and every gathering worth remembering.
        </motion.p>
        <div className="separator-bronze mt-6 md:mt-8 max-w-[80px] md:max-w-[100px] mx-auto" />
      </div>

      {/* Carousel Container */}
      <div className="relative h-auto min-h-[600px] md:min-h-[750px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <ProductSpotlight
              product={products[currentIndex]}
              index={currentIndex}
              className="w-full"
              onOrder={onOrder}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows — positioned for both mobile and desktop */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-[35%] md:top-1/2 -translate-y-1/2 z-20 bg-bg-surface/70 backdrop-blur-sm border border-bronze/10 p-2 md:p-3 rounded-full hover:shadow-bronze-glow transition-all text-body-text hover:text-gold"
        aria-label="Previous product"
      >
        <ChevronLeft size={18} className="md:w-5 md:h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-[35%] md:top-1/2 -translate-y-1/2 z-20 bg-bg-surface/70 backdrop-blur-sm border border-bronze/10 p-2 md:p-3 rounded-full hover:shadow-bronze-glow transition-all text-body-text hover:text-gold"
        aria-label="Next product"
      >
        <ChevronRight size={18} className="md:w-5 md:h-5" />
      </button>

      {/* Dots Navigation */}
      <div className="relative z-20 flex gap-2.5 justify-center py-6 md:py-8">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${index === currentIndex
              ? 'bg-bronze w-6 md:w-7'
              : 'bg-muted/25 w-1.5 md:w-2 hover:bg-muted/40'
              }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
