import { Project } from '@/app/interfaces/Project'
import Link from 'next/link';

export function ProjectLink({ project }:{ project: Project },) {
    {/*const {projectId,title, creationDate, author, category,description } = project;      */}
    return (        
        <>
          { project.projectId && (
          <Link href='/dashboard/project/[projectId]'as={`/dashboard/project/${project.projectId}`}>{project.title}</Link>)}               
        </>
    )
}
