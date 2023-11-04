"use client"
import { Project } from "@/app/interfaces/Project"
import Link from "next/link";


export function ProjectsCard({ project }:{ project: Project },) {
    const {projectId,title, creationDate, author, category,description } = project;  
    
    return (        
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <h6 className="card-subtitle mb-2 text-muted"><label>Creado:</label>{new Date( creationDate).toLocaleDateString()}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Author: {author.username}</h6>
                <p className="card-text">{description}</p>
                <div><label>Categoría:</label>{category.name}</div>
                <Link href='/project/[projectId]'as={`/project/${projectId}`}> Ver mas...</Link>
            </div>
        </div>
    )
}
