'use client';

import { motion } from 'framer-motion';
import { Film, Popcorn, Beer, Wrench, Award, Users } from 'lucide-react';

const stats = [
    { value: '7+', label: 'Years of Experience', icon: Award },
    { value: '100+', label: 'Partner Venues', icon: Film },
    { value: '1M+', label: 'Snacks Served', icon: Popcorn },
    { value: '24/7', label: 'Reliable Supply', icon: Users },
];

const services = [
    {
        icon: Popcorn,
        title: 'Wholesale Popcorn & Snacks',
        description: 'Premium popcorn, seasoning blends, and corn puffs crafted for high-volume cinema and event environments.',
    },
    {
        icon: Wrench,
        title: 'Professional Machinery',
        description: 'Professional-grade popcorn machines and equipment designed for theaters, concert venues, and large-scale operations.',
    },
    {
        icon: Beer,
        title: 'Beverage Distribution',
        description: 'Complete beverage solutions including Pepsi, Coca-Cola, and milkshake products for seamless concession operations.',
    },
    {
        icon: Film,
        title: 'Event Partnerships',
        description: 'End-to-end snack solutions for concerts, festivals, and large-scale event organizers with reliable delivery.',
    },
];

export default function BrandShowcase() {
    return (
        <section id="about" className="relative py-20 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-bg-secondary" />
            <div className="absolute inset-0 warm-spotlight" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">

                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block font-heading font-bold text-xs uppercase tracking-[0.25em] text-bronze mb-4"
                    >
                        Who We Are
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-headline uppercase mb-6"
                    >
                        Powering The <span className="bg-clip-text text-transparent bg-bronze-gradient">Moments</span><br className="hidden md:block" />
                        Where Crowds Gather
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-body-text/80 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
                    >
                        Miltz<sup className="text-[10px] text-bronze">™</sup> is a trusted name in cinema and event snacking, delivering complete popcorn and beverage solutions for theaters, concerts, and large-scale events.
                    </motion.p>
                    <div className="separator-bronze mt-8 max-w-[100px] mx-auto" />
                </div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24"
                >
                    {stats.map(({ value, label, icon: Icon }) => (
                        <div
                            key={label}
                            className="glass rounded-2xl p-5 md:p-6 text-center group hover:shadow-bronze-glow transition-all duration-400"
                        >
                            <Icon size={22} className="mx-auto mb-3 text-bronze group-hover:text-gold transition-colors" />
                            <div className="font-heading font-black text-2xl md:text-3xl text-gold mb-1">
                                {value}
                            </div>
                            <p className="text-muted text-xs md:text-sm font-medium uppercase tracking-wider">
                                {label}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {services.map(({ icon: Icon, title, description }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="glass rounded-2xl p-6 md:p-8 group hover:shadow-bronze-glow transition-all duration-400 hover:border-bronze/25"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-bg-surface border border-bronze/10 group-hover:border-bronze/30 transition-colors flex-shrink-0">
                                    <Icon size={22} className="text-bronze group-hover:text-gold transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-base md:text-lg text-headline mb-2 uppercase tracking-wide">
                                        {title}
                                    </h3>
                                    <p className="text-body-text/70 text-sm leading-relaxed">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom brand statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 md:mt-20 text-center"
                >
                    <div className="separator-bronze mb-8 max-w-[100px] mx-auto" />
                    <p className="text-muted text-sm md:text-base max-w-2xl mx-auto italic leading-relaxed">
                        &ldquo;Built on reliability, hygiene, and consistency, Miltz<sup className="text-[9px] text-bronze">™</sup> powers the moments where audiences gather — turning simple snacks into part of the experience.&rdquo;
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
