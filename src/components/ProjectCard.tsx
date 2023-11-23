'use client'
import styles from './ProjectCard.module.css'
import { Project } from '@/app/interfaces/Project'
import Link from 'next/link';

export function ProjectCard({ project }:{ project: Project },) {
    const {projectId,title, creationDate, author, category,description } = project;      
    return (     
< >
{projectId && <Link className='text-decoration-none' href='/project/[projectId]' as={`/project/${projectId}`}>
         
        <div className='card'>
        <div className='card-header'>
                    {category && <div className={'fw-bold text-capitalize'}>{category.name}</div>}
                </div>
            <div className='card-body'>
                { title && (<h4 className={styles.title}>{title}</h4>) }
                { creationDate && <div className='card-subtitle my-2'><u>Creado:</u> {' '+ new Date( creationDate).toLocaleDateString()}</div> }
                { author && <div className='card-subtitle my-2'><u>Autor:</u><b><em>{' '+ author.username}</em></b></div> }
                { description && <div className={styles.description}>{description}</div> }
                
            </div>
        </div>
        </Link>}
        </>
    )
}
