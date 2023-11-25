
import { useProjects } from '@/app/context/ProjectContext';
import ViewListProjects from './ViewListProjects';

export default function RecentProjects() {
  const {projectsOwner,projectsCollaborator } = useProjects();
        
  return (
    <>
    <ViewListProjects title={`Mis últimos Proyectos`} list={projectsOwner} cantidad={4} msgResult={`No posee Proyectos recientes.`} viewMore={true}/> 
    <ViewListProjects title={`Otros proyectos donde contribuir`} list={projectsCollaborator} cantidad={4} msgResult={`No posee actualmente.`} viewMore={true}/> 
    </>
    
  )
}