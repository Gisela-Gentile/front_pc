"use client"
import { Project } from '@/app/interfaces/Project';
import { useAuth } from '@/app/context/AuthContext';
import { ProjectLink } from './ProjectLink';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/app/context/ProjectContext';


export default function RecentProjects() {
  const {token,user} = useAuth();
  const router = useRouter();
  const {projectsOwner,projectsCollaborator } = useProjects();
  useEffect(() => {
    if (!user) { router.push('/') } 
  }, [])
       
  return (
    <section className='p-4 container'>
      <div className='border col-md-6'>
        <h3>Mis Proyectos</h3>
      <ul className=''>      
        { projectsOwner.length > 0 ? (
          projectsOwner.slice(0,5).map((project:Project) => (
          <li key={project.projectId}>
            <ProjectLink project={project} />
          </li>))): (<div className='col-md-12'>No posee Proyectos.</div>)
        }        
      </ul>
      </div>
      <div className='border col-md-6'>
        <h3>Otros proyectos</h3>
      <ul className=''>      
        { projectsCollaborator.length > 0 ? (
          projectsCollaborator.slice(0,5).map((project:Project) => (
          <li key={project.projectId}>
            <ProjectLink project={project} />
          </li>))): (<div className='col-md-12'>No posee Proyectos.</div>)
        }        
      </ul>
      </div>
    </section>
  )
}