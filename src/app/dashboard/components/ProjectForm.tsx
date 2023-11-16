"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useProjects } from "@/app/context/ProjectContext";
import { User } from "@/app/interfaces/User";
import { API_URL } from "@/config/constants";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, Suspense } from "react";


async function fetchCategories() {
    const res = await fetch(`${API_URL}/category/view/all`);
    const data = await res.json();
    return data;
}

export default function ProjectForm() {
    const { token, user } = useAuth();
    {/*console.log(`token: ${token}`);
console.log(`user: ${user}`);*/}
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [categories, setCategories] = useState([]);
    const titleRef = useRef<HTMLInputElement>(null);
    const { createProject, selectedProject, setSelectedProject, updateProject } = useProjects();
    {/*console.log(`title: ${title}`);
    console.log(`description: ${description}`);
    console.log(`category: ${category}`);
console.log(`Selected Proyect: ${selectedProject}`);*/}

    
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


    const handleSubmit = async (event: React.SyntheticEvent) => {
        setError(false);
        setMessage('');
        event.preventDefault();
        if (selectedProject) {
            await updateProject(selectedProject.projectId, { title, description,category })
            setSelectedProject(null);
            alert('Proyecto modificado exitosamente');
            router.refresh();
        } else {
            await createProject({title, description,category});
            alert('Proyecto creado exitosamente')
            router.refresh();
        }
        setTitle("");
        setDescription("");
        setCategory("");
        titleRef.current?.focus();
    }

    return (
        <form onSubmit={handleSubmit} className='border border-2 border-primary p-2'>
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
                    className="form-label" htmlFor="category">Categoría<sup aria-hidden="true">*</sup>
                </label>
                
                <select 
                    className="form-select bg-light"
                    defaultValue={`vacio`}
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
                    className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}


