import { useAuth } from "@/app/context/AuthContext";
import { ItemLastDocument } from "@/app/interfaces/Document";
import { Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import ViewTableDocuments from "./ViewTableDocuments";
import { useEffect, useState } from "react";

export default function ProjectViewDocuments({ project }:{ project: Project },) {
  const {token} = useAuth();
  const [list,setList] = useState<ItemLastDocument[]>([]);

  useEffect(() => {
    const fetchItemDocuments = async () => {
        try {
          const res = await fetch(`${API_URL}/project/${project.projectId}/documents`,{
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
    fetchItemDocuments();
  }, []);
  
  return (
    <div>
      <ViewTableDocuments title={"Documentos"} ancho={0} list={list} cantidad={0} msgResult={"No posee en la actualidad."} viewMore={false} />
    </div>
  )
}
