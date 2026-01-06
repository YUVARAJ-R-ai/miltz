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
        {children}
      </body>
    </html>
  )
}
