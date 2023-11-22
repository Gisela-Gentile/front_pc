import React, { Suspense } from 'react'
import RecentProjects from './RecentProjects'
import { ProjectsProvider, useProjects } from '@/app/context/ProjectContext';

export default function Initial() {

  const {projectsOwner,projectsCollaborator,loadProjectsOwner,loadProjectsCollaborator } = useProjects();
  
  return (
    <div>
        <h1>Bienvenido </h1>
        <Suspense>
          <ProjectsProvider>
            <RecentProjects/>
          </ProjectsProvider>
        </Suspense>
        <h3>Documentos Recientes </h3>
        <ul>
            <li>Portafolios </li>
            <li>Camaras fotograafica </li>
            <li>Estantes para locales comerciales</li>
        </ul>
    </div>
  )
}
