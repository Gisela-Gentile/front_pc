import DocumentsMostViewed from "@/components/DocumentsMostViewed"
import LoadingDots from "@/components/Icons/LoadingDots"
import ListCategories from "@/components/ListCategoryCard"
import Presentation from "@/components/Presentation"
import ProjectsMostViewed from "@/components/ProjectsMostViewed"
import Search from "@/components/Search"
import "bootstrap/dist/css/bootstrap.min.css"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="container">
      <Presentation/>
      <Search />
      <Suspense fallback={<LoadingDots />}>
        <ProjectsMostViewed />
      </Suspense>
      <section className="p-4">
        <div>
        <h2 className="py-4">Categorías</h2>
        <ListCategories/>  
        </div>
      </section>
      <Suspense fallback={<LoadingDots />}>
        <DocumentsMostViewed />
      </Suspense>
    </div>
  )
}