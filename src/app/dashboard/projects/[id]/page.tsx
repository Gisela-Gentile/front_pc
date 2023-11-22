"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useRouter, } from "next/navigation";
import { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import EditProjectButton from "../../components/edit-project-button";
import { useProjects } from "@/app/context/ProjectContext";
import { ProjectView } from "../../components/ProjectView";

export default function ProjectPage() {
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
        <Breadcrumbs breadcrumbs={[{ label: 'Inicio', href: '/dashboard', },{ label: 'Proyectos', href: '/dashboard/projects',active:true }]}/>
        <hr/>
        <EditProjectButton/>
        <div className="row">
          <div className="col-md-9"> 
              {
                selectedProject!==null ? (
                <ProjectView project={selectedProject}/>
                ):''
              }              
            </div>
          </div>
      </section>
  );
}