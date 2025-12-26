import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center">
      <div className="font-heading font-black text-3xl tracking-tighter text-miltz-red uppercase">
        Miltz<span className="text-miltz-yellow">.</span>
      </div>
      <nav className="hidden md:flex gap-8 items-center font-heading font-bold text-sm text-miltz-dark">
        <Link href="#flavours" className="hover:text-miltz-red transition-colors">Flavours</Link>
        <Link href="#story" className="hover:text-miltz-red transition-colors">Our Story</Link>
        <button className="bg-miltz-red text-white px-6 py-2 rounded-full hover:bg-miltz-dark transition-colors duration-300">
          Partner With Us
        </button>
      </nav>
      {/* Mobile Menu Button Placeholder */}
      <button className="md:hidden text-miltz-dark">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </header>
  );
}
