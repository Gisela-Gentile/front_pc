import { Collaborator } from "@/app/interfaces/Collaborator";
import { API_URL } from "@/config/constants";
import UsuarioCard from "./UsuarioCard";

async function fetchCollaborator(id:number):Promise<Collaborator> {
    const res = await fetch(`${API_URL}/collaborator/${id}/view`);
    const data = await res.json();
    return data;
  }

export default async function CollaboratorAutorCard({id}:{id: number}) {
    const collaborator = await fetchCollaborator(id);   
  return (<UsuarioCard id={collaborator.user.userId}/>)
}
