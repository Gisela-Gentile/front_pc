import Link from 'next/link'
export default function Nav() {
  return (
    <div>
      <nav className="nav flex-column">
        <Link className="nav-link active" aria-current="page" href="/project">Crear proyecto</Link>
        <Link className="nav-link" href="/document">Agregar Documentos</Link>
        <Link className="nav-link" href="/collaborators">Colaboradores</Link>
        <Link className="nav-link" href="/category">Agregar categoría</Link>
        <Link className="nav-link" href="/comment">Comentar</Link>
      </nav>
    </div>
  )
}