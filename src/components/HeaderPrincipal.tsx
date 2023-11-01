import { Navegacion } from "./Navegacion";

export default function HeaderPrincipal() {
  return (
    <header style={{ backgroundColor: "#2E3C50" }}>
      <div className='container'>
        <Navegacion />
      </div>
    </header>
  )
}
