"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useProjects } from "@/app/context/ProjectContext";
import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";
import { DocumentComplete } from "@/app/interfaces/Document";
import DocumentView from "@/components/DocumentView";
import { API_URL } from "@/config/constants";
import { capitalize } from "@/lib/utils";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



{/* aca traer documento completo ya tengo document pero deberia traer revisiones...*/}
export default function ViewDocumentPage() {
    const { token, user } = useAuth();
    const router = useRouter();
    const {selectedProject}= useProjects();    
    const {id} = useParams();
    const {idDoc} = useParams();
    const [titulo, setTitulo]= useState("");
    const [refProject, setRefProject]= useState<number>();
    const [document, setDocument] = useState<DocumentComplete>();
    const [idDocument,setIdDocument] = useState(idDoc);
 
    async function fetchDocumentComplete() {
      try {
        const response = await fetch(`${API_URL}/document/${idDoc}/view`);
        ;
        setDocument(await response.json())
      }catch (e){
        console.log("Couldn't make API call:/n",e);
      }
    }

    useEffect(() => {
      if (!user) {
        router.push('/')
      }      
    }, [token,user])
            
    useEffect(()=>{
      fetchDocumentComplete();
      
    },[idDoc])

    return (
        <section>
          <Breadcrumbs breadcrumbs={[
            { label: 'Inicio', href: '/dashboard',},
            { label: 'Proyectos', href: '/dashboard/projects',},
            { label: `${selectedProject && capitalize(selectedProject?.title)}`, href: `/dashboard/projects/${selectedProject?.projectId}`,},
            { label: `${document && capitalize(document?.title)}`, href: `/dashboard/projects/${selectedProject?.projectId}/document/${idDoc}`,active:true }]}/>
          <hr/>
          {document && <DocumentView documentComplete={document} />}
        </section>
    );
}