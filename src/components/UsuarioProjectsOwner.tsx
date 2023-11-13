import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import { ProjectCard } from "./ProjectCard";

async function fetchUsuarioProjectsOwner(id:number):Promise<any> {
  const res = await fetch(`${API_URL}/project/user/${id}/owner-projects`);
  const data = await res.json();
  return data.data;
}

export default async function UsuarioProjectsOwner({id}:{id: number}) {
  const projects : Project[] = await fetchUsuarioProjectsOwner(id);
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Proyectos Propios</h3>
            { projects.length > 0 ? (
              projects.map((project:Project) => (
              <div className='col-md-4' key={project.projectId}>
                  <ProjectCard project={project} />
              </div>))):
              (<div className='col-md-12'>No registra Proyectos en la actualidad.</div>)
            }
          </div>
        </div>
      </div>
    </section>
  )
}
