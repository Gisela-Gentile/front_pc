import { useAuth } from "@/app/context/AuthContext";
import { Collaborator } from "@/app/interfaces/Collaborator";
import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";


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
      <table className='table'>
      <tbody>
        { list.length > 0 && (
          list.map((collaborator:Collaborator) => (
          <tr className='m-2' key={collaborator.collaboratorId}>
            <td>{collaborator.user && collaborator.user.username}</td>
          </tr>)))
        }
        </tbody>  
      </table>
    </div>
  )
}
