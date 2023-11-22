"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';
import { FaHouseUser,FaFolder,FaRegUser,FaBoxes } from "react-icons/fa";

export default function Nav() {
  const pathname = usePathname();
  return (
    <div>
      <nav className="nav flex-column gap-2 m-2">
        <Link className={`bg-light p-2 nav-link ${pathname === '/' ? 'active':''}`} href="/dashboard"><FaHouseUser className="mx-4"/>Inicio</Link>
        <Link className={`bg-light p-2 nav-link ${pathname === '/' ? 'active':''}`} href="/dashboard/projects"><FaFolder className="mx-4"/>Proyectos</Link>
        <Link className={`bg-light p-2 nav-link ${pathname === '/' ? 'active':''}`} href="/dashboard/profile"><FaRegUser className="mx-4"/>Perfil</Link>
        <Link className={`bg-light p-2 nav-link ${pathname === '/' ? 'active':''}`} href="/dashboard/categories"><FaBoxes className="mx-4"/>Categoría</Link>
        
      </nav>
    </div>
  )
}