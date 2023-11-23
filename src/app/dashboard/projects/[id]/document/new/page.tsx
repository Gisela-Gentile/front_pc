"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useProjects } from "@/app/context/ProjectContext";
import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";
import DocumentForm from "@/app/dashboard/components/DocumentForm";
import { useRouter, } from "next/navigation";
import { useEffect } from "react";

export default function NewDocumentPage() {
    const { token, user } = useAuth();
    const router = useRouter();
    const {selectedProject} = useProjects();    
     
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
            { label: `${selectedProject?.title}`, href: `/dashboard/projects/${selectedProject?.projectId}`,active:true }]}/>
          <hr/>
          <DocumentForm/>            
        </section>
    );
}