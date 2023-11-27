"use client"
import { useProjects } from '@/app/context/ProjectContext';
import { Project } from '@/app/interfaces/Project'
import { capitalize } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function ProjectLink({ project }:{ project: Project },) {   
    const router = useRouter();
    const {setSelectedProject} = useProjects();

    function handleClick(){
      setSelectedProject(project);
      router.push(`/dashboard/projects/${project.projectId}`)
    }
    return (        
        <div>
          <a onClick={handleClick}  className="">{capitalize(project.title)}</a>
        </div>
     )
}
