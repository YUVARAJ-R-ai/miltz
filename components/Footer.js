import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-bronze/10 py-10 md:py-14 px-5 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">

        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <Link href="/" className="logo-glow inline-block mb-3">
            <span className="font-heading font-black text-2xl tracking-tighter text-cta uppercase">
              Miltz<sup className="text-[10px] align-super text-bronze">™</sup>
              <span className="text-gold">.</span>
            </span>
          </Link>
          <p className="text-muted/60 text-xs italic mb-2">
            Crunch That Brings People Together.
          </p>
          <p className="text-xs text-muted/40">
            © {new Date().getFullYear()} Miltz™ Snacks. All rights reserved.
          </p>
        </div>

        {/* Address */}
        <div className="text-center md:text-left">
          <div className="flex items-start gap-2 justify-center md:justify-start">
            <MapPin size={14} className="text-bronze mt-0.5 shrink-0" />
            <div>
              <h4 className="font-heading font-bold text-[11px] uppercase tracking-wider text-muted mb-1">Address</h4>
              <p className="text-xs text-body-text/70 leading-relaxed">
                Sri Vishal Foods,<br />
                NO:466/4, D.NO:4/144,<br />
                Perumal Kovil Street, Kovur,<br />
                Chennai - 600128, Tamil Nadu
              </p>
            </div>
          </div>
        </div>

        {/* Phone & Email */}
        <div className="text-center md:text-left space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Phone size={14} className="text-bronze shrink-0" />
            <div>
              <h4 className="font-heading font-bold text-[11px] uppercase tracking-wider text-muted mb-0.5">Phone</h4>
              <a href="tel:+919840316249" className="text-xs text-body-text/70 hover:text-gold transition-colors">
                +91 98403 16249
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Mail size={14} className="text-bronze shrink-0" />
            <div>
              <h4 className="font-heading font-bold text-[11px] uppercase tracking-wider text-muted mb-0.5">Email</h4>
              <a href="mailto:miltzcornpuffcare@gmail.com" className="text-xs text-body-text/70 hover:text-gold transition-colors break-all">
                miltzcornpuffcare@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
