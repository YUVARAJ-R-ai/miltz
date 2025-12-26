'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border-b-8 border-transparent ${product.accentBorder} flex flex-col h-full`}
    >
      {/* Product Image Placeholder */}
      <div 
        className={`h-64 w-full relative overflow-hidden flex items-center justify-center ${product.accentBg} bg-opacity-10`}
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Flavor splash effect on hover */}
        <div className={`absolute inset-0 ${product.accentBg} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
        
        {/* Shake Animation Wrapper */}
        <motion.div 
            whileHover={{ 
                rotate: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5 }
            }}
            className="z-10 relative w-48 h-48"
        >
            <Image 
              src={product.image} 
              alt={product.title}
              fill
              className="object-contain drop-shadow-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </motion.div>
      </div>

      {/* Product Info Card */}
      <div 
        className="p-8 flex-grow flex flex-col justify-between bg-white relative z-20"
        style={{ transform: "translateZ(30px)" }}
      >
        <div>
            <h3 className="font-heading font-bold text-xl text-miltz-dark mb-2 uppercase leading-tight">
              {product.title}
            </h3>
            <p className={`font-medium text-lg ${product.accentText}`}>
              {product.flavor}
            </p>
        </div>
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-6 w-full py-3 rounded-xl font-heading font-bold text-sm uppercase border-2 border-miltz-dark text-miltz-dark hover:bg-miltz-dark hover:text-white transition-colors duration-300`}
        >
            View Details
        </motion.button>
      </div>
    </motion.div>
  );
}
