"use client"
import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import { ProjectCard } from "./ProjectCard";
import { useEffect, useState } from "react";

export default function UsuarioProjectsCollaborator({id}:{id: number}) {
  const [projects, setProjects] = useState<Project[]>();
  useEffect(() => {
    const fetchUsuarioProjectsCollaborator = async () => {
        try {
          const res = await fetch(`${API_URL}/project/user/${id}/collaborators-projects`,{cache: 'no-store'});
          const data = await res.json();
          setProjects(data.data);
        } catch (error) {
            console.error('Error recuperando proyectos donde contribuye el Usuario', error);
        }
    };
    fetchUsuarioProjectsCollaborator();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12"><h2 className="text-center text-primary pb-3 pt-3" >Proyectos donde colabora</h2></div>
        </div>
        <div className="row">
        { projects && projects.length > 0 ? ( 
         projects.map((project:Project) => (
                <div className='col-md-4 p-2' key={project.projectId}>
                  <ProjectCard project={project} />
                </div>
                )
              )):
              (<div className='col-md-12'>No colabora en Proyectos en la actualidad.</div>)
        }
        </div>            
      </div>
    </section>
  )
}
