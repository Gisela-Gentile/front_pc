import { Collaborator } from "@/app/interfaces/Collaborator";


export default function ItemListCollaborator({collaborator}:{collaborator:Collaborator}) {
  const {project,user,rol,collaboratorId} = collaborator;
  
  return (
    <>
      <p>{user.username } - rol:{rol} - {user.email} -</p>
    </>
  )
}
