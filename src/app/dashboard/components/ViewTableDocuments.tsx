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
      <h4>{title}</h4>  
      {  (list.length > 0) ? (
        <table className='table table-bordered table-hover'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha de Creación</th>
              <th>Autor</th>            
              <th>fecha de Revisión</th>
              <th>Autor de Revisión</th>            
            </tr>
          </thead>
          <tbody>      
          { list.slice(0,tope).map((itemLastDocument:ItemLastDocument) => (
              <ViewTableDocumentsLinkItem key={itemLastDocument.documentId} itemLastDocument={itemLastDocument} />
            ))
          }
          </tbody>
        </table>):(<div className='col-12'>{msgResult}</div>) 
      }
      </div>
    </section>
  )
}