"use client"
import { useProjects } from '@/app/context/ProjectContext';
import { ItemLastDocument } from '@/app/interfaces/Document';
import CollaboratorAutorCard from '@/components/CollaboratorAutorCard';
import { capitalize } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FaFile } from "react-icons/fa";

export function ViewTableDocumentsLinkItem({ itemLastDocument }:{ itemLastDocument: ItemLastDocument },) {   
    const router = useRouter();
    const {selectedProject} = useProjects();

    function handleClick(){
      router.push(`/dashboard/projects/${selectedProject?.projectId}/document/${itemLastDocument.documentId}/view`)
    }
    return (        
        <tr onClick={handleClick}>
          <td><FaFile/>{' '}{capitalize(itemLastDocument.title)}</td>
          <td>{new Date(itemLastDocument.creationDate).toLocaleDateString()}</td>
          <td><CollaboratorAutorCard id={itemLastDocument.authorColDocument} /></td>
          <td>{new Date(itemLastDocument.creationDateHistory).toLocaleDateString()}</td>
          <td><CollaboratorAutorCard id={itemLastDocument.authorColHistory} /></td>        
      </tr>
    )
}
