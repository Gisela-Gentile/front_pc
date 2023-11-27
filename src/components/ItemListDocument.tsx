"use client"
import { ItemLastDocument } from '@/app/interfaces/Document';
import { capitalize } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export default function ItemListDocument({document}:{document:ItemLastDocument}) {
  const router = useRouter();

  function handleClick(){
    router.push(`/document/${document.documentId}`)
  }

  return (
    <tr onClick={handleClick} className="">
      <td>{new Date(document.creationDate).toLocaleDateString()}</td> 
      <td>{capitalize(document.title)}</td>
      <td><FaRegArrowAltCircleRight/></td>
    </tr>
  )
}
