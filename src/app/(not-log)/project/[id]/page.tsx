import { ProjectComplete} from "@/app/interfaces/Project";
import ProjectView from "@/components/ProjectView";
import { API_URL } from "@/config/constants";

async function fetchProjectComplete(id: number): Promise<ProjectComplete> {
  const res = await fetch(`${API_URL}/project/${id}/view/complete`);
  const data = await res.json();
  return data;
}

export default async function ProjectPage({ params: { id }, }: { params: { id: string } }) {
  const projectComplete = await fetchProjectComplete(Number(id));
  return (
    <>     
      <ProjectView projectComplete={projectComplete} />    
    </>
  )
}
