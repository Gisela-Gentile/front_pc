"use client"
import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";
import { ProjectComplete} from "@/app/interfaces/Project";
import ProjectViewComplete from "@/components/ProjectViewComplete";
import { API_URL } from "@/config/constants";
import { useEffect, useState } from "react";

export default function ProjectPage({ params: { id }, }: { params: { id: string } }) {
  
  const [projectComplete, setProjectComplete] = useState<ProjectComplete>();
  
  useEffect(() => {
    const fetchProjectComplete = async () => {
        try {
          const res = await fetch(`${API_URL}/project/${id}/view/complete`);
          const data = await res.json();
          setProjectComplete(data);
        } catch (error) {
            console.error('Error recuperando proyecto ', error);
        }
    };
    fetchProjectComplete();
  },[]); 
   
  
  return (
    <div className="container"> 
     <Breadcrumbs breadcrumbs={[{ label: 'Inicio', href: '/', },]}/>
      <hr/>   
      <div className="row">
        <div className="offset-2 col-8">        
         { projectComplete && <ProjectViewComplete projectComplete={projectComplete} />}    
          </div>
      </div>
    </div>
  )
}
