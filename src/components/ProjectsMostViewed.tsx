import { Project } from '@/app/interfaces/Project';
import { API_URL } from '@/config/constants';
import {ProjectsCard} from './ProjectsCard';
import styles from './ProjectsMostViewed.module.css'

async function fetchProjects() {
  const res = await fetch(`${API_URL}/project/view/all`);
  const data = await res.json();
  return data;
}

export default async function ProjectsMostViewed() {
  const projects = await fetchProjects();
  return (

    <section className='p-4'>
      <h2 className="py-4">Proyectos</h2>
      <div className='row'>
        { projects.length > 0 ?
          (projects.slice(0,3).map((project:Project) => (
          <div className='col-md-4' key={project.projectId}>
             <ProjectsCard project={project} />
          </div>))): (<div className='col-md-12'>No existen Proyectos en la actualidad.</div>)
        }
      </div>
    </section>
  )
}