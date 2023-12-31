import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './context/AuthContext';
import HeaderPrincipal from '@/components/HeaderPrincipal';
import FooterPrincipal from '@/components/FooterPrincipal';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Proyectos Colaborativos',
  description: 'Generated by create next app',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title> Proyectos Colaborativos</title>
        <link rel="stylesheet" href="https://bootswatch.com/5/flatly/bootstrap.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      </head>
      <body>        
        <AuthProvider>
          <HeaderPrincipal/>           
            {children}               
          </AuthProvider>
        <FooterPrincipal/>        
      </body>
    </html>
  )
}
