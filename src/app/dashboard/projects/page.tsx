"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProjects } from "@/app/context/ProjectContext";
import ViewListProjects from "../components/ViewListProjects";
import Breadcrumbs from "../components/Breadcrumbs";
import CreateProjectButton from "../components/create-project-button";

export default function ProjectAddPage() {
    const { token, user } = useAuth();
    const router = useRouter();
    const {projectsOwner,projectsCollaborator } = useProjects();
    useEffect(() => {
      if (!user) {
        router.push('/')
      }
    }, [])
    
    return (
    <section className="">
      <Breadcrumbs breadcrumbs={[
      { label: 'Inicio', href: '/dashboard',active: true, },]}/>
      <hr/>
      <CreateProjectButton/>
      <ViewListProjects title={`Todos los Proyectos`} list={projectsOwner} cantidad={0} msgResult={`No posee Proyectos.`} viewMore={false}/>
    </section>
    
    );
}
