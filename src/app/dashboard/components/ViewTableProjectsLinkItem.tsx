"use client"
import { useProjects } from '@/app/context/ProjectContext';
import { Project } from '@/app/interfaces/Project'
import { capitalize } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FaFolder } from "react-icons/fa";

export function ViewTableProjectsLinkItem({ project }:{ project: Project },) {   
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
      <tr onClick={handleClick}>
          <td>{new Date(project.creationDate).toLocaleDateString()}</td>
          <td><FaFolder/>{' '}{capitalize(project.title)}</td>
          <td>{project.category && project.category.name}</td>          
      </tr>
    )
}
