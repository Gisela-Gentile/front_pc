
import { useProjects } from '@/app/context/ProjectContext';
import ViewListProjects from './ViewListProjects';
import { useEffect } from 'react';

export default function RecentProjects() {
          
  const { projectsOwner,
          projectsCollaborator,
          loadProjectsOwner,
          loadProjectsCollaborator
  } = useProjects();

  console.log("Recargo recent projects!!!")
  useEffect(() => { loadProjectsOwner()},[]);
  useEffect(() => { loadProjectsCollaborator()},[]);

  return (
    <>
    <ViewListProjects title={`Mis últimos Proyectos`} list={projectsOwner} cantidad={4} msgResult={`No posee Proyectos recientes.`} viewMore={true}/> 
    <ViewListProjects title={`Otros proyectos donde contribuir`} list={projectsCollaborator} cantidad={4} msgResult={`No posee actualmente.`} viewMore={true}/> 
    </>
    
  )
}