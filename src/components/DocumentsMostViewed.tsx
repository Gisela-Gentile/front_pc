"use client"
import { DocumentComplete } from '@/app/interfaces/Document';
import { API_URL } from '@/config/constants';
import { DocumentCard } from './DocumentCard';
import { useEffect, useState } from 'react';

export default function DocumentsMostViewed() {
  const [documents, setDocuments] = useState<DocumentComplete[]>([])
 
  useEffect(() => {
    const fetchDocumentCompleteMostViewed = async () => {
        try {
          const res = await fetch(`${API_URL}/document/most-viewed`,{ next: { revalidate: 30 },});
          const data = await res.json();
          setDocuments(data);
        } catch (error) {
            console.error('Error recuperando documentos', error);
        }
    };
    fetchDocumentCompleteMostViewed();
  }, []);
  
  return (
    <section className='p-4'>      
      <h2 className="py-4">Documentos Mas visitados</h2>
      <div className='row'>
        { documents.length > 0 ? ( 
          documents.map(( document:DocumentComplete) => (
            <div className='col-md-4 p-2' key={document.documentId}>
              <DocumentCard document={document} />
            </div>
          ))) : (<div className='col-md-12'>No existen Documentos en la actualidad.</div>)
        }
      </div>
    </section>
  )
}