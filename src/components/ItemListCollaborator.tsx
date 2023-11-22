import { Collaborator } from '@/app/interfaces/Collaborator';
import Link from 'next/link';

export default function ItemListCollaborator({collaborator}:{collaborator:Collaborator}) {
  const {project,user,rol,collaboratorId} = collaborator;
  
  return (
    <>
      <Link href={`/perfil/${user.userId}`} title='Ver perfil publico'><span>{user.username }</span></Link> 
    </>
  )
}
