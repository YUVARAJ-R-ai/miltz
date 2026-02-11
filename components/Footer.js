import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-bronze/10 py-10 md:py-14 px-5 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <Link href="/" className="logo-glow inline-block mb-2">
            <span className="font-heading font-black text-2xl tracking-tighter text-cta uppercase">
              Miltz<sup className="text-[10px] align-super text-bronze">™</sup>
              <span className="text-gold">.</span>
            </span>
          </Link>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Miltz™ Snacks. All rights reserved.
          </p>
        </div>

        {/* Tagline */}
        <p className="text-muted/60 text-xs italic hidden md:block">
          Crunch That Brings People Together.
        </p>

        {/* Links */}
        <div className="flex gap-6 font-heading font-bold text-xs uppercase tracking-wider">
          <Link href="#" className="text-muted hover:text-gold transition-colors duration-300">
            Instagram
          </Link>
          <Link href="#" className="text-muted hover:text-gold transition-colors duration-300">
            Facebook
          </Link>
          <Link href="#" className="text-muted hover:text-gold transition-colors duration-300">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
