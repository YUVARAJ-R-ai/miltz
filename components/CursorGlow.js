'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
    const glowRef = useRef(null);
    const posRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        // Only enable on devices with a pointer (no touch-only)
        const mediaQuery = window.matchMedia('(pointer: fine)');
        if (!mediaQuery.matches) return;

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
            glow.style.transform = `translate(${posRef.current.x - 200}px, ${posRef.current.y + scrollY - 200}px)`;

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            className="pointer-events-none fixed top-0 left-0 z-[1] w-[400px] h-[400px] rounded-full opacity-[0.04] transition-opacity duration-1000"
            style={{
                background: 'radial-gradient(circle, rgba(176,138,87,0.6) 0%, rgba(176,138,87,0.15) 40%, transparent 70%)',
                willChange: 'transform',
            }}
            aria-hidden="true"
        />
    );
}
