"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useDocument } from "@/app/context/DocumentContext";
import { useProjects } from "@/app/context/ProjectContext";
import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";
import DocumentForm from "@/app/dashboard/components/DocumentForm";
import { capitalize } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditDocumentPage() {
    const { token, user } = useAuth();
    const router = useRouter();
    const {selectedProject} = useProjects();  
    const {idDoc} = useParams();  
    const {selectedDocument}= useDocument();
     
    useEffect(() => {
      if (!user) {
        router.push('/')
      } 
    }, [token,user])
        
    return (
        <section>
          <Breadcrumbs breadcrumbs={[
            { label: 'Inicio', href: '/dashboard',},
            { label: 'Proyectos', href: '/dashboard/projects',},
            { label: `${selectedProject?.title}`, href: `/dashboard/projects/${selectedProject?.projectId}`,},
            { label: `${selectedDocument && capitalize(selectedDocument?.title)}`, href: `/dashboard/projects/${selectedProject?.projectId}/document/${idDoc}/view`,active:true }]}/>
          <hr/>
          <DocumentForm/>            
        </section>
    );
}  