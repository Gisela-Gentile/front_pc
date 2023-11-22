
import { ItemLastDocument } from '@/app/interfaces/Document';
import Link from 'next/link'; 
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export default async function ItemListDocument({document}:{document:ItemLastDocument}) {
  return (
    <>
      
      <td>{new Date(document.creationDate).toLocaleDateString()}</td> 
      <td>{document.title}</td>
      <td><Link href={`/document/${document.documentId}`} title='Ir al documento'><FaRegArrowAltCircleRight/></Link></td>
    </>
  )
}
