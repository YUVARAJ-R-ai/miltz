import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-miltz-dark text-miltz-cream py-12 px-6 md:px-12 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="font-heading font-black text-2xl tracking-tighter text-miltz-red uppercase mb-2">
            Miltz<span className="text-miltz-yellow">.</span>
          </div>
          <p className="text-sm opacity-80">© {new Date().getFullYear()} Miltz Snacks. All rights reserved.</p>
        </div>
        <div className="flex gap-6 font-heading font-bold text-sm">
          <Link href="#" className="hover:text-miltz-yellow transition">Instagram</Link>
          <Link href="#" className="hover:text-miltz-yellow transition">Facebook</Link>
          <Link href="#" className="hover:text-miltz-yellow transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
