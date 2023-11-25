import { useAuth } from "@/app/context/AuthContext";
import { Collaborator } from "@/app/interfaces/Collaborator";
import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import DeleteCollaboratorButton from "./delete-collaborator-button";


async function fetchCollaborartors(id:number):Promise<Collaborator[]> {
    const {token} = useAuth()
    const res = await fetch(`${API_URL}/project/${id}/collaborators`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
  }  

export default async function ProjectViewCollaborators({ project }:{ project: Project },) {
  const list = await fetchCollaborartors(project.projectId);
  return (
    <div>
      <h4>Colaboradores</h4>  
      { list.length > 0 ? ( 
        <table className='table'>
          <tbody>
            {  list.map((collaborator:Collaborator) => (
              <tr className='m-2' key={collaborator.collaboratorId}>
                <td>{collaborator.user && collaborator.user.username}
                <DeleteCollaboratorButton email={collaborator.user.email} /></td>
              </tr>))
            }
          </tbody>  
        </table>):(
        <div>No posee en la actualidad.</div>)
      }
    </div>
  )
}
