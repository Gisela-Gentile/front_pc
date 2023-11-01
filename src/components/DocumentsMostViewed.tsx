
import { Document } from '@/app/interfaces/Document';
import { API_URL } from '@/config/constants';
import { DocumentsCard } from './DocumentsCard';

async function fetchDocuments() {
  const res = await fetch(`${API_URL}/document/most-viewed`);
  const data = await res.json();
  console.log(data);
  return data;
}

export default async function DocumentsMostViewed() {
  const documents = await fetchDocuments();
  return (
    <section className='py-4'>
      
    <h3>Documentos Mas visitados</h3>
    <div className='row'>
      { 
        documents.map((document:Document) => (
          <div className='col-md-4' key={document.documentId}>
            <DocumentsCard document={document} />
          </div>
        ))
      }
    </div>
    </section>
  )
}