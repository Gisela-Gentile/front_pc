import Link from "next/link";
import Image from 'next/image'

export default function Navigation() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid justify-content-between">
        <Link className="navbar-brand" href="#">
       <Image
      src="/logo.png"
      className="img-fluid"
      width={30}
      height={24}
      alt="logo"
    /> 
    PC
    </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" href="/">Inicio
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/api">Api</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/document" role="button" aria-haspopup="true" aria-expanded="true">Documetos</Link>
              {/* <div className="dropdown-menu"> */}
              <div className="dropdown-menu show" data-bs-popper="static">
                <Link className="dropdown-item" href="#creacion">Creación de proyectos</Link>
                <Link className="dropdown-item" href="#gestion">Gestión de documentos</Link>
                <Link className="dropdown-item" href="#colaboracion">Colaboración</Link>
                <Link className="dropdown-item" href="#comentarios">Comentarios</Link>
                {/* <div className="dropdown-divider"></div>
                <Link className="dropdown-item" href="#">Separated link</Link> */}
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">Conocenos</Link>
            </li>
            
            
          </ul>
          <form className="d-flex">
          <button type="button" className="btn btn-secondary m-3">Iniciar sesión</button>
            <button type="button" className="btn btn-success">Registrate</button>


          </form>
        </div>
      </div>
    </nav>
  )
}
