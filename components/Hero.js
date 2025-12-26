'use client';

import { motion } from 'framer-motion';
import Scene3D from './Scene3D';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-miltz-cream overflow-hidden pt-20">
      {/* Background Element - Cinematic Gradient */}
      <div className="absolute inset-0 bg-cinematic-gradient from-miltz-cream via-transparent to-miltz-red/10 opacity-50 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center h-full">
        
        {/* Text Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left relative">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-20 -left-20 text-[10rem] font-heading font-black text-miltz-red select-none hidden lg:block"
          >
            POP
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-none mb-6 text-miltz-dark drop-shadow-xl"
          >
            CRUNCH. <br />
            <span className="text-miltz-red">MUNCH.</span> <br />
            SMILE.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-10 max-w-md mx-auto lg:mx-0 font-medium text-miltz-dark/80"
          >
            Elevate the cinema experience with Miltz premium seasonings and addictive cheese balls.
          </motion.p>
          
          <motion.a 
            href="#flavours" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="inline-block bg-miltz-red border-2 border-miltz-red text-white font-heading font-bold text-lg px-10 py-4 rounded-full hover:bg-transparent hover:text-miltz-red transition-all duration-300 shadow-lg hover:shadow-miltz-red/30 uppercase tracking-wide"
          >
            Explore Flavours
          </motion.a>
        </div>

        {/* 3D Scene */}
        <div className="order-1 lg:order-2 relative h-[400px] lg:h-[600px] w-full flex justify-center items-center">
            <Scene3D />
        </div>
      </div>
    </section>
  );
}
