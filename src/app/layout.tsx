
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '../components/Navigation'
import Search from '@/components/Search'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Proyectos colaborativos',
  description: 'Es una aplicación Web que permite crear y consultar proyectos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        
        <head>
          <link rel="stylesheet" href="https://bootswatch.com/5/flatly/bootstrap.min.css" />
        </head>        

        <body>

          <Navigation />
          <Search />
          {children}

          </body>
      </html>
    </>
  )
}
