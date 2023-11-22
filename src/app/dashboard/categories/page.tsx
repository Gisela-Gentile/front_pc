import DisplayCategories from "@/components/DisplayCategories";
import Breadcrumbs from "../components/Breadcrumbs";


export default function CategoryPage() {
  return (
    <section className="">
    <Breadcrumbs breadcrumbs={[
      { label: 'Inicio', href: '/dashboard',active: true,},]}/>
    <hr/>
    <h2>Categorías</h2>
    <div className="row">
      <p> En esta seccion se visualizan las categorias diponibles actualmente para asignar a los distintos proyectos de la plataforma.</p>
    </div>
    <div className="row">
      <div className="col-4 border">
        <h4>Listado</h4>
        <DisplayCategories format={'none'} />
      </div>
      <div className="offset-1 col-5 border">
        <h4>Registrar Nueva Categoría</h4>

      </div>
    </div>
  </section>
  )
}
