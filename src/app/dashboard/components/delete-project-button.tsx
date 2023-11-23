"use client";
import { useProjects } from "@/app/context/ProjectContext";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { confirm } from '@/lib/confirm';
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";

export default function DeleteProjectButton() {
  const router = useRouter();
  const { id } = useParams();
  const { setSelectedProject, deleteProject } = useProjects();
  const [message, setMessage] = useState('');
  
  
const handleOnClick = async () => {
  if (await confirm('Esta seguro de querer Eliminarlo?',)) {
    setMessage('Si');
    const response  = await deleteProject(Number(id));
    if (response === 200) {        
      setSelectedProject(null);
      toast.success('Proyecto actualizado con éxito', {position:'top-right', autoClose: 1000,pauseOnHover: false,});
      setTimeout(() => {router.push('/dashboard/projects');}, 1100);
      
    }    
  } else {
    setMessage('No');
  }
};

return (
  <>
    <button
      onClick={handleOnClick}
      className="rounded border bg-black px-4 py-1 text-center text-white m-4"
    >
      Eliminar Proyecto
    </button>
    <ToastContainer />
  </>
);
}
