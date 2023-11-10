import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import { ProjectsCard } from "./ProjectsCard";



async function fetchUsuarioProjectsOwner(id:number):Promise<any> {
    const res = await fetch(`${API_URL}/project/user/${id}/owner-projects`);
    const data = await res.json();
    console.log(data);
    return data.data;

  }

export default async function UsuarioProjectsOwner({id}:{id: number}) {
    const projects : Project[] = await fetchUsuarioProjectsOwner(id);

  return (
    <>
      <h3>Proyectos Propios</h3>
      {
          projects.map((project:Project) => (
          <div className='col-md-4' key={project.projectId}>
             <ProjectsCard project={project} />
          </div>))
        }
    </>
  )
}
