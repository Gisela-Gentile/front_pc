
import { ItemLastDocument } from '@/app/interfaces/Document';
import Link from 'next/link'; 

export default async function ItemListDocument({document}:{document:ItemLastDocument}) {
  return (
    <>
      <td>{document.title}</td>
      <td>{new Date(document.creationDateDocument).toLocaleDateString()}</td> 
      <td><Link href={`/document/${document.documentId}`}>Ver documento</Link></td>
    </>
  )
}
