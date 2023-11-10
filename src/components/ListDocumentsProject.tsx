
import ItemListDocument from './ItemListDocument';
import { ItemLastDocument } from '@/app/interfaces/Document';

export default function ListDocumentsProject({listDocuments}:{listDocuments:ItemLastDocument[]}) {
     
  return (
    <section className='py-4'>      
      <div className='row'>
        <table className="table table-dark table-hover">
          <tbody>
          {
            listDocuments.map((document:ItemLastDocument) => (
              <tr key={document.documentId} className="">
                <ItemListDocument document={document} /> 
              </tr>
            ))
          }
          </tbody>
        </table> 
      </div>
    </section>
  )
}