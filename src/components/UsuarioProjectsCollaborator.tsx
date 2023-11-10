import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import { ProjectsCard } from "./ProjectsCard";



async function fetchUsuarioProjectsCollaborator(id:number):Promise<any> {
    const res = await fetch(`${API_URL}/project/user/${id}/collaborators-projects`);
    const data = await res.json();
    return data.data;

  }

export default async function UsuarioProjectsCollaborator({id}:{id: number}) {
    const projects : Project[] = await fetchUsuarioProjectsCollaborator(id);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12"><h3>Proyectos donde colabora</h3></div>
        </div>
        <div className="row">
        {   projects.map((project:Project) => (
                <div className='col-md-4' key={project.projectId}>
                  <ProjectsCard project={project} />
                </div>
                )
              )
        }
        </div>        
        
      </div>
    </section>
  )
}
