
import { Project } from '@/app/interfaces/Project';
import { ViewTableProjectsLinkItem } from './ViewTableProjectsLinkItem';
import Link from 'next/link';

export default function ViewTableProjects({title,ancho,list,cantidad,msgResult,viewMore}:
  { title:string,
    ancho:number,
    list:Project[],
    cantidad:number,
    msgResult:string,
    viewMore:boolean
  }) {
  let tope= list.length;
  if ((cantidad < tope )&& (cantidad!==0) ){ tope = cantidad}      

  return (
    <section>
      <div className={`col-${ancho}`}>
      <h3>{title}</h3>  
      {  
        (list.length > 0) ? (
        <table className='table table-bordered table-hover'>
          <thead>
            <tr>
              <th>Creado</th>
              <th>Título</th>
              <th>Categoría</th>            
            </tr>
          </thead>
          <tbody>      
          { list.slice(0,tope).map((project:Project) => (
              <ViewTableProjectsLinkItem key={project.projectId} project={project} />
            ))
          }
          { viewMore && list.length > cantidad && (
            <tr key={list.length+1}><td colSpan={3}><Link href="/dashboard/projects">Ver más...</Link> </td></tr>)
          }
          </tbody>
        </table>):(<div className='col-12'>{msgResult}</div>) 
      }
      </div>
    </section>
  )
}