import { Montserrat, Inter } from 'next/font/google'
import './globals.css'
import CursorGlow from '../components/CursorGlow'

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
  title: 'Miltz™ | Crunch That Brings People Together',
  description: 'Powering cinema and events with premium popcorn, snacks, and beverage solutions — trusted by theaters and large-scale events for over 7 years.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-body antialiased bg-bg-primary text-body-text">
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
