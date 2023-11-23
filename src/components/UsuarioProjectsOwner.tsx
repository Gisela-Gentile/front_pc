import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import { ProjectCard } from "./ProjectCard";

async function fetchUsuarioProjectsOwner(id:number):Promise<Project[]> {
  const res = await fetch(`${API_URL}/project/user/${id}/owner-projects`,{cache: 'no-store'});
  const data = await res.json();
  return data.data;
}

export default async function UsuarioProjectsOwner({id}:{id: number}) {
  const projects = await fetchUsuarioProjectsOwner(id);
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center text-primary pb-3 pt-3">Proyectos Propios</h2>
            </div>
            <div className="row">
            { projects.length > 0 ? (
              projects.map((project:Project) => (
              <div className='col-md-4 p-2' key={project.projectId}>
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
