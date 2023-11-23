"use client";
import 'react-toastify/dist/ReactToastify.css';
import { useProjects } from "@/app/context/ProjectContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDocument } from '@/app/context/DocumentContext';


export default function DocumentForm() {    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const [messageLog, setMessageLog] = useState("")
    const titleRef = useRef<HTMLInputElement>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { selectedProject} = useProjects();
    const {selectedDocument, setSelectedDocument,createDocument,updateDocument} = useDocument();
        
    
    
    useEffect(() => {
        console.log(`Este es selected cuando entra: ${selectedDocument}`);
        if (selectedDocument) {
            {/*setTitle(selectedDocument.title);
            setContent(selectedDocument.content || "");
        setMessageLog(selectedDocument.messageLog || "");*/}
            
        }
    }, [selectedDocument]);
   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        {/*setIsLoading(true);*/}
        try {
            if (selectedDocument) {
              const response = await updateDocument(selectedDocument.documentId,{title, content,messageLog})
              switch (response){
                    case 201:
                        setSelectedDocument(null);
                        setTitle("");
                        setContent("");
                        setMessageLog("");
                        toast.success('Proyecto actualizado con éxito', {position:'top-right',   autoClose: 2000,pauseOnHover: false,});
                        setTimeout(() => {
                            router.push('/dashboard/projects');
                        }, 2500);
                        {/*setIsSubmitted(true);*/}
                        break;  
                    default :
                        toast.error(`Algo salio mal`, { position: 'bottom-right', autoClose: 3000, });
                        break;
                }                    
            } else {            
                const response = await createDocument({title,content,messageLog});                
                switch (response){
                    case 201:
                        toast.success('Documento creado con éxito', {position:'top-right',   autoClose: 2000,pauseOnHover: false,});
                        setTimeout(() => {router.push(`/dashboard/projects/${selectedProject?.projectId}`);
                        }, 2500);
                        {/*setIsSubmitted(true);*/}
                        break;                      
                    case 401:
                        toast.error(`Requiere esta logueado en el sitio.`, { position: 'top-right', autoClose: 2000, });
                        break;
                    default :
                        toast.error(`Algo salio mal`, { position: 'bottom-right', autoClose: 3000, });
                        break;
                }
            }
        } catch (error) {
            toast.error('Error al crear Documentto', {position: 'bottom-right',autoClose: 3000,
            });
            setIsSubmitted(false); 
            router.push('/dashboard/projects');
        }
        {/*finally {
            setIsLoading(false);      
        }*/}
    };
                 
    return (
        <section>
            {isSubmitted ? ( <p>¡Proyecto registrado exitosamente</p>) : 
                (<>
                {
                (selectedProject===null) ? (
                <div>
                    <h2>Proyecto Nuevo</h2>
                    <p> Complete los campos para poder crear el proyecto.</p>
                </div>):(
                <div>
                    <h2>Actulización de Proyecto </h2>
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
                    <div className="form-group mb-3 text-start">
                    <label 
                            className="form-label" htmlFor="content">Contenido<sup aria-hidden="true"></sup>*
                        </label> 
                        <textarea
                            name="content"
                            placeholder="Ingresa aqui la informacion del documento"
                            autoComplete='off'
                            className="form-control bg-light"
                            rows={15}
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        >                    
                        </textarea>
                    </div> 
                    <div className="form-group text-start mb-3">
                        <label 
                            className="form-label" htmlFor="content">Registro de cambios<sup aria-hidden="true"></sup>*
                        </label> 
                        <textarea
                            name="messageLog"
                            placeholder="Ingresa una breve descripción de los cabios ingresados"
                            autoComplete='off'
                            className="form-control bg-light"
                            rows={2}
                            id="messageLog"
                            value={messageLog}
                            onChange={(e) => setMessageLog(e.target.value)}
                        >                    
                        </textarea>
                    </div>                      
                    <div className="flex justify-end gap-x-2">
                        <button
                            className="px-5 py-2 text-black bg-blue-600 rounded"
                            disabled={!title || !content}
                            type="submit"
                        >
                            {selectedProject ? "Actualizar" : "Crear"}
                        </button>

                        {selectedProject && (
                            <button
                                className="px-5 py-2 text-black bg-slate-400 hover:bg-slate-500 rounded-md"
                                type="button"
                                onClick={() => {
                                    setSelectedDocument(null);
                                    setTitle("");
                                    setContent("");
                                    setMessageLog("");
                                    router.push(`/dashboard/projects/${selectedProject}`);
                                }}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>                    
                </form>
                <ToastContainer />
                </>)
            }            
        </section>
    );
}