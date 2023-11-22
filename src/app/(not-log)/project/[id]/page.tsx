"use client"
import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";
import { ProjectComplete} from "@/app/interfaces/Project";
import ProjectViewComplete from "@/components/ProjectViewComplete";
import { API_URL } from "@/config/constants";

async function fetchProjectComplete(id: number): Promise<ProjectComplete> {
  const res = await fetch(`${API_URL}/project/${id}/view/complete`);
  const data = await res.json();
  return data;
}

export default async function ProjectPage({ params: { id }, }: { params: { id: string } }) {
  const projectComplete = await fetchProjectComplete(Number(id));
  return (
    <div className="container"> 
     <Breadcrumbs breadcrumbs={[{ label: 'Inicio', href: '/', },]}/>
      <hr/>   
      <div className="row">
        <div className="offset-2 col-8">        
          <ProjectViewComplete projectComplete={projectComplete} />    
          </div>
      </div>
    </div>
  )
}
