'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function OrderForm({ isOpen, onClose, product = null }) {
    const [form, setForm] = useState({
        vendorName: '',
        businessName: '',
        phone: '',
        email: '',
        product: product?.title || '',
        sku: '',
        quantity: '',
        address: '',
        notes: '',
    });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        try {
            const res = await fetch('/api/submit-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    timestamp: new Date().toISOString(),
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setForm({
                        vendorName: '', businessName: '', phone: '', email: '',
                        product: '', sku: '', quantity: '', address: '', notes: '',
                    });
                }, 2500);
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Network error. Please check your connection.');
        }
    };

    const inputClass = "w-full bg-bg-surface border border-bronze/20 rounded-lg px-4 py-3 text-sm text-headline placeholder:text-muted/50 focus:outline-none focus:border-bronze/60 focus:ring-1 focus:ring-bronze/30 transition-all";
    const labelClass = "block text-[11px] font-heading font-bold text-muted uppercase tracking-wider mb-1.5";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[85] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-bg-secondary border border-bronze/15 rounded-2xl shadow-2xl pointer-events-auto">

                            {/* Header */}
                            <div className="sticky top-0 bg-bg-secondary z-10 flex items-center justify-between p-5 border-b border-bronze/10">
                                <div>
                                    <h3 className="font-heading font-black text-lg text-headline uppercase tracking-wide">
                                        Place Order
                                    </h3>
                                    <p className="text-muted text-xs mt-0.5">Fill in your details below</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-bg-surface text-muted hover:text-headline transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Success State */}
                            {status === 'success' ? (
                                <div className="p-10 text-center">
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: 'spring', damping: 15 }}
                                    >
                                        <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                                        <h4 className="font-heading font-bold text-xl text-headline mb-2">Order Submitted!</h4>
                                        <p className="text-muted text-sm">We'll reach out to you shortly.</p>
                                    </motion.div>
                                </div>
                            ) : (
                                /* Form */
                                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                                    {/* Vendor Info Row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className={labelClass}>Vendor Name *</label>
                                            <input
                                                type="text"
                                                name="vendorName"
                                                value={form.vendorName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your name"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Business Name *</label>
                                            <input
                                                type="text"
                                                name="businessName"
                                                value={form.businessName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Company / Shop"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className={labelClass}>Phone *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+91 98765 43210"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="optional"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    {/* Product Row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className={labelClass}>Product</label>
                                            <input
                                                type="text"
                                                name="product"
                                                value={form.product}
                                                onChange={handleChange}
                                                placeholder="e.g. Puff Corn"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>SKU / Size</label>
                                            <input
                                                type="text"
                                                name="sku"
                                                value={form.sku}
                                                onChange={handleChange}
                                                placeholder="e.g. Bulk 1kg"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <label className={labelClass}>Quantity</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={form.quantity}
                                            onChange={handleChange}
                                            placeholder="e.g. 50 units"
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className={labelClass}>Delivery Address *</label>
                                        <textarea
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            required
                                            rows={2}
                                            placeholder="Full delivery address"
                                            className={`${inputClass} resize-none`}
                                        />
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className={labelClass}>Notes</label>
                                        <textarea
                                            name="notes"
                                            value={form.notes}
                                            onChange={handleChange}
                                            rows={2}
                                            placeholder="Any special instructions..."
                                            className={`${inputClass} resize-none`}
                                        />
                                    </div>

                                    {/* Error */}
                                    {status === 'error' && (
                                        <p className="text-cta text-xs font-medium">{errorMsg}</p>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full py-3.5 rounded-full font-heading font-bold text-sm uppercase tracking-wider bg-cta text-headline hover:bg-cta-hover transition-all duration-300 shadow-cta-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={14} />
                                                Submit Order
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
