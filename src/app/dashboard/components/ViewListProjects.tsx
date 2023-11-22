
import { Project } from '@/app/interfaces/Project';
import { ProjectLink } from './ProjectLink';
import Link from 'next/link';

export default function ViewListProjects({title,list,cantidad,msgResult,viewMore}:
  { title:string,
    list:Project[],
    cantidad:number,
    msgResult:string,
    viewMore:boolean
  }) {
  let tope= list.length;
  if ((cantidad < tope )&& (cantidad!==0) ){ tope = cantidad}      

  return (
    <section>
      <div className='col-12'>
        <h3 className='m-3'>{title}</h3>
      <ol className='mb-5'>      
        { list.length > 0 ? (
          list.slice(0,tope).map((project:Project) => (
          <li className='m-2' key={project.projectId}>
            <ProjectLink project={project} />
          </li>))): (<div className='col-12'>{msgResult}</div>)
        }
        { viewMore && list.length > cantidad ? (<li className='m-2' key={list.length+1}><Link href="/dashboard/projects">Ver más...</Link></li>):''}
      </ol>
      </div>
    </section>
  )
}