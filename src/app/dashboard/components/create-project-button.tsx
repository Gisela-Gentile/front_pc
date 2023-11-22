"use client";
import { useProjects } from "@/app/context/ProjectContext";
import { useRouter } from "next/navigation";

export default function CreateProjectButton() {
  const router = useRouter();   
  const {setSelectedProject} = useProjects();     
  
    return (
    <button
      onClick={() =>{
        setSelectedProject(null);  
        router.push("/dashboard/projects/new");
        }
      }
      className="rounded border bg-black px-4 py-1 text-center text-white m-4"
    >
      Crear Proyecto Nuevo
    </button>
  );
}
