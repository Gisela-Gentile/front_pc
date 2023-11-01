import { ProjectComplete } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";


async function fetchProjectComplete(id:string) {
    const res = await fetch(`${API_URL}/project/${id}/view/complete`);
    const data = await res.json();
    console.log(data);
    return data;

  }

export default async function ProjectPage({params: { id },}: { params: { id: string }}) {
    
console.log(id);
    const project:ProjectComplete = await fetchProjectComplete(id);
    
    return (
    <div>
      <h1>Contenido del projecto</h1>
    
      {/*{JSON.stringify(project)}*/}
      <div>{project.projectId}</div>
      <div>{project.title}</div>
      <div>{project.description}</div>
      <div>{project.creationDate ? new Date(project.creationDate).toLocaleDateString():''}</div>
      
    </div>
  )
}
