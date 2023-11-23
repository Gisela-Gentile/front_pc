"use client";
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/constants";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from '@/app/context/AuthContext';
import { useProjects } from '@/app/context/ProjectContext';

export default function AddCollaboratorForm() {
    const router = useRouter();    
    const { token } = useAuth();
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { projectsOwner,selectedProject} = useProjects();    
    
  

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(false);
        const newCollaborator = { "email": email, }
        try {
            const res = await fetch(`${API_URL}/project/${selectedProject?.projectId}/add/collaborator`, {
                method: "POST",
                body: JSON.stringify(newCollaborator),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            {/*console.log(res);*/}
            const data = await res.json();
            {/*console.log(` esto es data: ${data}`);*/}
            
            switch (res.status) {
                case 201:
                    setEmail("");
                    toast.success('Se agrego el colaborador con éxito', { position: 'top-right', autoClose: 2000, pauseOnHover: false, });
                    setTimeout(() => { router.refresh(); }, 2500);
                    setIsSubmitted(true);
                    break;
                case 401:
                    toast.warning(`No es posible realizar la operacion. No es propietario.`, { position: 'top-right', autoClose: 2000, });
                    setEmail("");
                    setTimeout(() => { router.refresh(); }, 2500);
                    break;
                case 404:
                    toast.warning(`El correo no correponde a ningun usuario existente en la plataforma.`, { position: 'top-right', autoClose: 2000, });
                               
                    break;    
                case 406:
                    toast.warning(`El correo ingresado ya es Colaborador.`, { position: 'top-right', autoClose: 2000, });
                    setEmail("");
                    break;    
                default:
                    toast.error(`Algo salio mal. Intente nuevamente.`, { position: 'bottom-right', autoClose: 3000, });
                    setTimeout(() => { router.refresh(); }, 2500);
                    break;
            }
        } catch (error) {
            toast.error('Error al crear el Colaborador.', {
                position: 'bottom-right', autoClose: 3000,
            });
            setIsSubmitted(false);
        }
    };

    return (
        <section>
            <h4>Agregar Colaborador</h4>
            <form onSubmit={handleSubmit} className='col-9 border rounded border-primary p-2'>
                <div className="form-group text-start mb-3">
                    <label className="form-label mt-4" htmlFor="title">Ingrese Correo electrónico<sup aria-hidden="true">*</sup></label>
                    <input
                        type="email"
                        autoComplete='off'
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="tucuenta@empresa.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-evenly">
                    <button
                        className="rounded btn btn-outline-success"
                        disabled={!email}
                        type="submit"
                    >Agregar
                    </button>

                    <button
                        className="rounded btn btn-outline-primary"
                        type="button"
                        onClick={() => { setEmail(""); }}
                    >Limpiar</button>
                </div>
            </form>
            <ToastContainer />
        </section>
    );
}