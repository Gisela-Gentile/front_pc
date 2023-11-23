import UsuarioComplete from "@/components/UsuarioComplete";
import UsuarioProjectsCollaborator from "@/components/UsuarioProjectsCollaborator";
import UsuarioProjectsOwner from "@/components/UsuarioProjectsOwner";

export default function PerfilPage({ params: { id }, }: { params: { id: string } }) {
  
  return (

    
    <div className="p-2">
      <div className=" d-grid gap-3 m-2">
        <div className="p-2 bg-light border ">
          <UsuarioComplete id={Number(id)} />
        </div>
      </div>
      <div className="">
        <UsuarioProjectsOwner id={Number(id)} />
      </div>
      <div>
        <UsuarioProjectsCollaborator id={Number(id)} />
      </div>
    </div>
  )
}
