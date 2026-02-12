'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
    const glowRef = useRef(null);
    const posRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);
    const [isTouch, setIsTouch] = useState(true); // default true to avoid flash

    useEffect(() => {
        // Only enable on devices with a pointer (no touch-only)
        const isFine = window.matchMedia('(pointer: fine)').matches;
        setIsTouch(!isFine);
        if (!isFine) return;

        const glow = glowRef.current;
        if (!glow) return;

        const handleMouseMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
        };

        // Smooth lerp animation
        const animate = () => {
            const lerp = 0.08;
            posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
            posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

            const scrollY = window.scrollY;
            glow.style.transform = `translate3d(${posRef.current.x - 200}px, ${posRef.current.y + scrollY - 200}px, 0)`;

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Don't render on touch devices at all — saves GPU
    if (isTouch) return null;

    return (
        <div
            ref={glowRef}
            className="pointer-events-none fixed top-0 left-0 z-[1] w-[400px] h-[400px] rounded-full"
            style={{
                opacity: 0.12,
                background: 'radial-gradient(circle, rgba(176,138,87,0.8) 0%, rgba(176,138,87,0.35) 35%, rgba(176,138,87,0.08) 60%, transparent 75%)',
                willChange: 'transform',
            }}
            aria-hidden="true"
        />
    );
}
