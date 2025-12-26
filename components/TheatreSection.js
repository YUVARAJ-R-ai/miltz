'use client';

import { motion } from 'framer-motion';

export default function TheatreSection() {
  return (
    <section className="py-32 bg-miltz-dark theatre-spotlight relative overflow-hidden">
        {/* Floating elements for atmosphere */}
        <motion.div 
            animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 left-10 w-20 h-20 bg-miltz-yellow rounded-full blur-[80px] opacity-20"
        ></motion.div>
        <motion.div 
            animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-10 right-10 w-32 h-32 bg-miltz-red rounded-full blur-[100px] opacity-20"
        ></motion.div>

        {/* Dust Particles (CSS based for performance) */}
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute bg-white rounded-full opacity-10 animate-float"
                    style={{
                        width: Math.random() * 4 + 1 + 'px',
                        height: Math.random() * 4 + 1 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animationDuration: Math.random() * 10 + 10 + 's',
                        animationDelay: Math.random() * 5 + 's',
                    }}
                ></div>
            ))}
        </div>

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-heading font-black text-5xl md:text-7xl text-miltz-cream uppercase mb-8 tracking-tight drop-shadow-lg leading-none"
            >
                Coming Soon To A <br/>
                <span className="text-outline-red">Theatre Near You</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-miltz-cream/80 font-medium max-w-3xl mx-auto mb-12"
            >
                Upgrade your concession stand experience. Miltz is the premium snack partner your audience is craving.
            </motion.p>
        </div>
    </section>
  );
}
