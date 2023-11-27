"use client";
import 'react-toastify/dist/ReactToastify.css';
import { useProjects } from "@/app/context/ProjectContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect, } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDocument } from '@/app/context/DocumentContext';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { decode } from 'html-entities';

const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ font: [] }],        
      ],
    },
  };

  const formats = ['header','bold', 'italic', 'underline', 'strike','size', 'list', 'indent','color', 'background','align', 'font','link',];

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function DocumentForm() {    
    const router = useRouter();
    const {id,idDoc}= useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const [messaggesLog, setMessaggesLog] = useState("")
    const titleRef = useRef<HTMLInputElement>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { selectedProject} = useProjects();
    const {selectedDocument, setSelectedDocument,createDocument,updateDocument} = useDocument();
        
    useEffect(() => {
        if (selectedDocument) {
            setTitle(selectedDocument.title);
            setContent(decode(selectedDocument.content) || "");           
        }
    }, [selectedDocument]);
   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        {/*setIsLoading(true);*/}
        try {
            if (selectedDocument) {
              const response = await updateDocument(selectedDocument.documentId,{title, content,messaggesLog})
              switch (response){
                    case 200:
                        {/*setSelectedDocument(null);
                        setTitle("");
                        setContent("");
                        setMessageLog("");*/}
                        toast.success('Documento actualizado con éxito', {position:'top-right',   autoClose: 2000,pauseOnHover: false,});
                        setTimeout(() => {
                            router.push(`/dashboard/projects/${id}/document/${idDoc}/view`);
                            router.refresh();                            
                        }, 2500);
                        {/*setIsSubmitted(true);*/}
                        break;  
                    default :
                        toast.error(`Algo salio mal`, { position: 'bottom-right', autoClose: 3000, });
                        break;
                }                    
            } else {               
                const response = await createDocument({title,content,messaggesLog});                
                switch (response){
                    case 201:
                        toast.success('Documento creado con éxito', {position:'top-right',   autoClose: 2000,pauseOnHover: false,});
                        setTimeout(() => {
                            router.push(`/dashboard/projects/${selectedProject?.projectId}`);
                            router.refresh();
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
            {isSubmitted ? ( <p>¡Documento registrado exitosamente</p>) : 
                (<>
                {
                (selectedDocument===null) ? (
                <div>
                    <h2>Documento Nuevo</h2>
                    <p> Complete los campos para poder crear el documento.</p>
                </div>):(
                <div>
                    <h2>Actulización de Documento </h2>
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
                        <ReactQuill 
                            modules={modules}
                            value={content}
                            placeholder="Escriba aquí..."
                            theme="snow"
                            onChange={setContent} 
                        />                        
                    </div> 
                    <div className="form-group text-start mb-3">
                        <label 
                            className="form-label" htmlFor="content">Registro de cambios<sup aria-hidden="true"></sup>*
                        </label> 
                        <textarea
                            name="messaggesLog"
                            placeholder="Ingresa una breve descripción de los cabios ingresados"
                            autoComplete='off'
                            className="form-control bg-light"
                            rows={2}
                            id="messaggesLog"
                            value={messaggesLog}
                            onChange={(e) => setMessaggesLog(e.target.value)}
                        >                    
                        </textarea>
                    </div>                      
                    <div className="flex justify-end gap-x-2">
                        <button
                            className="px-5 py-2 text-black bg-blue-600 rounded"
                            disabled={!title || !content}
                            type="submit"
                        >
                            {selectedDocument ? "Actualizar" : "Crear"}
                        </button>

                        {selectedDocument && (
                            <button
                                className="px-5 py-2 text-black bg-slate-400 hover:bg-slate-500 rounded-md"
                                type="button"
                                onClick={() => {
                                    setSelectedDocument(null);
                                    setTitle("");
                                    setContent("");
                                    setMessaggesLog("");
                                    router.push(`/dashboard/projects/${id}`);
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