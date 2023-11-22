"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProjectForm from "@/app/dashboard/components/ProjectForm";
import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";

export default function ProjectEditPage() {
    const { token, user } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!user) {
        router.push('/')
      }
    }, [])
    
    return (
    <section>
      <Breadcrumbs breadcrumbs={[
      { label: 'Inicio', href: '/dashboard', },
      { label: 'Proyectos', href: '/dashboard/projects',active: true, },]}/>
      <hr/>
      <ProjectForm/>      
    </section>    
    );
}
