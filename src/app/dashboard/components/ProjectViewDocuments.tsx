import { useAuth } from "@/app/context/AuthContext";
import { ItemLastDocument } from "@/app/interfaces/Document";
import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import { capitalize } from "@/lib/utils";


async function fetchDocuments(id:number):Promise<ItemLastDocument[]> {
    const {token} = useAuth()
    const res = await fetch(`${API_URL}/project/${id}/documents`,{
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
  const list = await fetchDocuments(project.projectId);
  return (
    <div>
      <h4>Documentos</h4>  
      <table className='table'>
      <tbody>
        { list.length > 0 && (
          list.map((document:ItemLastDocument) => (
          <tr className='m-2' key={document.documentId}>
            <td>{capitalize(document.title)}</td>            
          </tr>)))
        }
        </tbody>  
      </table>
    </div>
  )
}
