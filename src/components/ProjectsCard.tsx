'use client'
import styles from './ProjectsCard.module.css'
import { Project } from '@/app/interfaces/Project'
import Link from 'next/link';

export function ProjectsCard({ project }:{ project: Project },) {
    const {projectId,title, creationDate, author, category,description } = project;      
    return (        
        <div className='card'>
            <div className='card-body'>
                { title && (<h4 className={styles.title}>{title}</h4>) }
                { creationDate && <div className='card-subtitle my-2'><u>Creado:</u> {' '+ new Date( creationDate).toLocaleDateString()}</div> }
                { author && <div className='card-subtitle my-2'><u>Autor:</u><b><em>{' '+ author.username}</em></b></div> }
                { description && <div className={styles.description}>{description}</div> }
                <div className='row'>
                    <div className='col-6'>
                        { projectId && <div className='m-2'><Link href='/project/[projectId]'as={`/project/${projectId}`}>Ver más...</Link></div> }
                    </div>
                    <div className='col-6'>
                        { category && <div className={styles.category}>{category.name}</div> }
                    </div>
                </div>
            </div>
        </div>
    )
}
