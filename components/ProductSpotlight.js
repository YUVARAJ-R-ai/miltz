'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Star, Zap, Heart, ShieldCheck } from 'lucide-react';

export default function ProductSpotlight({ product, index, className = "" }) {
  const isEven = index % 2 === 0;

  return (
    <section className={`py-24 px-6 md:px-12 ${product.bgColor || 'bg-white'} overflow-hidden min-w-full flex-shrink-0 ${className}`}>
      <div className="container mx-auto">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
          
          {/* Left Side: Immersive Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl group"
          >
            <Image 
              src={product.image} 
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay Gradient for text readability if needed, or just aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          {/* Right Side: Editorial Content */}
          <motion.div 
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            {/* Category Label */}
            <span className={`font-heading font-bold text-sm tracking-widest uppercase mb-4 ${product.accentText}`}>
              {product.category}
            </span>

            {/* Headline */}
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-miltz-dark mb-6 leading-tight">
              {product.title}
            </h2>

            {/* Icons Row */}
            <div className="flex gap-8 mb-10 border-b border-miltz-dark/10 pb-8">
              <div className="flex flex-col items-center gap-2">
                <div className={`p-3 rounded-full ${product.iconBg || 'bg-gray-100'}`}>
                  <Zap size={20} className={product.accentText} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-miltz-dark/60">Bold Flavor</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className={`p-3 rounded-full ${product.iconBg || 'bg-gray-100'}`}>
                  <Star size={20} className={product.accentText} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-miltz-dark/60">Premium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className={`p-3 rounded-full ${product.iconBg || 'bg-gray-100'}`}>
                  <Heart size={20} className={product.accentText} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-miltz-dark/60">Loved</span>
              </div>
            </div>

            {/* Bullet Lists */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="font-heading font-bold text-lg text-miltz-dark mb-4 flex items-center gap-2">
                  <Star size={18} className="text-miltz-yellow fill-miltz-yellow" /> Ideal For
                </h4>
                <ul className="space-y-3">
                  {product.idealFor.map((item, i) => (
                    <li key={i} className="text-miltz-dark/80 text-sm flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-miltz-dark/40"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg text-miltz-dark mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-miltz-green" /> Free From
                </h4>
                <ul className="space-y-3">
                  {product.freeFrom.map((item, i) => (
                    <li key={i} className="text-miltz-dark/80 text-sm flex items-start gap-2">
                      <Check size={14} className="mt-0.5 text-miltz-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button className={`px-8 py-4 rounded-full font-heading font-bold text-sm uppercase tracking-wider border-2 border-miltz-dark text-miltz-dark hover:bg-miltz-dark hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl`}>
                Shop {product.shortTitle || 'Now'}
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
