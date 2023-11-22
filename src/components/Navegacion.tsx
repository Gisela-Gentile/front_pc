'use client'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import styles from '@/components/Navegacion.module.css'

export function Navegacion() {
  const pathname = usePathname();
  const router = useRouter();
  const { token, user,signOut } = useAuth();
  const logout = async () => {
    try {
      signOut();
    } catch (error) {
      console.error("Error");
    }
    router.push("/");
  };  
  
  return (
    <div className='row'>
      <div className='col-md-8'>
        <nav className="navbar sticky-top navbar-expand-lg bg-primary" data-bs-theme="dark">
          <Image className="p-2" src="/assets/logo.png" alt="Logo" width={80} height={80} priority />              
          <Link className={`navbar-brand link ${pathname === '/' ? 'active' : ''}`} href="/">Proyectos Colaborativos</Link>          
          {(token==='')?(  
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>):''
          }
          {(token==='')?(
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className={`nav-link ${pathname === '/api' ? 'active' : ''}`} href="/api">Api</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${pathname === '/docs' ? 'active' : ''}`} href="/docs">Docs</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} href="/contact">Contacto</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${pathname === '/about' ? 'active' : ''}`} href="/about">Conocenos</Link>
                </li>
              </ul>       
            </div>):''
          }
        </nav>    
      </div>
      <div className="col-md-4 d-flex align-items-center justify-content-end">
        {(token==='')&&(pathname !== '/login') ?(
        <button type="button" className="btn btn-secondary mx-2" onClick={() => router.push('/login')}>Iniciar sesión</button>):''}
        {(token==='')?(<button type="button" className="btn btn-success mx-2" onClick={() => router.push('/register')}>Registarse</button>):''}
        {(token !== '')?(<div className={styles.marco}>  {user && user.username }</div>):''}
        {(token !== '')?(<button type="button" className="btn btn-success mx-2" onClick={logout}>Salir</button>):''}
      </div>
    </div>
  )
}
