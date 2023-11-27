"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProjects } from "@/app/context/ProjectContext";
import Breadcrumbs from "../components/Breadcrumbs";
import CreateProjectButton from "../components/create-project-button";
import ViewTableProjects from "../components/ViewTableProjects";

export default function ProjectGeneralPage() {
    const { token, user } = useAuth();
    const router = useRouter();
    const {projectsOwner,projectsCollaborator } = useProjects();
    useEffect(() => {
      if (!user) {
        router.push('/')
      }
    }, [token,user])
    
    return (
      <section>
        <Breadcrumbs breadcrumbs={[
        { label: 'Inicio', href: '/dashboard', },
        { label: 'Proyectos', href: '/dashboard/projects',active: true, },]}/>
        <hr/>
        <CreateProjectButton/>
        <ViewTableProjects title={`Todos los Proyectos`} ancho={8} list={projectsOwner} cantidad={0} msgResult={`No posee Proyectos.`} viewMore={false}/>
      </section>    
    );
}
