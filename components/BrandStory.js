'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BrandStory() {
    return (
        <section id="story" className="relative py-20 md:py-28 px-5 md:px-10 bg-bg-primary overflow-hidden">
            {/* Subtle warm glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-bronze/5 rounded-full blur-[150px]" />

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">

                {/* Story Image */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-bronze-glow group border border-bronze/10 product-overlay"
                >
                    <Image
                        src="/images/corn-puff.png"
                        alt="Miltz Brand"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Warm overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-bg-primary/60 via-transparent to-bronze/10 z-[2]" />
                </motion.div>

                {/* Story Text */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    <span className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-bronze mb-4 block">
                        Our Story
                    </span>
                    <h2 className="font-heading font-black text-3xl md:text-4xl text-headline uppercase mb-6 leading-tight">
                        The Miltz<sup className="text-sm align-super text-bronze">™</sup>{' '}
                        <span className="bg-clip-text text-transparent bg-bronze-gradient">Journey</span>
                    </h2>

                    <p className="text-base md:text-lg mb-5 leading-relaxed text-body-text/80 font-body">
                        With over seven years of industry experience, Miltz<sup className="text-[9px] text-bronze">™</sup> has grown from a passion for better cinema snacks into a trusted partner for theaters, concert venues, and large-scale event organizers across the region.
                    </p>
                    <p className="text-base md:text-lg mb-5 leading-relaxed text-body-text/80 font-body">
                        We specialize in wholesale popcorn, signature seasoning blends, crispy corn puffs, and professional-grade machinery — all designed for high-volume environments where quality and consistency matter.
                    </p>
                    <p className="text-base md:text-lg mb-8 leading-relaxed text-body-text/80 font-body">
                        From supplying major concert venues and theater canteens to supporting event organizers with reliable equipment, Miltz<sup className="text-[9px] text-bronze">™</sup> combines clean production standards with operational expertise — turning simple snacks into part of the experience.
                    </p>

                    <div className="separator-bronze mb-6 max-w-[120px]" />

                    <div className="font-heading font-black text-lg text-cta logo-glow inline-block cursor-default">
                        — The Miltz<sup className="text-xs text-bronze">™</sup> Team
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
