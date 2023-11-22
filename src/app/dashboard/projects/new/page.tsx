"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useRouter, } from "next/navigation";
import { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProjectForm from "../../components/ProjectForm";

export default function NewProjectPage() {
    const { token, user } = useAuth();
    const router = useRouter();    
     
    useEffect(() => {
      if (!user) {
        router.push('/')
      } 
    }, [token,user])
        
    return (
        <section>
          <Breadcrumbs breadcrumbs={[
            { label: 'Inicio', href: '/dashboard',},
            { label: 'Proyectos', href: '/dashboard/projects',active:true }]}/>
          <hr/>
          <ProjectForm/>            
        </section>
    );
}