import DocumentsMostViewed from "@/components/DocumentsMostViewed"
import ListCategories from "@/components/ListCategories"
import Presentation from "@/components/Presentation"
import ProjectsMostViewed from "@/components/ProjectsMostViewed"
import Search from "@/components/Search"
import "bootstrap/dist/css/bootstrap.min.css"
import { Suspense } from "react"

export default function Home() {
  return (
      <>        
        <Suspense>
          <Presentation />  
          <Search />
          <ProjectsMostViewed />
          <ListCategories />
          <DocumentsMostViewed />
        </Suspense>
      </>
  )
}