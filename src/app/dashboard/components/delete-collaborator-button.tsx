"use client";
import { useProjects } from "@/app/context/ProjectContext";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { confirm } from '@/lib/confirm';
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import { API_URL } from "@/config/constants";



export default function DeleteCollaboratorButton({email}:{email:string}) {
  const router = useRouter();
  {/*const { id } = useParams();*/}
  const {token }= useAuth();
  const { selectedProject } = useProjects();
  const [message, setMessage] = useState('');
  
    
const handleOnClick = async () => {
  if (await confirm('Esta seguro de querer quitarlo como colaborador en el proyecto?',)) {
    setMessage('Si');
    try {
      const response  =  await fetch(`${API_URL}/project/${selectedProject?.projectId}/collaborator`, {
        method: "DELETE",
        body: JSON.stringify({"email":email}),
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(`data: ${data}`);
      switch (response.status){
        case 200:
            toast.success('Collaborador eliminado con éxito', {position:'top-right',   autoClose: 2000,pauseOnHover: false,});
            setTimeout(() => {
                router.refresh();
            }, 2500);          
            break;                      
        case 401:
            toast.error(`No cuenta con permiso para elliminar, debe ser dueño del proyecto.`, { position: 'top-right', autoClose: 2000, });
            break;
        case 404:
            toast.error(`El correo electronico no corresponde con ningun usuario registrado.`, { position: 'top-right', autoClose: 2000, });
            break;
        case 406:
            toast.warning(`El correo ingresado no correponde con ningun colaborador del proyecto`, { position: 'top-right', autoClose: 3000, });
            break;
        default :
            toast.error(`Algo salio mal`, { position: 'bottom-right', autoClose: 2000, });
            break;
      }
    }catch (error: any) {
      return { error };  
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
      Eliminar
    </button>
    <ToastContainer />
  </>
);
}
