import DisplayCategories from "@/components/DisplayCategories"
import DocumentsMostViewed from "@/components/DocumentsMostViewed"
import Presentation from "@/components/Presentation"
import ProjectsMostViewed from "@/components/ProjectsMostViewed"
import Search from "@/components/Search"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Home() {
  return (
    <div className="container">
      <Presentation />
      <Search />
      <ProjectsMostViewed />
      <section className="p-4">
        <div>
        <h2 className="py-4">Categorias</h2>
        <DisplayCategories format={'list-button'}/>  
        </div>
      </section>
      
      <DocumentsMostViewed />
    </div>
  )
}