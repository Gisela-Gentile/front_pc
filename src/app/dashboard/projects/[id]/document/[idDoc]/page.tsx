"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useProjects } from "@/app/context/ProjectContext";
import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";
import { capitalize } from "@/lib/utils";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

{/* aca traer documento completo ya tengo document pero deberia traer revisiones...*/}
export default function ViewDocumentPage() {
    const { token, user } = useAuth();
    const router = useRouter();
    const {selectedProject}= useProjects();    
    const {id} = useParams();
 
    useEffect(() => {
      if (!user) {
        router.push('/')
      } 
    }, [token,user])
        
    let titulo = '';
    if (selectedProject===null){ notFound;}
    else {
        titulo = selectedProject?.title
    }
     
   
    

    return (
        <section>
          <Breadcrumbs breadcrumbs={[
            { label: 'Inicio', href: '/dashboard',},
            { label: 'Proyectos', href: '/dashboard/projects',active:true },
            { label: `${capitalize(titulo)}`, href: '/dashboard/projects',active:true }]}/>
          <hr/>
          muestro el documento completo
        </section>
    );
}