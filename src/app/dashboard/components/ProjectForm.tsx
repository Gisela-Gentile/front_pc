"use client";
import 'react-toastify/dist/ReactToastify.css';
import { useProjects } from "@/app/context/ProjectContext";
import { API_URL } from "@/config/constants";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, Suspense, } from "react";
import { ToastContainer, toast } from "react-toastify";
import LoadingDots from '@/components/Icons/LoadingDots';

async function fetchCategories() {
    const res = await fetch(`${API_URL}/category/view/all`);
    const data = await res.json();
    return data;
}

export default function ProjectForm() {    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const titleRef = useRef<HTMLInputElement>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { createProject, selectedProject, setSelectedProject, updateProject} = useProjects();
        
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error recuperando las categorias', error);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        if (selectedProject) {
            setTitle(selectedProject.title);
            setDescription(selectedProject.description || "");
            setCategory(selectedProject.category?.name || "");
        }
    }, [selectedProject]);

    
   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (selectedProject) {
              const response = await updateProject(selectedProject.projectId,{title, description,category})
              switch (response){
                    case 200:
                        toast.success('Proyecto actualizado con éxito', {position:'top-right',   autoClose: 1500,pauseOnHover: false,});    
                        {/*setTitle("");
                        setDescription("");
                        setCategory("");*/}
                        setTimeout(() => {
                            router.push('/dashboard/projects');
                        }, 2000);
                        setIsSubmitted(true);
                        setSelectedProject(null);
                        break;  
                    default :
                        toast.error(`Algo salio mal`, { position: 'bottom-right', autoClose: 3000, });
                        break;
                }                    
            } else {            
                const response = await createProject({title, description,category});
                switch (response){
                    case 201:
                        toast.success('Proyecto creado con éxito', {position:'top-right',   autoClose: 2000,pauseOnHover: false,});
                        setTimeout(() => {
                            router.push('/dashboard/projects');
                        }, 2500);
                        setIsSubmitted(true);
                        break;                      
                    case 401:
                        toast.error(`Requiere esta logueado en el sitio.`, { position: 'top-right', autoClose: 2000, });
                        break;
                    case 404:
                        toast.error(`Falta seleccionar la categoria del proyecto.`, { position: 'top-right', autoClose: 2000, });
                        break;
                    case 406:
                        toast.warning(`Ya cuenta con un proyecto con el mismo nombre. Operacion invalida`, { position: 'top-right', autoClose: 3000, });
                        break;
                    default :
                        toast.error(`Algo salio mal`, { position: 'bottom-right', autoClose: 2000, });
                        break;
                }
            }
        } catch (error) {
            toast.error('Error al crear Proyecto', {position: 'bottom-right',autoClose: 2000,
            });
            setIsSubmitted(false);
            router.push('/dashboard/projects');
        }
        finally {
            setIsLoading(false);      
        }
    };
                 
    return (
        <section>
            {isSubmitted ? (
                <>
                {
                    (selectedProject===null) ? (
                    <div>
                        <p>¡Proyecto registrado exitosamente!</p>                        
                    </div>): (
                    <div>
                        <p>Proyecto actualizado!!!</p>
                    </div>
                    )
                }
                
                <LoadingDots />

                </>) :                
                (<>
                {
                (selectedProject===null) ? (
                <div>
                    <h2>Proyecto Nuevo</h2>
                    <p> Complete los campos para poder crear el proyecto.</p>
                </div>):(
                <div>
                    <h2>Actulización del Proyecto </h2>
                    <p> Modifique los campos que desea cambiar y oprima el boton Actualizar para guardar los cambios.</p>
                </div>
                )
                }
                <form onSubmit={handleSubmit} className='col-9 border border-2 border-primary p-2'>
                    <div className="form-group text-start mb-3">
                        <label className="form-label mt-4" htmlFor="title">Título<sup aria-hidden="true">*</sup></label>
                        <input
                            type="text"
                            autoComplete='off'
                            className="form-control bg-light"
                            id="title"
                            name="title"
                            autoFocus
                            placeholder="Titulo"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            ref={titleRef}
                        />
                    </div>
                    <div className="form-group text-start mb-3">
                        <label 
                            className="form-label" htmlFor="category">Categoría<sup aria-hidden="true">*</sup>
                        </label>                    
                        <select 
                            className="form-select bg-light"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            aria-label="Default select example"
                        >
                            <option key={0} value={`vacio`}>Seleccione una opción</option> 
                            {
                                categories.map((category: { categoryId: string, name: string }) => (
                                    <option key={category.categoryId} value={category.name}>{category.name}</option>
                                ))
                            }
                        </select>                    
                    </div> 
                    <div className="form-group text-start mb-3">
                        <label 
                            className="form-label" htmlFor="content">Descripción<sup aria-hidden="true"></sup>*
                        </label> 
                        <textarea
                            name="description"
                            placeholder="Ingresa una breve descripción del proyecto"
                            autoComplete='off'
                            className="form-control bg-light"
                            rows={4}
                            id="content"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >                    
                        </textarea>
                    </div>                      
                    <div className="flex justify-end gap-x-2">
                        <button
                            className="px-5 py-2 text-black bg-blue-600 rounded"
                            disabled={!title || !description}
                            type="submit"
                        >
                            {selectedProject ? "Actualizar" : "Crear"}
                        </button>

                        {selectedProject && (
                            <button
                                className="px-5 py-2 text-black bg-slate-400 hover:bg-slate-500 rounded-md"
                                type="button"
                                onClick={() => {
                                    setSelectedProject(null);
                                    setTitle("");
                                    setDescription("");
                                    setCategory("");
                                    router.push('/dashboard/projects');
                                }}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>                    
                </form>                
                </>)
            }
            <ToastContainer />  
        </section>
    );
}