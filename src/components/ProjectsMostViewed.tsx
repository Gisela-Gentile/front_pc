"use client"
import { Project } from '@/app/interfaces/Project';
import { API_URL } from '@/config/constants';
import {ProjectCard} from './ProjectCard';
import { useEffect, useState } from 'react';

export default function ProjectsMostViewed() {
  const [projects, setProjects]= useState<Project[]>();
  useEffect(() => {
    const fetchProjects = async () => {
        try {
          const res = await fetch(`${API_URL}/project/view/all`, { next: { revalidate: 30 },});
          const data = await res.json();
          setProjects(data);
        } catch (error) {
          console.error('Error recuperando proyectos', error);
        }
    };
    fetchProjects();
  }, []);    
  
  return (
    <section className='p-4'>
      <h2 className="py-4">Proyectos</h2>
      <div className='row'>
        { projects && projects.length > 0 ? (
          projects.slice(0,3).map((project:Project) => (
            <div className='col-md-4' key={project.projectId}>
              <ProjectCard project={project} />
            </div>)
          )
        ):(<div className='col-md-12'>No existen Proyectos en la actualidad.</div>)
        }
      </div>
    </section>
  )
}