"use client"
import { useProjects } from '@/app/context/ProjectContext';
import { Project } from '@/app/interfaces/Project'
import { useRouter } from 'next/navigation';

export function ProjectLink({ project }:{ project: Project },) {   
    const router = useRouter();
    const {projectsOwner, setSelectedProject} = useProjects();

    function handleClick(){
      const finded = projectsOwner.find((actual) => (actual.projectId === project.projectId));
      if (finded!== undefined){
        setSelectedProject(finded);
      }
      router.push(`/dashboard/projects/${project.projectId}`)
    }
    return (        
        <>
          { project.projectId &&
            <div><button onClick={handleClick}  className="">{project.title}</button></div>
          }                       
        </>
    )
}
