'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BrandStory() {
  return (
    <section id="story" className="py-24 px-6 md:px-12 bg-miltz-cream">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
             {/* Story Image Placeholder */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl transform md:-rotate-3 hover:rotate-0 transition-transform duration-500"
            >
                <Image 
                  src="/images/popcorn-poster.jpeg" 
                  alt="Miltz Brand Lifestyle" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
            </motion.div>

            {/* Story Text */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:pl-12"
            >
                <h2 className="font-heading font-black text-4xl text-miltz-dark uppercase mb-6">
                    The Miltz <span className="text-miltz-red">Story</span>
                </h2>
                <p className="text-lg mb-6 leading-relaxed text-miltz-dark/80 font-body">
                    We got tired of sad, flavorless cinema popcorn. Movies are an escape, an adventure—your snacks should be too.
                </p>
                <p className="text-lg mb-8 leading-relaxed text-miltz-dark/80 font-body">
                    Miltz was born out of a desire for bold, unapologetic flavor. We craft premium seasonings and intensely cheesy snacks designed specifically for the big screen experience. It's not just a snack; it's part of the show.
                </p>
               <div className="font-heading font-black text-xl text-miltz-red">
                   — The Miltz Team
               </div>
            </motion.div>
        </div>
    </section>
  );
}
