import Link from 'next/link'
export default function Nav() {
  return (
    <div>
      <nav className="nav flex-column">
        <Link className="nav-link active" aria-current="page" href="/dashboard/project/add">Crear proyecto</Link>
        <Link className="nav-link" href="/dashboard/category/add">Agregar categoría</Link>
        
      </nav>
    </div>
  )
}