"use client";
import { useProjects } from "@/app/context/ProjectContext";

import { useRouter } from "next/navigation";

export default function CreateDocumentButton() {
  const router = useRouter();   
  const {selectedProject} = useProjects();     
  {/*const {setSelectedDocument} = useDocument();     */}
    return (
    <button
      onClick={() =>{
        
        router.push(`/dashboard/projects/${selectedProject?.projectId}/document/new`);
        }
      }
      className="rounded border bg-black px-4 py-1 text-center text-white m-4"
    >
      Crear Documento Nuevo
    </button>
  );
}
