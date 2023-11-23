import Link from 'next/link';
import { ItemLastDocument } from '@/app/interfaces/Document';
import { ViewTableDocumentsLinkItem } from './ViewTableDocumentsLinkItem';

export default function ViewTableDocuments({title,ancho,list,cantidad,msgResult,viewMore}:
  { title:string,
    ancho:number,
    list:ItemLastDocument[],
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
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha de Creación</th>
            <th>Autor</th>            
            <th>fecha de Revisión</th>
            <th>Autor de Revision</th>            
          </tr>
        </thead>
        <tbody>      
        {  (list.length > 0) && list.slice(0,tope).map((itemLastDocument:ItemLastDocument) => (
            <ViewTableDocumentsLinkItem itemLastDocument={itemLastDocument} />
          ))
        }
        {/*{ viewMore && list.length > cantidad && (
        <tr key={list.length+1}><td colSpan={3}><Link href="/dashboard/projects">Ver más...</Link> </td></tr>)
        }*/}
      </tbody>
      </table>
      { (list.length === 0) && (<div className='col-12'>{msgResult}</div>) }
      </div>
    </section>
  )
}