'use client'
import styles from './ProjectView.module.css'
import { Project } from '@/app/interfaces/Project'


export function ProjectView({ project }:{ project: Project },) {
    const {projectId,title, creationDate, author, category,description } = project;      
    return (        
        <article className='m-3'>
            <table className="table table-striped">
            <tbody>
            <tr className='row'>
                <td className='col-3 text-end'><h3><strong>Título</strong></h3></td>
                <td className='col-9 text-left'><h3 className={styles.title}>{title}</h3></td>
            </tr>                
            <tr className='row'>
                <td className='col-3 text-end align-middle'><strong>Creado</strong></td>
                <td className='col-9 text-left align-middle'>{' '+ new Date( creationDate).toLocaleDateString()}</td>
            </tr>
            { author && 
            <tr className='row'>
                <td className='col-3 text-end align-middle'><strong>Autoría</strong></td>
                <td className='col-9 text-left align-middle'>{' '+ author.username}</td>
            </tr>
            }
            <tr className='row'>
                <td className='col-3 text-end'><strong>Breve descripción</strong></td>
                <td className='col-9 text-left'>
                    <div className={styles.title}>{description}</div>
                </td>
            </tr>
            {category && (
                <tr className='row'>
                    <td className='col-3 text-end align-middle'><strong >Categoria</strong></td>
                    <td className={`col-9 text-left align-middle ${styles.title}`}>{category.name}</td>
                </tr>)
            }
            </tbody>
            </table>
        </article>
    )
}
