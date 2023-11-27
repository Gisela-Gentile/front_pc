"use client";
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/constants";
import { useRouter } from "next/navigation";
import { useState, } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from '@/app/context/AuthContext';

export default function CategoryForm() {
    const router = useRouter();
    const { token } = useAuth();
    const [nombre, setNombre] = useState("");
     const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCategory = { "name": nombre, }
        try {
            const res = await fetch(`${API_URL}/category/add`, {
                method: "POST",
                body: JSON.stringify(newCategory),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            switch (res.status) {
                case 201:
                    setNombre("");
                    toast.success('La categoría fue creada con éxito', { position: 'top-right', autoClose: 1500, pauseOnHover: false, });
                    setTimeout(() => { 
                        router.refresh(); 
                    }, 1600);
                    setIsSubmitted(true);
                    break;
                case 400:
                    toast.warning(`La categoria ya existe.`, { position: 'top-right', autoClose: 2000, });
                    setNombre("");

                    break;
                default:
                    toast.error(`Algo salio mal`, { position: 'bottom-right', autoClose: 3000, });
                    break;
            }
        } catch (error) {
            toast.error('Error al crear la Categoria', {
                position: 'bottom-right', autoClose: 3000,
            });
            setIsSubmitted(false);
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit} className='col-9 p-2'>
                <div className="form-group text-start mb-3">
                    <label className="form-label mt-4" htmlFor="title">Nombre de la Categoria<sup aria-hidden="true">*</sup></label>
                    <input
                        type="text"
                        autoComplete='off'
                        className="form-control bg-light"
                        id="nombre"
                        name="nombre"
                        autoFocus
                        placeholder="Nombre de la mueva Categoria"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                     />
                </div>
                <div className="flex justify-end gap-x-2">
                    <button
                        className="px-5 py-2 text-black bg-blue-600 rounded"
                        disabled={!nombre}
                        type="submit"
                    >Crear Categoría
                    </button>

                    <button
                        className="px-5 py-2 text-black bg-slate-400 hover:bg-slate-500 rounded-md"
                        type="button"
                        onClick={() => { setNombre(""); }}
                    >Limpiar</button>
                </div>
            </form>
            <ToastContainer />
        </section >
    );
}