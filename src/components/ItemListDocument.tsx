
import { ItemLastDocument } from '@/app/interfaces/Document';
import { capitalize } from '@/lib/utils';
import Link from 'next/link'; 
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export default function ItemListDocument({document}:{document:ItemLastDocument}) {
  return (
    <>      
      <td>{new Date(document.creationDate).toLocaleDateString()}</td> 
      <td>{capitalize(document.title)}</td>
      <td><Link href={`/document/${document.documentId}`} title='Ir al documento'><FaRegArrowAltCircleRight/></Link></td>
    </>
  )
}
