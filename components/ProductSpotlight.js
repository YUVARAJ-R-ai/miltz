'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Star, Zap, Heart, ShieldCheck, Package, Minus, Plus } from 'lucide-react';

function QuantitySlider({ pricing }) {
  const [selectedSku, setSelectedSku] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const sku = pricing[selectedSku];
  const total = sku.price * quantity;
  const maxQty = sku.size === '1kg' ? 50 : 100;

  return (
    <div className="mb-5 p-4 rounded-xl border border-bronze/20 bg-bg-surface/60">
      {/* SKU pills */}
      <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-wider mb-2.5">
        Select Size
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {pricing.map((p, i) => (
          <button
            key={p.label}
            onClick={() => { setSelectedSku(i); setQuantity(1); }}
            className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 ${i === selectedSku
                ? 'bg-bronze text-bg-primary shadow-md'
                : 'border border-bronze/25 text-muted hover:border-bronze/50 hover:text-body-text'
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Unit price */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-gold font-heading font-black text-xl">₹{sku.price}</span>
        <span className="text-muted text-xs">per {sku.size === '1kg' ? 'kg' : 'pack'}</span>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-1.5 rounded-full border border-bronze/25 text-muted hover:text-gold hover:border-bronze transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>

        <div className="flex-1 relative">
          <input
            type="range"
            min={1}
            max={maxQty}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="qty-slider w-full"
            aria-label="Quantity"
          />
        </div>

        <button
          onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
          className="p-1.5 rounded-full border border-bronze/25 text-muted hover:text-gold hover:border-bronze transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>

        <span className="text-headline font-heading font-bold text-sm min-w-[28px] text-center">
          {quantity}
        </span>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-3 border-t border-bronze/10">
        <span className="text-muted text-xs font-heading font-bold uppercase tracking-wider">
          {quantity} × ₹{sku.price}
        </span>
        <span className="text-gold font-heading font-black text-lg">
          = ₹{total.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}

export default function ProductSpotlight({ product, index, className = "", onOrder }) {
  const isEven = index % 2 === 0;
  const hasPricing = product.pricing && product.pricing.length > 0;

  const handleShop = () => {
    if (onOrder) {
      onOrder(product);
    }
  };

  return (
    <section className={`py-10 md:py-24 px-0 md:px-10 bg-bg-primary overflow-hidden min-w-full flex-shrink-0 ${className}`}>
      <div className="max-w-7xl mx-auto">

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="block lg:hidden">
          {/* Full-width Product Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/5] max-h-[500px] overflow-hidden product-overlay"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent z-[2]" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/20 to-transparent z-[2]" />
            <div className="absolute bottom-6 left-5 right-5 z-[3]">
              <p className="font-heading font-bold text-sm text-amber/90 uppercase tracking-wider drop-shadow-md">
                {product.tagline}
              </p>
            </div>
          </motion.div>

          {/* Content Card */}
          <div className="px-5 -mt-6 relative z-10">
            <span className="font-heading font-bold text-[11px] tracking-[0.2em] uppercase text-bronze">
              {product.category}
            </span>
            <h2 className="font-heading font-black text-3xl text-headline mt-1 mb-2 leading-tight">
              {product.title}
            </h2>
            <p className="text-gold font-medium text-base mb-5">
              {product.flavor}
            </p>
            <div className="separator-bronze mb-5 w-16" />

            {/* Icons */}
            <div className="flex gap-5 mb-6">
              {[
                { icon: Zap, label: 'Bold Flavor' },
                { icon: Star, label: 'Premium' },
                { icon: Heart, label: 'Loved' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <div className="p-2.5 rounded-full bg-bg-surface border border-bronze/15">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Two-column info */}
            <div className="grid grid-cols-2 gap-5 mb-6">
              <div>
                <h4 className="font-heading font-bold text-xs text-headline mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <Star size={12} className="text-gold" /> Ideal For
                </h4>
                <ul className="space-y-1.5">
                  {product.idealFor.map((item, i) => (
                    <li key={i} className="text-body-text/75 text-[13px] flex items-start gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-bronze flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-headline mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck size={12} className="text-bronze" /> Free From
                </h4>
                <ul className="space-y-1.5">
                  {product.freeFrom.map((item, i) => (
                    <li key={i} className="text-body-text/75 text-[13px] flex items-start gap-1.5">
                      <Check size={11} className="mt-0.5 text-bronze flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity Slider OR Placeholder */}
            {hasPricing ? (
              <QuantitySlider pricing={product.pricing} />
            ) : (
              <div className="mb-5 p-3.5 rounded-xl border border-dashed border-bronze/20 bg-bg-surface/40">
                <div className="flex items-center gap-2.5">
                  <Package size={16} className="text-muted" />
                  <div>
                    <p className="text-[11px] font-heading font-bold text-muted uppercase tracking-wider">Order Quantity</p>
                    <p className="text-[10px] text-muted/60">Coming soon</p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleShop}
              className="w-full py-3.5 rounded-full font-heading font-bold text-sm uppercase tracking-wider border border-bronze/40 text-bronze hover:bg-bronze hover:text-bg-primary transition-all duration-300 active:scale-[0.98]"
            >
              Shop {product.shortTitle || 'Now'}
            </button>

            <div className="separator-bronze mt-8" />
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className={`hidden lg:flex ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-20 items-center`}>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="w-1/2 relative h-[600px] rounded-2xl overflow-hidden shadow-bronze-glow group product-overlay border border-bronze/10"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-bg-primary/20 to-bronze/5 z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-[3]">
              <p className="font-heading font-bold text-base text-amber/90 uppercase tracking-wider">
                {product.tagline}
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-1/2 flex flex-col justify-center"
          >
            <span className="font-heading font-bold text-xs tracking-[0.2em] uppercase mb-3 text-bronze">
              {product.category}
            </span>
            <h2 className="font-heading font-black text-4xl xl:text-5xl text-headline mb-4 leading-tight">
              {product.title}
            </h2>
            <p className="text-gold font-medium text-lg mb-6">{product.flavor}</p>
            <div className="separator-bronze mb-8 w-full max-w-[200px]" />

            {/* Icons */}
            <div className="flex gap-8 mb-8">
              {[
                { icon: Zap, label: 'Bold Flavor' },
                { icon: Star, label: 'Premium' },
                { icon: Heart, label: 'Loved' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-bg-surface border border-bronze/15">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-muted">{label}</span>
                </div>
              ))}
            </div>

            {/* Bullet Lists */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-heading font-bold text-sm text-headline mb-3 flex items-center gap-2 uppercase tracking-wider">
                  <Star size={14} className="text-gold" /> Ideal For
                </h4>
                <ul className="space-y-2">
                  {product.idealFor.map((item, i) => (
                    <li key={i} className="text-body-text/80 text-sm flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-bronze flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-headline mb-3 flex items-center gap-2 uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-bronze" /> Free From
                </h4>
                <ul className="space-y-2">
                  {product.freeFrom.map((item, i) => (
                    <li key={i} className="text-body-text/80 text-sm flex items-start gap-2">
                      <Check size={12} className="mt-0.5 text-bronze flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity Slider OR Placeholder */}
            {hasPricing ? (
              <QuantitySlider pricing={product.pricing} />
            ) : (
              <div className="mb-6 p-4 rounded-xl border border-dashed border-bronze/25 bg-bg-surface/50">
                <div className="flex items-center gap-3">
                  <Package size={18} className="text-muted" />
                  <div>
                    <p className="text-xs font-heading font-bold text-muted uppercase tracking-wider">Order Quantity</p>
                    <p className="text-xs text-muted/70 mt-0.5">Coming soon</p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div>
              <motion.button
                onClick={handleShop}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-full font-heading font-bold text-sm uppercase tracking-wider border border-bronze/40 text-bronze hover:bg-bronze hover:text-bg-primary transition-all duration-300 shadow-bronze-glow/0 hover:shadow-bronze-glow"
              >
                Shop {product.shortTitle || 'Now'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
