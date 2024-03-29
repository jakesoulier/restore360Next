import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import { Theme, ThemePanel } from '@radix-ui/themes';

const inter = Inter({
   subsets: ['latin'],
   variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Theme accentColor="red">
      
          <NavBar/>
          <main className='p-4'>{children}</main>
        
        </Theme>
      </body>
    </html>
  )
}
