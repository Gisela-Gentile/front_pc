import { Collaborator } from '@/app/interfaces/Collaborator';
import Link from 'next/link';

export default function ItemListCollaborator({collaborator}:{collaborator:Collaborator}) {
  const {project,user,rol,collaboratorId} = collaborator;
  
  return (
    <>
      <span>{user.username } - {user.email} - <Link href={`/perfil/${user.userId}`}>Ver perfil publico</Link> </span>
    </>
  )
}
