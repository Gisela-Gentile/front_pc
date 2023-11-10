import UsuarioComplete from "@/components/UsuarioComplete";
import UsuarioProjectsCollaborator from "@/components/UsuarioProjectsCollaborator";
import UsuarioProjectsOwner from "@/components/UsuarioProjectsOwner";

export default function PerfilPage({ params: { id }, }: { params: { id: string } }) {
  
  return (
    <>     
      <UsuarioComplete id={Number(id)} /> 
      <UsuarioProjectsOwner id={Number(id)} />   
      <UsuarioProjectsCollaborator id={Number(id)} />
    </>
  )
}
