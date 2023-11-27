"use client"
import ItemListDocument from './ItemListDocument';
import { ItemLastDocument } from '@/app/interfaces/Document';

export default function ListDocumentsProject({listDocuments}:{listDocuments:ItemLastDocument[]}) {
    
  return (
    <section className='py-4'>      
      <div className='row'>
        <table className="table table-hover">
          <thead>
            <tr><th style={{width:"115px"}}>Fecha de Alta</th><th className='textLeft'>Título</th><th></th>
            </tr>
          </thead>  
          <tbody>
          {
            listDocuments.map((document:ItemLastDocument) => (<ItemListDocument key={document.documentId} document={document} />))
          }
          </tbody>
        </table> 
      </div>
    </section>
  )
}