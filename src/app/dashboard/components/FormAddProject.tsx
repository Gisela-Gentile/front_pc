"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import { CreateUser } from '../interfaces/User';
import { API_URL } from '@/config/constants';

interface FormProject {
    title: string,
    description: string,
    category: string,
}
// async function fetchCategories() {
//     const res = await fetch(`${API_URL}/category/view/all`);
//     const data = await res.json();
//     return data;
// }

export default async function FormAddProject() {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({ title: '', description: '', category: '' });
    // const categories = await fetchCategories();
    
    async function createProject(project: FormProject): Promise<Response> {
        const res = await fetch(`${API_URL}/project/add`, {
            method: 'POST',
            body: JSON.stringify(project),
            headers: { "Content-Type": "application/json", },
        });

        return res
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        setError(false);
        setMessage('');
        event.preventDefault();
        const project = {
            title: formData.title,
            description: formData.description,
            category: formData.category,

        }
        try {
            const res = await createProject(project);
            console.log(res);
            const data = await res.json();
            console.log(data);
            if (res.status === 201) {

                router.push('/');
                alert('Proyecto creado exitosamente')
            }
            else {
                setError(true);
                const errors: string[] = data.message;
                setMessage(errors.toString());
            }
        } catch (e) {
            setError(true);
            setMessage(message);
            return false;
        }

    }

    const btnBack = () => {
        router.back();
    };

    
    return (
        <div className='container m-2'>
            <div className="container rounded text-center col-xs-12 col-md-6 col-sm-3 p-5 mt-4 bg-success">
                <h1 className='text-white'>Nuevo Proyecto</h1>
                <div className="form-group">

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label mt-4" htmlFor="title"><sup aria-hidden="true"></sup></label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="form-control bg-success text-white"
                                id="title"
                                value={formData.title}
                                placeholder="Título del proyecto"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value, })}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label mt-4" htmlFor="category"><sup aria-hidden="true"></sup></label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="form-control bg-success text-white"
                                id="category"
                                value={formData.category}
                                placeholder="Ingrese la categoría"
                                onChange={(e) => setFormData({ ...formData, category: e.target.value, })}
                            /> 
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="content"><sup aria-hidden="true"></sup></label>
                            <textarea
                                autoComplete='off'
                                className="form-control bg-success text-white"
                                rows={4}
                                id="content"
                                value={formData.description}
                                placeholder="Escribe una breve descripción"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value, })}
                            />
                        </div>
                        
                        

                        {/* <div className="form-group mb-3">
                            <label className="form-label" htmlFor="category"><sup aria-hidden="true"></sup></label>
                            <select className="form-select bg-success text-white"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value, })}
                                aria-label="Default select example">
                                 {/* <option selected>Seleccione una opción</option>  */}
                                {/* {
                                    categories.map((category: { categoryId: string, name: string }) => (
                                        <option className="form-control bg-success text-white" key={category.categoryId} value={category.categoryId}>{category.name}</option>
                                    ))
                                }

                            </select>
                        </div>  */}
                       
                        <button type="submit" id="btn-addProject" className="btn btn-primary btn-block m-2">
                            Crear
                        </button>
                        <button
                            onClick={btnBack}
                            type="button"
                            className="btn btn-primary btn-block m-2"
                        >
                            Cancelar
                        </button>

                    </form>
                    {message && <div className="alert alert-warning">{message}</div>}
                </div>
            </div>
        </div>
    )
}
