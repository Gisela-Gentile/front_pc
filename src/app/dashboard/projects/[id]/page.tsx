"use client"
import { useAuth } from "@/app/context/AuthContext";
import { notFound, useParams, useRouter, } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import EditProjectButton from "../../components/edit-project-button";
import { useProjects } from "@/app/context/ProjectContext";
import { ProjectView } from "../../components/ProjectView";
import AddCollaboratorForm from "../../components/AddCollaboratorForm";
import ProjectViewCollaborators from "../../components/ProjectViewCollaborators";
import DeleteProjectButton from "../../components/delete-project-button";
import LoadingDots from "@/components/Icons/LoadingDots";

export default function ProjectPage() {
  const { user } = useAuth();
  const router = useRouter();
  const {id} = useParams();
  const {projectsOwner,selectedProject} = useProjects();    
  const [owner, setOwner] = useState(false);
  
  useEffect(() => {
    if (!user) {
      router.push('/')
    } 
  }, [user])
 
    
  useEffect(()=>{
      if (selectedProject!==null){
          const finded = projectsOwner.find((project) => (project.projectId === Number(id)));
          {/* si tengo selected project pero finded da undefined es pq no es owner*/}
          setOwner(finded!==undefined);
          
      }else {
        notFound;
      }
      },[selectedProject]);
 

  return (
      <section>
        <Breadcrumbs breadcrumbs={[{ label: 'Inicio', href: '/dashboard', },{ label: 'Proyectos', href: '/dashboard/projects',active:true }]}/>
        <hr/>
        { owner && <EditProjectButton/>}
        { owner && <DeleteProjectButton/>}
        <div className="row">
          <div className="col-md-8"> 
            { selectedProject!==null && (
              <>
              <ProjectView project={selectedProject}/>
              <Suspense fallback={<LoadingDots/>}>
                <ProjectViewCollaborators project={selectedProject}/>
              </Suspense>
              </>)
            }
          </div>
          <div className="col-md-4"> 
          { owner && <AddCollaboratorForm/>}
          </div>
          </div>
      </section>
  );
}