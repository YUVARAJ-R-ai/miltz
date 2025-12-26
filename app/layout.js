import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

// Setup Google Fonts based on requirements
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Miltz Cinema Snacks | Crunch. Munch. Smile.',
  description: 'Premium popcorn seasonings and cheese balls for the ultimate cinema experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-body antialiased selection:bg-miltz-red selection:text-white">
        {/* Simple Navigation Header */}
        <header className="absolute top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center">
             <div className="font-heading font-black text-3xl tracking-tighter text-miltz-red uppercase">
                Miltz<span className="text-miltz-yellow">.</span>
             </div>
             <nav>
                 <button className="bg-miltz-red text-white px-6 py-2 rounded-full font-heading font-bold text-sm hover:bg-miltz-dark transition-colors duration-300">
                     Partner With Us
                 </button>
             </nav>
        </header>
        <main>
            {children}
        </main>
        {/* Minimal Footer */}
        <footer className="bg-miltz-dark text-miltz-cream py-12 px-6 md:px-12 text-center md:text-left">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <div className="font-heading font-black text-2xl tracking-tighter text-miltz-red uppercase mb-2">
                        Miltz<span className="text-miltz-yellow">.</span>
                    </div>
                    <p className="text-sm opacity-80">© {new Date().getFullYear()} Miltz Snacks. All rights reserved.</p>
                </div>
                 <div className="flex gap-6 font-heading font-bold text-sm">
                    <a href="#" className="hover:text-miltz-yellow transition">Instagram</a>
                    <a href="#" className="hover:text-miltz-yellow transition">Facebook</a>
                    <a href="#" className="hover:text-miltz-yellow transition">Contact</a>
                </div>
            </div>
        </footer>
      </body>
    </html>
  )
}
