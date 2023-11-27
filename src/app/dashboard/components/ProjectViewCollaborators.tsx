"use client"
import { useAuth } from "@/app/context/AuthContext";
import { Collaborator } from "@/app/interfaces/Collaborator";
import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import DeleteCollaboratorButton from "./delete-collaborator-button";
import { useEffect, useState } from "react";

export default function ProjectViewCollaborators({ project }:{ project: Project },) {
  const {token} = useAuth();
  const [list,setList] = useState<Collaborator[]>([]);
  
  useEffect(() => {
    const fetchCollaborators = async () => {
        try {
          const res = await fetch(`${API_URL}/project/${project.projectId}/collaborators`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setList(data);
        } catch (error) {
            console.error('Error recuperando documentos', error);
        }
    };
    fetchCollaborators();
  }, []);
  
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
