import { Project } from '@/app/interfaces/Project';
import { API_URL } from '@/config/constants';
import {ProjectsCard} from './ProjectsCard';

async function fetchProjects() {
  const res = await fetch(`${API_URL}/project/view/all`);
  const data = await res.json();
  return data;
}

export default async function ProjectsMostViewed() {
  const projects = await fetchProjects();
  return (
    <section className='py-4'>
      <h3>Proyectos</h3>
      <div className='row'>
        {
          projects.map((project:Project) => (
          <div className='col-md-4' key={project.projectId}>
             <ProjectsCard project={project} />
          </div>))
        }
      </div>
    </section>
  )
}