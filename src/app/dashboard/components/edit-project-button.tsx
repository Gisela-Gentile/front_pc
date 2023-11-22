"use client";
import { useProjects } from "@/app/context/ProjectContext";
import { useParams, useRouter } from "next/navigation";

export default function EditProjectButton() {
  const router = useRouter();
  const {id} = useParams();
  const {projectsOwner, setSelectedProject} = useProjects();

    
  function handleClick(){
    const finded = projectsOwner.find((project) => (project.projectId === Number(id)));
    if (finded!== undefined){
      setSelectedProject(finded);
    }
    router.push(`/dashboard/projects/${id}/edit`)
  }
  
  return (
    <button
      onClick={handleClick}
      className="rounded border bg-black px-4 py-1 text-center text-white m-4"
    >
      Editar Proyecto
    </button>
  );
}
