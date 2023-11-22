
import { DocumentComplete } from '@/app/interfaces/Document';
import { API_URL } from '@/config/constants';
import { DocumentCard } from './DocumentCard';

async function fetchDocuments():Promise<DocumentComplete[]> {
  const res = await fetch(`${API_URL}/document/most-viewed`,{cache: 'no-store'});
  const data = await res.json();
  return data;
}

export default async function DocumentsMostViewed() {
  const documents = await fetchDocuments();
  return (
    <section className='p-4'>      
      <h2 className="py-4">Documentos Mas visitados</h2>
      <div className='row'>
        { documents.length > 0 ? ( 
          documents.map(( document:DocumentComplete) => (
            <div className='col-md-4' key={document.documentId}>
              <DocumentCard document={document} />
            </div>
          ))) : (<div className='col-md-12'>No existen Documentos en la actualidad.</div>)
        }
      </div>
    </section>
  )
}